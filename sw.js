const APP_SHELL_CACHE_NAME = 'plan777-app-shell';

self.addEventListener('install', e => {
    
    e.waitUntil(
        caches.open(APP_SHELL_CACHE_NAME)
        .then(cache => {
            return cache.addAll([
                'db/books.json',
               	'js/main.js',
               	'js/settings.js',
                'css/bootstrap.min.css',
                'css/bootstrap.min.css.map',
                'index.html',
                './'
            ]);
        })
    )

})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) return res;
            return fetch(e.request);
        })
    )
})
