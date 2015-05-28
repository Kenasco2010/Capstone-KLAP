Meteor.users.allow({
    remove:function(userId, doc) { 
        return true ;
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