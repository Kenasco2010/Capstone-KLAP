Items = new Mongo.Collection("items");

Items.attachSchema(new SimpleSchema({
    title: {
      type: String,
      label: "Add a title (eg. Box of chocolates)"
    },
    description: {
        type: String,
        label: "Add a description (optional)",
        optional: true
    },
    weight: {
        type: Number,
        label: "Please specify the weight of the item (in kg)",
      },
    reward: {
        type: Number,
        label: "How much are you willing to pay (dollars) as reward?",
    },
    send_date: {
      type: Date,
    },
    delivery_date: {
      type: Date,
    },
    acceptance_status: {
      type: String,
      autoform: {
        omit: true
      }
    },
    delivery_status: {
      type: String,
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
                  {label: "UK", value: "UK"},
                  {label: "US", value: "US"}
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
                  {label: "London", value: "London"},
                  {label: "New York", value: "New York"}
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
                  {label: "UK", value: "UK"},
                  {label: "Ghana", value: "Ghana"}
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
                  {label: "London", value: "London"},
                  {label: "Accra", value: "Accra"}
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