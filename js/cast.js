/**
 * Cast initialization timer delay
 **/
var CAST_API_INITIALIZATION_DELAY = 1000;
/**
 * Progress bar update timer delay
 **/
var PROGRESS_BAR_UPDATE_DELAY = 1000;
/**
 * Session idle time out in milliseconds
 **/
var SESSION_IDLE_TIMEOUT = 300000;
/**
 * Media source root URL
 **/
var MEDIA_SOURCE_ROOT =
    'https://toohotradio.net/';

// Cast icon thumbnail active
var CAST_ICON_THUMB_ACTIVE = 'https://toohotradio.net/images/icons/cast_icon_active.png';
// Cast icon thumbnail idle
var CAST_ICON_THUMB_IDLE = 'https://toohotradio.net/images/icons/cast_icon_idle.png';
// Cast icon thumbnail warning
var CAST_ICON_THUMB_WARNING = 'https://toohotradio.net/images/icons/cast_icon_warning.png';

/**
 * global variables
 */
var currentMediaSession = null;
var currentVolume = 0.5;
var progressFlag = 0;
var mediaCurrentTime = 0;
var session = null;
var storedSession = null;
var mediaURLs = [
    'https://stream.toohotradio.net/320'
];
var mediaTitles = [
    'TooHotRadio.net'
];

var mediaThumbs = [
    'icons/512.jpg'];
var currentMediaURL = mediaURLs[0];
var currentMediaTitle = mediaTitles[0];
var currentMediaThumb = mediaThumbs[0];

var timer = null;

/**
 * Call initialization
 */
window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

/**
 * initialization
 */
function initializeCastApi() {
  // default app ID to the default media receiver app
  // optional: you may change it to your own app ID/receiver
  //       chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
  var applicationIDs = [
'C99730E8'
    ];


  // auto join policy can be one of the following three
  // 1) no auto join
  // 2) same appID, same URL, same tab
  // 3) same appID and same origin URL
  var autoJoinPolicyArray = [
      chrome.cast.AutoJoinPolicy.PAGE_SCOPED,
      chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,
      chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    ];

  // request session
  var sessionRequest = new chrome.cast.SessionRequest(applicationIDs[0]);
  var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
    sessionListener,
    receiverListener,
    autoJoinPolicyArray[1]);

  chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

/**
 * initialization success callback
 */
function onInitSuccess() {
  storedSession = JSON.parse(localStorage.getItem('storedSession'));
  if (storedSession) {
    var dateString = storedSession.timestamp;
    var now = new Date().getTime();
  }
}

/**
 * generic error callback
 * @param {Object} e A chrome.cast.Error object.
 */
function onError(e) {
  console.log('Error' + e);
}

/**
 * generic success callback
 * @param {string} message from callback
 */
function onSuccess(message) {
  console.log(message);
}

/**
 * callback on success for stopping app
 */
function onStopAppSuccess() {
$('#cardFABPlay').removeClass('hidden');
$('#castPlay').addClass('hidden');
$('#castPlayIcon').text('play_arrow');
}

/**
 * session listener during initialization
 * @param {Object} e session object
 * @this sessionListener
 */
function sessionListener(e) {
  session = e;
$('#castFABIcon').text('cast_connected');
$('#castFABDiv').removeClass('hidden');
$('#castPlay').removeClass('hidden');
$('#cardFABPlay').addClass('hidden');
$('#castFABDiv').css('right','88px')
  if (session.media.length != 0) {
    onMediaDiscovered('sessionListener', session.media[0]);
  }
  session.addMediaListener(
    onMediaDiscovered.bind(this, 'addMediaListener'));
  session.addUpdateListener(sessionUpdateListener.bind(this));
  // disable join by session id when auto join already
}

/**
 * session update listener
 * @param {boolean} isAlive status from callback
 * @this sessionUpdateListener
 */
function sessionUpdateListener(isAlive) {
  if (!isAlive) {
    session = null;
$('#castFABIcon').text('cast');
$('#castFABDiv').removeClass('hidden');
$('#castPlay').addClass('hidden');
$('#cardFABPlay').removeClass('hidden');
$('#castFABDiv').css('right','88px')
$('#castPlayIcon').text('play_arrow');
    if (timer) {
      clearInterval(timer);
    }
    else {
      timer = setInterval(updateCurrentTime.bind(this),
          PROGRESS_BAR_UPDATE_DELAY);
$('#castPlayIcon').text('pause');
    }
  }
}

/**
 * receiver listener during initialization
 * @param {string} e status string from callback
 */
function receiverListener(e) {
  if (e === 'available') {
$('#castFABDiv').removeClass('hidden');
$('#castFABDiv').css('right','88px')
   }
}

/**
 * select a media URL
 * @param {string} m An index for media URL
 */
function selectMedia(m) {
  console.log('media selected' + m);
}

/**
 * launch app and request session
 */
function launchApp() {
  chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
  if (timer) {
    clearInterval(timer);
  }
}

/**
 * callback on success for requestSession call
 * @param {Object} e A non-null new session.
 * @this onRequestSesionSuccess
 */
