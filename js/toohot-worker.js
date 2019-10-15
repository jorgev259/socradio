self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim().then(function(){
  importScripts('/js/localforage.min.js');
  importScripts('/js/moment.min.js');
  }));
  });
  self.addEventListener('push', function(event) {
    var p = event.data.json();
    var title, body, badge, tag, icon, image, data, vibrate, renotify, requireInteraction, actions, silent, timestamp, nopts;
    p.title ? title = p.title : title = 'Shout from TooHotRadio';
    p.body ? body = p.body : body = 'Keep it locked to TooHotRadio.net!';
    p.badge ? badge = p.badge : badge = 'https://toohotradio.net/images/icons/radioicon.png';
    p.tag ? tag = p.tag : tag = 'shoutbox';
    p.icon ? icon = p.icon : icon = 'https://toohotradio.net/images/icons/256.jpg';
    p.image ? image = p.image : image = '';
    p.data ? data = p.data : data = {};
    p.vibrate ? vibrate = p.vibrate : vibrate = [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500];
    p.renotify ? renotify = true : renotify = true;
    p.requireInteraction ? requireInteraction = true : requireInteraction = true;
    p.actions ? actions = p.actions : actions = [{action: 'radio', title: 'Listen now'}, {action: 'notifications', title: 'Manage reminders'}];
    p.silent ? silent = true : silent = false;
    p.timestamp ? timestamp = Date.parse(p.timestamp) : timestamp = Date.now();
    var options = {
      body: body,
      badge: badge,
      tag: tag,
      icon: icon,
      image: image,
      data: data,
      vibrate: vibrate,
      renotify: renotify,
      requireInteraction: requireInteraction,
      actions: actions,
      silent: silent,
      timestamp: timestamp
    };
    event.waitUntil(
      self.clients.matchAll().then(function(clientList) {
        var focused = clientList.some(function(client) {
          return client.focused;
        });
        if (focused) {
  console.log(focused);
        } else if (clientList.length > 0) {
  console.log(clientList);
        } else {
  console.log('No windows');
        }
        return self.registration.showNotification(p.title, p.options)
      })
    );
  });
  self.addEventListener('notificationclick', function(event) {
    event.waitUntil(
      self.clients.matchAll().then(function(clientList) {
        var url;
  console.log(event);
        if (event.action === 'notifications') {
          url = 'https://toohotradio.net/notifications/';
        }
        if (event.action === 'radio') {
          url = 'https://stream.toohotradio.net/320/';
        }
        if (event.action === 'mixcloud') {
          url = event.notification.data.url;
        }
        if (event.action === 'shoutbox') {
          url = 'https://toohotradio.net/shoutbox/';
        }
        if (clientList.length > 0) {
          clientList[0].focus().then(function(Client) {
            return Client.navigate(url);
          })
        }
        return self.clients.openWindow(url);
      })
    );
  });
  self.addEventListener('message', function(event) {
    var promise = self.clients.matchAll()
      .then(function(clientList) {
        var senderID = event.source.id;
        if (event.data.action == 'setDb') {
          localforage.setItem(event.data.key, event.data.value).then(function (value) {
            console.log(value);
          }).catch(function(err) {
            console.log(err);
          });
        }
        if (event.data.action == 'getDb') {
          localforage.getItem(event.data.key).then(function (value) {
            return event.source.postMessage({message: value, action: 'gotDb'});
          }).catch(function(err) {
            console.log(err);
          });
        }
        clientList.forEach(function(client) {
          if (client.id === senderID) {
            return;
          }
          client.postMessage({
            client: senderID,
            message: event.data
          });
        });
      });
    if (event.waitUntil) {
      event.waitUntil(promise);
    }
  });
  self.addEventListener('pushsubscriptionchange', function(event) {
    console.log('Subscription expired');
    event.waitUntil(
      self.registration.pushManager.subscribe({ userVisibleOnly: true })
      .then(function(subscription) {
        console.log('Subscribed after expiration', subscription.endpoint);
        return fetch('register', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
            body: JSON.stringify({
              endpoint: subscription.endpoint
            })
        });
      })
    );
  });