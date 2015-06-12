Meteor.users.helpers({
  getUser: function(id){
    return Meteor.users.findOne(id);
  }
});