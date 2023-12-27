// sw.ts
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST); // does compile
registerRoute(
  // Use a regular expression to match a specific URL pattern
  /\/api\/data/,
  // Use the CacheFirst strategy to attempt to fetch from the cache first, falling back to the network
  new CacheFirst({
    cacheName: "api-cache",
    plugins: [],
  })
);

self.addEventListener("push", (event) => {
  // Parse the incoming data from the push notification
  const pushData = event.data.json();
  console.log(pushData);
  // Display a notification using the data
  self.registration.showNotification(pushData.title, {
    body: pushData.body,
    icon: pushData.icon,
  });
});
