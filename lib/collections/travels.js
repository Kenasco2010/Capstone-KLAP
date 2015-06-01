Travels = new Mongo.Collection("travels");

Travels.attachSchema(new SimpleSchema({
    weight: {
        type: String,
        label: "How much free space do you have",
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
    general_thoughts: {
      type: String,
      label: "Any thoughts on your travel/package delivery?"
    },
    travel_date: {
      type: Date
    },
    arrival_date: {
      type: Date
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