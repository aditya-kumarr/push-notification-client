console.log("hello from service worker");
console.log(self.registration);

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
