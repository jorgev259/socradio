'use strict';
function chatSounds()
{
    if (document.getElementById('soundCheck').checked) 
    {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('chatSounds', 1);
        }
    } else {
        if (storageAvailable('localStorage')) {
            localStorage.setItem('chatSounds', 0);
        }
    }
}
function storageAvailable(type) {
    try {
        var storage = window[type],
        x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            storage.length !== 0;
    }
}
function sound(source) {
    if (storageAvailable('localStorage')) {
        var soundsOn = localStorage.getItem('chatSounds');
    } else {
        var soundsOn = 1;
    }
    this.sound = document.createElement("audio");
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    var src = 'https://toohotradio.net' + source;
    this.sound.innerHTML = '<source src="'+src+'.ogg" type="audio/ogg"><source src="'+src+'.mp3" type="audio/mp3"><source src="'+src+'.m4r" type="audio/m4r">';
    document.body.appendChild(this.sound);
    this.play = function(){
        if(window.location.hostname === 'toohotradio.net' && soundsOn === 1){
            this.sound.play();
        }
    }
    this.stop = function(){
        if(window.location.hostname === 'toohotradio.net' && soundsOn === 1){
            this.sound.pause();
        }
    }
}
var device;
if(/iPhone|iPod/i.test(navigator.userAgent)){
    device = 'phone_iphone';
} else if (/iPad/i.test(navigator.userAgent)) {
    device = 'tablet_mac';
} else if (/Android/i.test(navigator.userAgent)) {
    device = 'phone_android';
} else {
    device = 'laptop';
}
var chatSound = new sound("/sounds/unsure");
// Initializes TooHotShout.
function TooHotShout() {
    this.checkSetup();
    // Shortcuts to DOM Elements.
    this.messageList = document.getElementById('chatwin');
    this.messageForm = document.getElementById('shoutForm');
    this.messageInput = document.getElementById('chatmsgin');
    this.submitButton = document.getElementById('submit');
    this.submitImageButton = document.getElementById('submitImage');
    this.imageForm = document.getElementById('image-form');
    this.mediaCapture = document.getElementById('mediaCapture');
    this.userPic = document.getElementById('user-pic');
    this.userName = document.getElementById('user-name');
    this.signInButton = document.getElementById('sign-in');
    this.signOutButton = document.getElementById('sign-out');
    this.signInSnackbar = document.getElementById('must-signin-snackbar');
    // Saves message on form submit.
    this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
    this.signOutButton.addEventListener('click', this.signOut.bind(this));
    this.signInButton.addEventListener('click', this.signIn.bind(this));
    // Toggle for the button.
    var buttonTogglingHandler = this.toggleButton.bind(this);
    this.messageInput.addEventListener('keyup', buttonTogglingHandler);
    this.messageInput.addEventListener('change', buttonTogglingHandler);
    // Events for image upload.
    this.submitImageButton.addEventListener('click', function(e) {
        e.preventDefault();
        this.mediaCapture.click();
    }.bind(this));
    this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));
    this.initFirebase();
}
// Sets up shortcuts to Firebase features and initiate firebase auth.
TooHotShout.prototype.initFirebase = function() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    this.messaging = firebase.messaging();
    this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};
