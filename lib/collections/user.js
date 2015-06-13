/*Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        optional: true,
        autoform: {
            type: "selectize",
            options: function() {
                return [
                {label: "Male", value: "Male"},
                {label: "Female", value: "Female"},
                ];
            }
        }
    },
    bio: {
        type: String,
        optional: true
    },
   country: {
       type: String,
       label: "Choose resident country",
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "USA", value: "USA"},
               {label: "UK", value: "UK"},
               {label: "Ghana", value: "Ghana"},
               {label: "Other", value: "Other"}
               ];
           }
       }
   },
   city: {
       type: String,
       label: "Choose resident city",
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "New York", value: "New York"},
               {label: "London", value: "London"},
               {label: "Accra", value: "Accra"},
               {label: "San Francisco", value: "San Francisco"},


               ];
           }
       }

   },
   travel_route_from: {
       type: String,
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "Ghana", value: "Ghana"},
               {label: "UK", value: "UK"},
               {label: "USA", value: "USA"},

               ];
           }

       }
   },
   travel_route_to: {
       type: String,
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "Ghana", value: "Ghana"},
               {label: "UK", value: "UK"},
               {label: "USA", value: "USA"},

               ];
           }

       }
   },
    number_of_travels: {
        type: Number,
        label: "How many times do you travel on this route per year?"
    },
    available_as_carrier: {
        type: Boolean,
        label: "Do you want to receive package delivery requests?"
    },
});*/

// Meteor.users.attachSchema(Schema.UserProfile);