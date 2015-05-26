Items = new Mongo.Collection("items");

Items.attachSchema(new SimpleSchema({
    description: {
        type: String,
        label: "Add a title/description",
    },
    weight: {
        type: Number,
        label: "What is the weight of the package"
    },
    reward: {
        type: Number,
        label: "How much are you willing to pay (dollars)",
    },
    send_date: {
      type: Date,
      autoform: {
        omit: true
      }
    },
    delivery_date: {
      type: Date,
      autoform: {
        omit: true
      }
    },
    origin_country: {
      type: String,
      label: "Choose country",
      autoform: {
          type: "selectize",
          options: function() {
              return [
                  {label: "Ghana", value: "Ghana"},
                  {label: "UK", value: "UK"}
              ];
          }
      }
    },
    origin_city: {
      type: String,
      label: "Choose city",
      autoform: {
          type: "selectize",
          options: function() {
              return [
                  {label: "Accra", value: "Accra"},
                  {label: "Kumasi", value: "Kumasi"}
              ];
          }
      }
    },
    destination_country: {
      type: String,
      label: "Choose country",
      autoform: {
          type: "selectize",
          options: function() {
              return [
                  {label: "USA", value: "USA"},
                  {label: "UK", value: "UK"}
              ];
          }
      }
    },
    destination_city: {
      type: String,
      label: "Choose city",
      autoform: {
          type: "selectize",
          options: function() {
              return [
                  {label: "New York", value: "New York"},
                  {label: "London", value: "London"}
              ];
          }
      }
    },
    absoluteImageUrl: {
      type: String,
      label: "select image",
      autoform: {
        omit: true
      }
    },
    relativeImageUrl: {
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