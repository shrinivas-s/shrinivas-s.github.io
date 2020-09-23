const cacheName="v2";

self.addEventListener('install',e=>{
    console.log('Installed');
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
    e.respondWith(fetch(e.request)
    .then(res=>{
        const resClone=res.clone();
        caches.open(cacheName).then(cache=>
        cache.put(e.request,resClone));
        return res;
    }).catch(()=>caches.match(e.request)).then(res=>res));
})