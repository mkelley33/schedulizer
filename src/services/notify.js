// NOTE: Much of this code was based on that found in
// https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js

function createNotification(event) {
  const text = `Alert! Your event '${event.attributes.name}' is now starting.`;
  new Notification('Events list', { body: text });
  window.navigator.vibrate(500);
}

function showNotification(event) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
  }

  // Let's check if the user is okay to get some notification
  else if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    createNotification(event);
  }

  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function(permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === 'granted') {
        createNotification(event);
      }
    });
  }
}

function checkDeadLines() {
  for (const event of _events) {
    const date = new Date(event.unformattedDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const nowDate = new Date(new Date().toISOString());
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth();
    const nowDay = nowDate.getDate();
    const nowHour = nowDate.getHours();
    const nowMinute = nowDate.getMinutes();
    if (
      !event.notified &&
      year === nowYear &&
      month === nowMonth &&
      day === nowDay &&
      hour === nowHour &&
      minute === nowMinute
    ) {
      showNotification(event);
      event.notified = true;
      break;
    }
  }
}

let _events;

export default function notify(events) {
  _events = events;
  setInterval(checkDeadLines, 10000);
}
