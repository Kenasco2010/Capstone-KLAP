Messages = new Mongo.Collection("messages");

Messages.attachSchema(new SimpleSchema({
    subject: {
        type: String,
        max: 200
    },
    message: {
        type: String,
        max: 400
    },
    status: {
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
    sent_to: {
      type: [String],
      autoform: {
        omit: true
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