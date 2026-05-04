// Service Worker معطل — التطبيق يعمل بدون كاش لتجنب مشاكل فقدان البيانات
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // فقط ملفات التطبيق تُجلب بدون كاش — Supabase وغيرها تمر كما هي
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(e.request, { cache: "no-store" }));
  } else {
    e.respondWith(fetch(e.request));
  }
});
