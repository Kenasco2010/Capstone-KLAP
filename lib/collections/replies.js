Replies = new Mongo.Collection("replies");

Replies.attachSchema(new SimpleSchema({
    text: {
        type: String,
        max: 400
    },
    messageId: {
        type: String,
        autoform: {
            omit: true
        }
    },
    owner: {
      type: String,
      autoform: {
        omit: true
      },
      autoValue: function() {
        if(this.isInsert) {
          return Meteor.userId();
        }
      }
    },
    createdAt: {
      type: Date,
      autoform: {
        omit: true
      },
      autoValue: function() {
        if(this.isInsert) {
          return new Date();
        }
      }
    }
}))