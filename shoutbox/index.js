navigator.serviceWorker.register('https://toohotradio.net/toohot-service-worker.js');
var refreshNotification;
navigator.serviceWorker.ready
    .then(function(registration) {
        console.log('service worker registered');
        return registration.pushManager.getSubscription();
    }).then(function(subscription) {
    if (subscription) {
        console.log('Already subscribed', subscription.endpoint);
        userSubscribed();
    } else {
if(notifyStatus() == 'granted'){
document.getElementById('notifydiv').style.display = "none";
refreshNotification = 1;
setTimeout(function(){subscribe()},10000);
} else {
        notifyButton(0);
document.getElementById('notificationTable').style.display = "none";
    }
  }
});
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
 
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function subscribe() {
    var user = firebase.auth().currentUser.uid;
    navigator.serviceWorker.ready
        .then(async function(registration) {
            $('body').addClass('notifyBlock');
            const response = await fetch('/vapidPublicKey');
            const vapidPublicKey = await response.text();
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
            return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            });
        }).then(function(subscription) {
document.getElementById('notifydiv').style.display = "none";
document.getElementById('notificationTable').style.display = "block";
if(refreshNotification != 1){
swal({
  title: 'Notifications enabled',
  text: "Great! Which DJs should we notify you about?",
  type: 'success',
  showCancelButton: false,
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'Choose DJs'
}).then((result) => {
  if (result.value) {
$('body').removeClass('notifyBlock');
openShoutSettings();
setTimeout(function(){document.getElementById("notificationTable").scrollIntoView({behavior: "smooth", block: "start", inline: "start"})},1600);
  }
});
}
        return fetch('/subscribe.php', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
                body: JSON.stringify({
                    subscription: subscription,
                    user: user
                })
        });
    }).then(userSubscribed);
}
// Get existing subscription from service worker, unsubscribe
// (`subscription.unsubscribe()`) and unregister it in the server with
// a POST request to stop sending push messages to
// unexisting endpoint.
function unsubscribe() {
    navigator.serviceWorker.ready
        .then(function(registration) {
            return registration.pushManager.getSubscription();
        }).then(function(subscription) {
        return subscription.unsubscribe()
            .then(function() {
                console.log('Unsubscribed', subscription.endpoint);
                return fetch('/subscribe.php?unsubscribe=1', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                        body: JSON.stringify({
                            subscription: subscription
                        })
                });
            });
    }).then(console.log('unsub'));
}
function userSubscribed(){
document.getElementById('notifydiv').style.display = "none";
    $('body').removeClass('notifyBlock');
}
navigator.serviceWorker.addEventListener('message', function(event) {
    console.log(event);
});
function subscribeSwal(){
if(notifyStatus() == 'default'){
swal({
  title: 'Browser settings',
  text: "First we need permission to send you notifications",
  type: 'question',
  showCancelButton: true,
  confirmButtonColor: '#009688',
  cancelButtonColor: '#d33',
  reverseButtons: true,
  confirmButtonText: 'OK'
}).then((result) => {
  if (result.value) {
subscribe()
  }
})
} else {
subscribe();
}
}
function updateNotifications(){
  var checkedBoxes = document.querySelectorAll('input[name=checkboxes]:checked');
  var array = Array();
  var formData = new FormData();
  for (i = 0; i < checkedBoxes.length; i++) {
    array.push(checkedBoxes[i].value);
    formData.append('notify[]', checkedBoxes[i].value);
  }
  localforage.getItem('notifications').then(function(value) {
    if (JSON.stringify(value) === JSON.stringify(array)) {
      console.log('They are equal!');
      return;
    }
    localforage.setItem('notifications', array).then(function(value) {
      var user = firebase.auth().currentUser.uid;
      formData.append('user', user);
      fetch('https://toohotradio.net/notifications.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .catch(error => console.error('Error:', error))
        .then(console.log('Notifications updated'));
    })
  }).catch(function(err) {
    console.log(err);
  });
}
