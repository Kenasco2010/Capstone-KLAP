Meteor.users.allow({
    remove:function(userId, doc) { 
        return true ;
    },
    update: function(userId, doc) {
        return userId;
    }

});

Items.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        //...
    },
    remove: function (userId, doc) {
        return true;
    }
});