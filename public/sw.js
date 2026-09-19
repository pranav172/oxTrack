// Empty service worker to satisfy lingering browser service worker registrations
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());
