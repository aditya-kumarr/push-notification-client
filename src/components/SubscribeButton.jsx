import React from "react";

const SubscribeButton = () => {
  return <button onClick={subscribeHandler}>SubscribeButton</button>;
};

export default SubscribeButton;

// main.js

async function subscribeHandler() {
  const key = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });
    console.log("Subscription:", subscription);
    await sendSubscriptionToServer(subscription);
  } catch (error) {
    console.error("Error subscribing to push notifications:", error);
  }
}

async function sendSubscriptionToServer(subscription) {
  // Send the subscription to your server's /subscribe endpoint
  const url = new URL(import.meta.env.VITE_SERVER_URL);
  url.pathname = "/subscribe";
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (response.ok) {
    console.log("Subscription sent to server successfully");
  } else {
    console.error(
      "Failed to send subscription to server:",
      response.statusText
    );
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
