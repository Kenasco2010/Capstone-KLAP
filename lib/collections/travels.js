Travels = new Mongo.Collection("travels");

SimpleSchema.messages({
  maxString: "[label] cannot exceed [max] characters"
})

Travels.attachSchema(new SimpleSchema({

  weight: {
    type: Number,
    label: "Please specify available luggage space (kg)"
  },
  general_thoughts: {
    type: String,
    max: 200,
    label: "Any thoughts on your travel/package delivery?"
  },
  travel_date: {
    type: Date
  },
  arrival_date: {
    type: Date
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
    autoform: {
      options: function() {
        return _.map(Config.countries, function(item, key) {
          return {
            label: item.origin_country,
            value: item.origin_country
          }
        });
      }
    }
  },
  origin_city:{
    type: String,
    autoform: {
      options: []
    }

  },
  destination_country:{
    type: String,
    autoform: {
      options: function() {
        return _.map(Config.countries, function(item, key) {
          return {
            label: item.posttravel_destination_country,
            value: item.posttravel_destination_country
          }
        });
      }
    }
  },
  destination_city:{
    type: String,
    autoform: {
      options: []
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