// Loads chat messages history and listens for upcoming ones.
TooHotShout.prototype.loadMessages = function() {
    this.messagesRef = this.database.ref('messages');
    this.messagesRef.off();
    var setMessage = function(data) {
        var val = data.val();
        this.displayMessage(data.key, val.avatar, val.class, val.device, val.message, val.timestamp, val.user, val.csscolour, val.safe);
    }.bind(this);
    this.messagesRef.limitToLast(12).on('child_added', setMessage);
//    this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};
TooHotShout.prototype.submitToken = function() {
    firebase.messaging().getToken().then(function(currentToken) {
        if (currentToken) {
            $.ajax('https://toohotradio.net/chat4.php?notify=me', {method: 'POST', cache: false, data: {uid: firebase.auth().currentUser.uid, chatToken: currentToken},
                success: function(data){
                    console.log(data);
                }
                                                                  });
        }
    });
}
// Saves a new message on the Firebase DB.
TooHotShout.prototype.saveMessage = function(e) {
    e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (this.messageInput.value && this.checkSignedInWithMessage()) {
        var currentUser = this.auth.currentUser;
        var timestamp = getTime();
        // Add a new message entry to the Firebase Database.
        this.messagesRef.push({
            avatar: currentUser.photoURL || 'https://toohotradio.net/images/unknown-avatar.jpg',
            class: currentUser.uid,
            device: device,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: currentUser.displayName,
            message: this.messageInput.value
        }).then(function() {
            TooHotShout.resetMaterialTextfield(this.messageInput);
            this.toggleButton();
        }.bind(this)).catch(function(error) {
            console.error('Error lol writing new message to Firebase Database', error);
        });
    }
}
firebase.database().ref('chatcolour').on('child_changed', function(data) {
    colChange(data.key, data.val());
});
// Sets the URL of the given img element with the URL of the image stored in Cloud Storage.
TooHotShout.prototype.setImageUrl = function(imageUri, imgElement) {
    // If the image is a Cloud Storage URI we fetch the URL.
    if (imageUri.startsWith('gs://')) {
        imgElement.src = TooHotShout.LOADING_IMAGE_URL; // Display a loading image first.
        this.storage.refFromURL(imageUri).getMetadata().then(function(metadata) {
            imgElement.src = metadata.downloadURLs[0];
            console.log(metadata.downloadURLs);
        });
    } else {
        imgElement.src = imageUri;
    }
};
// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
TooHotShout.prototype.saveImageMessage = function(event) {
    event.preventDefault();
    var file = event.target.files[0];
    // Clear the selection in the file picker input.
    this.imageForm.reset();
    // Check if the file is an image.
    if (!file.type.match('image.*')) {
        var data = {
            message: 'You can only share images',
            timeout: 2000
        };
        this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
        return;
    }
    // Check if the user is signed-in
    if (this.checkSignedInWithMessage()) {
        var currentUser = this.auth.currentUser;
        vibrateOption = 0;
        var timestamp = getTime('now');
        this.messagesRef.push({
            avatar: currentUser.photoURL || 'https://toohotradio.net/images/unknown-avatar.jpg',
            class: currentUser.uid,
            device: device,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: currentUser.displayName,
            message: '<img src="https://toohotradio.net/images/placeholder.jpg" class="responsive-img" style="max-height:50vh">',
            safe: 'check'
        }).then(function(data) {
            $('#'+timestamp).removeClass('left-align');
            $('#'+timestamp).removeClass('right-align');
            $('#'+timestamp).addClass('center');
            $('#'+timestamp)[0].parentNode.parentNode.style.width = 'auto';
            // Upload the image to Cloud Storage.
            var filePath = currentUser.uid + '/' + data.key + '/' + file.name;
            return this.storage.ref(filePath).put(file).then(function(snapshot) {
                // Get the file's Storage URI and update the chat message placeholder.
                var fullPath = snapshot.metadata.fullPath;
                return data.update({message: this.storage.ref(fullPath).toString()});
            }.bind(this));
        }.bind(this)).catch(function(error) {
            console.error('There was an error uploading a file to Cloud Storage:', error);
        });
    }
};
// Signs-in Friendly Chat.
TooHotShout.prototype.signIn = function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
};
// Signs-out of Friendly Chat.
TooHotShout.prototype.signOut = function() {
    this.auth.signOut();
};
var cols = ['pink', 'black', 'white', 'pinkdarken', 'purplelighten', 'purple', 'purpledarken', 'deep-purplelighten', 'deep-purple', 'deep-purpledarken', 'indigolighten', 'indigo', 'indigodarken', 'bluelighten', 'blue', 'bluedarken', 'light-bluelighten', 'light-blue', 'light-bluedarken', 'teallighten', 'teal', 'tealdarken', 'greenlighten', 'green', 'greendarken', 'light-greenlighten', 'light-green', 'light-greendarken', 'yellowlighten', 'yellow', 'yellowdarken', 'deep-orangelighten', 'deep-orange', 'deep-orangedarken', 'brownlighten', 'brown', 'browndarken', 'greylighten', 'grey', 'greydarken', 'blue-greylighten', 'blue-grey', 'blue-greydarken', 'redlighten', 'redlighten', 'red', 'reddarken', 'pinklighten'];
// Triggers when the auth state change for instance when the user signs-in or signs-out.
TooHotShout.prototype.onAuthStateChanged = function(user) {
    if (user) { // User is signed in!
        // Get profile pic and user's name from the Firebase user object.
        var profilePicUrl = user.photoURL;   // TODO(DEVELOPER): Get profile pic.
        var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.
        if (storageAvailable('localStorage')) {
            if(!localStorage.getItem('chatSounds')) {
                localStorage.setItem('chatSounds', 1);
            } else {
                if(localStorage.getItem('chatSounds') == 0) {
                    document.getElementById('soundCheck').checked = false
                }
            }
        }
        // Set the user's profile pic and name.
        this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
        this.userName.textContent = userName;
        // Show user's profile and sign-out button.
        this.userName.removeAttribute('hidden');
        this.userPic.removeAttribute('hidden');
        this.signOutButton.removeAttribute('hidden');
        // Hide sign-in button.
        this.signInButton.setAttribute('hidden', 'true');
        // We load currently existing chant messages.
        this.loadMessages();
        // We save the Firebase Messaging Device token and enable notifications.
        //  this.saveMessagingDeviceToken();
    } else { // User is signed out!
        // Hide user's profile and sign-out button.
        this.userName.setAttribute('hidden', 'true');
        this.userPic.setAttribute('hidden', 'true');
        this.signOutButton.setAttribute('hidden', 'true');
        // Show sign-in button.
        this.signInButton.removeAttribute('hidden');
    }
};
// Returns true if user is signed-in. Otherwise false and displays a message.
TooHotShout.prototype.checkSignedInWithMessage = function() {
    /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
    if (this.auth.currentUser) {
        return true;
    }
    // Display a message to the user using a Toast.
    var data = {
        message: 'You must sign-in first',
        timeout: 2000
    };
    this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return false;
};
// Saves the messaging device token to the datastore.
//    TooHotShout.prototype.saveMessagingDeviceToken = function() {
//      firebase.messaging().getToken().then(function(currentToken) {
//        if (currentToken) {
//  console.log('Got FCM device token:', currentToken);
// Saving the Device Token to the datastore.
//          firebase.database().ref('/fcmTokens').child(currentToken)
//              .set(firebase.auth().currentUser.uid);
//                $.ajax('https://test.toohotradio.net/chat4.php?notify=me', {method: 'POST', cache: false, data: {uid: firebase.auth().currentUser.uid, chatToken: currentToken},
//                success: function(data){
//    console.log(data);
//    }
//                });
//        } else {
// Need to request permissions to show notifications.
//          this.requestNotificationsPermissions();
//        }
//      }.bind(this)).catch(function(error){
//        console.error('Unable to get messaging token.', error);
//      });
//    };
//    TooHotShout.prototype.requestNotificationsPermissions = function() {
//      console.log('Requesting notifications permission...');
//      firebase.messaging().requestPermission().then(function() {
// Notification permission granted.
//        this.saveMessagingDeviceToken();
//      }.bind(this)).catch(function(error) {
//        console.error('Unable to get permission to notify.', error);
//      });
//    };
// Resets the given MaterialTextField.
TooHotShout.resetMaterialTextfield = function(element) {
    element.value = '';
};
// Template for messages.
TooHotShout.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
    '<div class="spacing"><div class="pic"></div></div>' +
    '<div class="message"></div>' +
    '<div class="name"></div>' +
    '</div>';
