import React from "react";

const SendNotificationButton = () => {
  return (
    <button
      onClick={async () => {
        const registration = await navigator.serviceWorker.ready;
        registration.showNotification("hello user");
      }}
    >
      SendNotificationButton
    </button>
  );
};

export default SendNotificationButton;
