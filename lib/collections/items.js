Items = new Mongo.Collection("items");

Items.attachSchema(new SimpleSchema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    weight: {
        type: Number,
    },
    reward: {
        type: Number
    },
    picture: {
        type: String
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