Meteor.publish('items', function() {
  Meteor._sleepForMs(2000);
  return Items.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('travels', function() {
  Meteor._sleepForMs(2000);
  return Travels.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('requests', function() {
  Meteor._sleepForMs(2000);
  return Requests.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('replies', function() {
  Meteor._sleepForMs(2000);
  return Replies.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('reviews', function() {
  Meteor._sleepForMs(2000);
  return Reviews.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('messages', function() {
  Meteor._sleepForMs(2000);
  return Messages.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('notifications', function() {
  Meteor._sleepForMs(2000);
  return Notifications.find({}, {sort: {createdAt: -1}});
});