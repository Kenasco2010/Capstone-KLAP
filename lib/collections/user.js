Schemas = {};

SimpleSchema.messages({
  maxString: "[label] cannot exceed [max] characters"
})

Schemas.UserProfile = new SimpleSchema({
    photo: {
      type: String,
      optional: true,
    },
    first_name: {
        type: String,
        optional: true,
        max: 30
    },
    last_name: {
        type: String,
        optional: true,
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
       optional: true,
       label: "Choose resident country",
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
        optional: true,
        label: "Do you want to receive package delivery requests?"
    },
    city: {
        type: String,
        optional: true,
        autoform: {
          options: []
        }
      },
    number_of_deliveries: {
      type: Number,
      optional: true,
      autoValue: function(){
        if(this.isInsert){
          return 0;
        }
      }
    },
    onboarded: {
      type: Boolean,
      optional: true,
      autoValue: function(){
        if(this.isInsert){
          return false;
        }
      }
    }
});


Schemas.User = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    optional: true
  },
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: Schemas.UserProfile
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  roles: {
    type: [String],
    blackbox: true,
    optional: true
  }
});

Meteor.users.attachSchema(Schemas.User);