// A loading image URL.
TooHotShout.LOADING_IMAGE_URL = 'https://toohotradio.net/images/placeholder.jpg';
var vibrateOption = 0;
var scrollDelay = 5;
setTimeout(function(){scrollDelay = 200; vibrateOption = 1;},10000);
// Displays a Message in the UI.
var chatCol;
TooHotShout.prototype.displayMessage = function(key, avatar, cssclass, device, message, timestamp, user, csscolour, safe) {
    var last = $('div .message').last();
    if(last.length){
        if(last[0].classList[1] === cssclass){
            var avatarclass = 'hidden';
        } else {
            var avatarclass = 'visible';
        }
    } else {
        var avatarclass = 'visible';
    }
    firebase.database().ref('chatcolour').orderByKey().equalTo(cssclass).once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            chatCol = childSnapshot.val();
        });
    });
    if(cssclass === firebase.auth().currentUser.uid){
        var chatmsg = '<li class="out"><div class="message '+cssclass+' '+chatCol+'"><div><span class="right name">'+user+'</span><span class="left device"><i class="material-icons">'+device+'</i></span><span class="left time timestamp" data-ts="'+timestamp+'">Just now</span></div><br><div class="right-align" id="'+timestamp+'">'+message+'</div></div><div class="avatar" style="visibility:'+avatarclass+'"><img src="'+avatar+'" class="circle"></div></li>';
    } else {
        var chatmsg = '<li class="in"><div class="avatar" style="visibility:'+avatarclass+'"><img src="'+avatar+'" class="circle"></div><div data-col="'+csscolour+'" class="message '+cssclass+' '+chatCol+'"><div><span class="left name">'+user+'</span><span class="right device"><i class="material-icons">'+device+'</i></span><span class="right time timestamp" data-ts="'+timestamp+'">Just now</span></div><br><div class="left" id="'+timestamp+'">'+message+'</div></div></li>';
    }
    var time = moment.unix(timestamp);
    if($('#'+timestamp).length === 0){
        $(chatmsg).hide().appendTo('#chatwin').fadeIn(1200);
    }
    if (message.startsWith('gs://')) {
        $('#'+timestamp).html('<img src="https://toohotradio.net/images/placeholder.jpg" class="responsive-img '+timestamp+'" style="max-height:50vh">');
        $('#'+timestamp).removeClass('left-align');
        $('#'+timestamp).removeClass('right-align');
        $('#'+timestamp).addClass('center');
        $('#'+timestamp)[0].parentNode.parentNode.style.width = 'auto';
        this.storage.refFromURL(message).getMetadata().then(function(metadata) {
            var image = document.createElement('img');
            image.style.maxHeight = '50vh';
            image.setAttribute('class', 'responsive-img');
            image.addEventListener('load', function() {
                $('#'+timestamp).html(reason);
                chatSound.play();
                vibrateOption = 1;
                $(image).hide().appendTo('#'+timestamp).fadeIn(1200);$('#message-display').animate({
                    scrollTop: $('#message-display').prop('scrollHeight')}, scrollDelay);
            })
                if(safe === 'check'){
                var reason = '<div class="flow-text" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;">Checking uploaded image...</div>';
                if(cssclass !== firebase.auth().currentUser.uid){
                    image.setAttribute('style', 'filter:blur(30px);max-height:50vh;pointer-events:none');
                } else {
                    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
                        $.ajax('https://toohotradio.net/chat4.php?img=me', {method: 'POST', cache: false, data: {'key': key, 'url': metadata.downloadURLs[0], 'token': idToken},
                            success: function(data){
                                console.log(data);
                            }
                                                                           });
                        image.setAttribute('style', 'filter:blur(15px);max-height:50vh;pointer-events:none');
                    }).catch(function(error) {
                        Materialize.toast(error);
                    });
                }
            } else if (safe === 'yes'){
                image.style.maxHeight = '50vh';
                var reason = '';
            } else {
                image.style = 'filter:blur(20px);max-height:50vh;pointer-events:none';
                var reason = '<div class="flow-text" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1;">'+safe+'</div>';
            }
            image.src=metadata.downloadURLs[0];
        });
    }
    $('#message-display').animate({
        scrollTop: $('#message-display').prop('scrollHeight')}
                                  , scrollDelay);
    chatTimes();
    if(vibrateOption == 1){
        chatSound.play();
        // window.navigator.vibrate([200]);
    }
}
TooHotShout.prototype.displayMessaghe = function(key, name, text, picUrl, imageUri) {
    var div = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!div) {
        var container = document.createElement('div');
        container.innerHTML = TooHotShout.MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute('id', key);
        this.messageList.appendChild(div);
    }
    if (picUrl) {
        div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
    }
    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
    if (text) { // If the message is text.
        messageElement.textContent = text;
        // Replace all line breaks by <br>.
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
    } else if (imageUri) { // If the message is an image.
        var image = document.createElement('img');
        image.addEventListener('load', function() {
            this.messageList.scrollTop = this.messageList.scrollHeight;
        }.bind(this));
        this.setImageUrl(imageUri, image);
        messageElement.innerHTML = '';
        messageElement.appendChild(image);
    }
    // Show the card fading-in.
    setTimeout(function() {div.classList.add('visible')}, 1);
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageInput.focus();
};
// Enables or disables the submit button depending on the values of the input
// fields.
TooHotShout.prototype.toggleButton = function() {
    if (this.messageInput.value) {
        this.submitButton.removeAttribute('disabled');
    } else {
        this.submitButton.setAttribute('disabled', 'true');
    }
};
// Checks that the Firebase SDK has been correctly setup and configured.
TooHotShout.prototype.checkSetup = function() {
    if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
        window.alert('You have not configured and imported the Firebase SDK. ' +
                     'Make sure you go through the codelab setup instructions and make ' +
                     'sure you are running the codelab using `firebase serve`');
    }
};
window.onload = function() {
    window.toohotShout = new TooHotShout();
    // setTimeout(function(){toohotShout.submitToken()},10000);
};