function onRequestSessionSuccess(e) {
  saveSessionID(e.sessionId);
setTimeout(function(){loadMedia()},100);
  session = e;
$('#castFABIcon').text('cast_connected');
  session.addUpdateListener(sessionUpdateListener.bind(this));
  if (session.media.length != 0) {
    onMediaDiscovered('onRequestSession', session.media[0]);
  }
  session.addMediaListener(
    onMediaDiscovered.bind(this, 'addMediaListener'));
}

/**
 * callback on launch error
 */
function onLaunchError() {
  console.log('launch error');
}

/**
 * save session ID into localStorage for sharing
 * @param {string} sessionId A string for session ID
 */
function saveSessionID(sessionId) {
  // Check browser support of localStorage
  if (typeof(Storage) != 'undefined') {
    // Store sessionId and timestamp into an object
    var object = {id: sessionId, timestamp: new Date().getTime()};
    localStorage.setItem('storedSession', JSON.stringify(object));
  }
}

/**
 * join session by a given session ID
 */
function joinSessionBySessionId() {
  if (storedSession) {
    chrome.cast.requestSessionById(storedSession.id);
  }
}

/**
 * stop app/session
 */
function stopApp() {
  session.stop(onStopAppSuccess, onError);
  if (timer) {
    clearInterval(timer);
  }
}

/**
 * load media specified by custom URL
 */
function loadCustomMedia() {
console.log('loadCustomMedia');
}
function castSession(){
  if (!session) {
    launchApp();
} else {
    stopApp();
}
}
/**
 * load media
 * @param {string} mediaURL media URL string
 * @this loadMedia
 */
function loadMedia(mediaURL) {
  if (!session) {
    return;
  }

  if (mediaURL) {
    var mediaInfo = new chrome.cast.media.MediaInfo(mediaURL);
    currentMediaTitle = 'custom title needed';
    currentMediaThumb = 'images/video_icon.png';
  }
  else {
    var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaURL);
  }
  mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
  mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;
  mediaInfo.contentType = 'audio/mpeg';

  mediaInfo.metadata.title = currentMediaTitle;
  mediaInfo.metadata.images = [{'url': 'https://toohotradio.net/images/icons/512.jpg'}];
  mediaInfo.metadata.subtitle = 'Streaming 24/7 from the UK';
  mediaInfo.metadata.thumb = 'https://toohotradio.net/images/icons/512.jpg';
  var request = new chrome.cast.media.LoadRequest(mediaInfo);
  request.autoplay = true;
  request.currentTime = 0;

  session.loadMedia(request,
    onMediaDiscovered.bind(this, 'loadMedia'),
    onMediaError);

}

/**
 * callback on success for loading media
 * @param {string} how info string from callback
 * @param {Object} mediaSession media session object
 * @this onMediaDiscovered
 */
function onMediaDiscovered(how, mediaSession) {
  currentMediaSession = mediaSession;
  currentMediaSession.addUpdateListener(onMediaStatusUpdate);
  mediaCurrentTime = currentMediaSession.currentTime;
$('#castPlayIcon').text('play_arrow');
$('#castFABIcon').text('cast_connected');
  if (!timer) {
    timer = setInterval(updateCurrentTime.bind(this),
        PROGRESS_BAR_UPDATE_DELAY);
$('#castPlayIcon').text('play_arrow');
  }
}

/**
 * callback on media loading error
 * @param {Object} e A non-null media object
 */
function onMediaError(e) {
  console.log('media error');
}

/**
 * get media status initiated by sender when necessary
 * currentMediaSession gets updated
 * @this getMediaStatus
 */
function getMediaStatus() {
  if (!session || !currentMediaSession) {
    return;
  }

  currentMediaSession.getStatus(null,
      mediaCommandSuccessCallback.bind(this, 'got media status'),
      onError);
}

/**
 * callback for media status event
 * @param {boolean} isAlive status from callback
 */
function onMediaStatusUpdate(isAlive) {
    if (!isAlive) {
        currentMediaTime = 0;
    }
    else {
        if (currentMediaSession.playerState == 'BUFFERING') {
            $('#castPlayIcon').text('pause');
            $('#cardFABPlay').addClass('hidden');
            $('#castPlay').removeClass('hidden');
            if(!audio.paused){
                audio.pause(); 
            }
       //     gainNode.gain.linearRampToValueAtTime(0,ctx.currentTime + 5);
        }
        if (currentMediaSession.playerState == 'PLAYING') {
            startRecord();
               $('#cardFABPlay').addClass('hidden');
            $('#castPlayIcon').text('pause');
        }
        if (currentMediaSession.playerState == 'IDLE' | currentMediaSession.playerState == 'PAUSED') {
            stopRecord();
           $('#cardFABPlay').addClass('hidden');
           $('#castPlay').removeClass('hidden');
            $('#castPlayIcon').text('play_arrow');
        }
    }
}
/**
 * Updates the progress bar shown for each media item.
 */
