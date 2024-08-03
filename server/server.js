const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(bodyParser.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  'mailto:namvucong23@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const subscriptions = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

const sendNotification = (notificationPayload) => {
  subscriptions.forEach(subscription => {
    webpush.sendNotification(subscription, JSON.stringify(notificationPayload))
      .catch(error => console.error('Error sending notification:', error));
  });
};

supabase
  .channel('custom-all-channel')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
    const newBooking = payload.new;
    const notificationPayload = {
      title: 'New Booking',
      message: `New booking from ${newBooking.name}`,
    };
    sendNotification(notificationPayload);
  })
  .subscribe();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
