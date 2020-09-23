if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('sw1.js')
                .then(reg=>console.log('SW Registered'))
                .catch(err=>console.log('SW Error'));
    })
}