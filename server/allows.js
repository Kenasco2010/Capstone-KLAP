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
         return (userId && (userId === doc.owner));
    },
    remove: function (userId, doc) {
         return (userId && (userId === doc.owner));
    }
});

Travels.allow({
    insert: function (userId, doc) {
        //...
    },
    update: function (userId, doc, fields, modifier) {
        return (userId && (userId === doc.owner));
    },
    remove: function (userId, doc) {
        return (userId && (userId === doc.owner));
    }
});