function updateCurrentTime() {
  if (!session || !currentMediaSession) {
    return;
  }

  if (currentMediaSession.media && currentMediaSession.media.duration != null) {
    var cTime = currentMediaSession.getEstimatedTime();
  }
  else {
    if (timer) {
      clearInterval(timer);
    }
  }
}

/**
 * play media
 * @this playMedia
 */
function castPlayButton(){
if (currentMediaSession && currentMediaSession.playerState == 'PLAYING'){
stopMedia();
} else if (currentMediaSession && currentMediaSession.idleReason == 'CANCELLED'){
$('#castPlayIcon').text('pause');
loadMedia();
} else {
playMedia();
}
}

function playMedia() {
  if (!currentMediaSession) {
    return;
  }

  if (timer) {
    clearInterval(timer);
  }

  if ($('#castPlayIcon').text() == 'play_arrow') {
    currentMediaSession.play(null,
      mediaCommandSuccessCallback.bind(this, 'playing started for ' +
          currentMediaSession.sessionId),
      onError);
$('#castPlayIcon').text('pause');
      timer = setInterval(updateCurrentTime.bind(this),
          PROGRESS_BAR_UPDATE_DELAY);
  }
  else {
  if ($('#castPlayIcon').text() == 'pause') {
      currentMediaSession.pause(null,
        mediaCommandSuccessCallback.bind(this, 'paused ' +
            currentMediaSession.sessionId),
        onError);
$('#castPlayIcon').text('play_arrow');
stopRecord();
    }
    else {
  if ($('#castPlayIcon').text() == 'pausdde') {
        currentMediaSession.play(null,
          mediaCommandSuccessCallback.bind(this, 'resumed ' +
              currentMediaSession.sessionId),
          onError);
        timer = setInterval(updateCurrentTime.bind(this),
            PROGRESS_BAR_UPDATE_DELAY);
      }
    }
  }
}

/**
 * stop media
 * @this stopMedia
 */
function stopMedia() {
  if (!currentMediaSession)
    return;
stopRecord();
  currentMediaSession.stop(null,
    mediaCommandSuccessCallback.bind(this, 'stopped ' +
        currentMediaSession.sessionId),
    onError);
 $('#castPlayIcon').text('play_arrow');
  if (timer) {
    clearInterval(timer);
  }
}

/**
 * set media volume
 * @param {Number} level A number for volume level
 * @param {Boolean} mute A true/false for mute/unmute
 * @this setMediaVolume
 */
function setMediaVolume(level, mute) {
  if (!currentMediaSession)
    return;

  var volume = new chrome.cast.Volume();
  volume.level = level;
  currentVolume = volume.level;
  volume.muted = mute;
  var request = new chrome.cast.media.VolumeRequest();
  request.volume = volume;
  currentMediaSession.setVolume(request,
    mediaCommandSuccessCallback.bind(this, 'media set-volume done'),
    onError);
}

/**
 * set receiver volume
 * @param {Number} level A number for volume level
 * @param {Boolean} mute A true/false for mute/unmute
 * @this setReceiverVolume
 */
function setReceiverVolume(level, mute) {
  if (!session)
    return;

  if (!mute) {
    session.setReceiverVolumeLevel(level,
      mediaCommandSuccessCallback.bind(this, 'media set-volume done'),
      onError);
    currentVolume = level;
  }
  else {
    session.setReceiverMuted(true,
      mediaCommandSuccessCallback.bind(this, 'media set-volume done'),
      onError);
  }
}

/**
 * mute media
 */
function muteMedia() {
  if (!session || !currentMediaSession) {
    return;
  }

  var muteunmute = document.getElementById('muteunmute');
  // It's recommended that setReceiverVolumeLevel be used
  // but media stream volume can be set instead as shown in the
  // setMediaVolume(currentVolume, true);
  if (muteunmute.innerHTML == 'Mute media') {
    muteunmute.innerHTML = 'Unmute media';
    setReceiverVolume(currentVolume, true);
  } else {
    muteunmute.innerHTML = 'Mute media';
    setReceiverVolume(currentVolume, false);
  }
}

/**
 * seek media position
 * @param {Number} pos A number to indicate percent
 * @this seekMedia
 *
 * function seekMedia(pos) {
 *   console.log('Seeking ' + currentMediaSession.sessionId + ':' +
 *    currentMediaSession.mediaSessionId + ' to ' + pos + '%');
 *   progressFlag = 0;
 *   var request = new chrome.cast.media.SeekRequest();
 *   request.currentTime = pos * currentMediaSession.media.duration / 100;
 *   currentMediaSession.seek(request,
 *     onSeekSuccess.bind(this, 'media seek done'),
 *     onError);
 * }
 */

/**
 * callback on success for media commands
 * @param {string} info A message string
 */
function onSeekSuccess(info) {
  console.log(info);
  setTimeout(function() {progressFlag = 1},PROGRESS_BAR_UPDATE_DELAY);
}

/**
 * callback on success for media commands
 * @param {string} info A message string
 */
function mediaCommandSuccessCallback(info) {
  console.log(info);
}

/**
 * append message to debug message window
 * @param {string} message A message string
 */
