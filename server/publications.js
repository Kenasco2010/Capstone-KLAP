Meteor.publish('items', function() {
  return Items.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('travels', function() {
  return Travels.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('requests', function() {
  return Requests.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('replies', function() {
  return Replies.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('reviews', function() {
  return Reviews.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('messages', function() {
  return Messages.find({}, {sort: {createdAt: -1}});
});

Meteor.publish('notifications', function() {
  return Notifications.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("authUsers", function () {
return Meteor.users.find({});
});