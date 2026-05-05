// Service Worker — يتدخل فقط في ملفات التطبيق، Supabase يمر بدون أي تدخل
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // Supabase وأي طلب خارجي — لا تدخل إطلاقاً
  if (url.origin !== self.location.origin) return;
  // ملفات التطبيق فقط — بدون كاش
  e.respondWith(fetch(e.request, { cache: "no-store" }));
});
