
const cacheName = 'IFF' + '1.0';
 
self.addEventListener('install', (evt) => {
    //console.log(`sw stallatu a ${new Date().toLocaleTimeString()}`);
 
    const cachePromise = caches.open(cacheName).then(cache => {
        return cache.addAll([
            'idb/idb.js',
            'idb/database.js',
            'index.html',
            'main.js',
            'style.css',
            'vendors/bootstrap4.min.css',
        ])
        //.then(console.log('cache impiantatu'))
        .catch(console.err);
    });
 
    evt.waitUntil(cachePromise);
 
});
 
self.addEventListener('activate', (evt) => {
    //console.log(`sw attivatu a ${new Date().toLocaleTimeString()}`); 
  
    let cacheCleanPromise = caches.keys().then(keys => {
        keys.forEach(key => {            
            if(key !== cacheName){
                caches.delete(key);
            }
        });
    });

    evt.waitUntil(cacheCleanPromise);    
});
	
//..
self.addEventListener('fetch', (evt) => {

    if(evt.request.method === 'POST'){

        return;
    }

    evt.respondWith(
        fetch(evt.request).then(res => {
            //console.log("url presa da a rede", evt.request.url);
            caches.open(cacheName).then(cache => cache.put(evt.request, res));
            return res.clone();
        })
        .catch(err => {
            //console.log("url presa da u cache", evt.request.url);
            return caches.match(evt.request);
        })
    );
});

// 8.1 Intercepter une notification push
self.addEventListener("push", evt => {
    console.log("push event", evt);
    //console.log("data enviata da a nutificaziona :", evt.data.text());

    self.clients.matchAll().then(all => all.map(client => client.postMessage(evt.data.text() ))); //sends a message to the client (main js)

    // 8.1 afficher son contenu dans une notification
    const title = evt.data.text();
    const objNotification = {
        body: "viaghja", 
        icon : "images/icons/icon-72x72.png"
    };
    self.registration.showNotification(title, objNotification);
})

