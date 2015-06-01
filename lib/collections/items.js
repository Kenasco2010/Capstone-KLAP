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
        type: String,
        label: "What is the weight of the package",
        autoform: {
            type: "selectize",
            options: function() {
                return [
                    {label: "Less than 5 pounds", value: "Less than 5 pounds"},
                    {label: "Between 5 and 10 pounds", value: "5 - 10 pounds"},
                    {label: "Between 10 and 15 pounds", value: " 10 - 15 pounds"},
                    {label: "Between 15 and 20 pounds", value: " 15 - 2- pounds" }
                ];
            }
        }
    },
    reward: {
        type: Number,
        label: "How much are you willing to pay (dollars)",
    },
    send_date: {
      type: Date,
    },
    delivery_date: {
      type: Date,
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