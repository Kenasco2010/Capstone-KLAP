Schemas = {};

SimpleSchema.messages({
  maxString: "[label] cannot exceed [max] characters"
})

Schemas.updateProfile = new SimpleSchema({
    first_name: {
        type: String,
        max: 30
    },
    last_name: {
        type: String,
        max: 30
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
        optional: true,
        max: 400
    },
   country: {
       type: String,
       label: "Choose resident country",
  /*     autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "USA", value: "USA"},
               {label: "UK", value: "UK"},
               {label: "Ghana", value: "Ghana"},
               {label: "Other", value: "Other"}
               ];
           }
       }*/
       autoform: {
         options: function() {
           return _.map(Config.countries, function(item, key) {
             return {
               label: item.user_resident_country,
               value: item.user_resident_country
             }
           });
         }
       }
   },
   city: {
       type: String,
       label: "Choose resident city",
       optional: true,
/*       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "New York", value: "New York"},
               {label: "London", value: "London"},
               {label: "Accra", value: "Accra"},
               {label: "Accra", value: "Kumasi"},
               {label: "San Francisco", value: "San Francisco"},
               {label: "Other", value: "Other"}


               ];
           }
       }*/
       autoform: {
         options: []
       }
   },
   travel_route_from: {
       type: String,
       optional: true,
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "Ghana", value: "Ghana"},
               {label: "UK", value: "UK"},
               {label: "USA", value: "USA"},
               {label: "South Africa", value: "South Africa"},
               {label: "Nigeria", value: "Nigeria"},
               {label: "Kenya", value: "Kenya"},
               {label: "Germany", value: "Germany"},
               {label: "Dubai", value: "Dubai"},
               {label: "China", value: "China"}
               ];
           }

       }
   },
   travel_route_to: {
       type: String,
       optional: true,
       autoform: {
           type: "selectize",
           options: function() {
               return [
               {label: "Ghana", value: "Ghana"},
               {label: "UK", value: "UK"},
               {label: "USA", value: "USA"},
               {label: "South Africa", value: "South Africa"},
               {label: "Nigeria", value: "Nigeria"},
               {label: "Kenya", value: "Kenya"},
               {label: "Germany", value: "Germany"},
               {label: "Dubai", value: "Dubai"},
               {label: "China", value: "China"}

               ];
           }

       }
   },
    number_of_travels: {
        type: Number,
        optional: true,
        label: "How many times do you travel on this route per year?"
    },
    available_as_carrier: {
        type: Boolean,
        label: "Do you want to receive package delivery requests?"
    },
});

// Meteor.users.attachSchema(Schemas.updateProfile)