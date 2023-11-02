// Service Worker の登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  
  // キャッシュのインストール
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache-name')
        .then((cache) => {
          return cache.addAll([
            '/',
            '/index.html',
            '/css/styles.css',
            '/js/main.js',
            // 他のアセットを追加
          ]);
        })
    );
  });
  
  // リクエスト時のキャッシュ利用
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  });
  
  // キャッシュの更新
  self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['my-cache-name'];
  
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  