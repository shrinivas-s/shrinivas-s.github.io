const cacheName="v1";
const cacheAssets=[
    'index.html',
    'main.js'
]

self.addEventListener('install',e=>{
    console.log('Installed');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
            console.log(`Cache ${cache}`)
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    );
});

self.addEventListener('activate',e => {
    console.log('Activated');
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
           cacheNames.map(cache=>{
            if(cache!=cacheName){
                console.log("Cache deleted");
                return caches.delete(cache);
            }
        })
    )
    })
   );
});

self.addEventListener('fetch',e => {
    console.log("Fetching")
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
})