SimpleSchema.messages({
  maxString: "[label] cannot exceed [max] characters"
})

Items = new Mongo.Collection("items");

Items.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Add a title (eg. Box of chocolates)",
    max: 100
  },
  description: {
    type: String,
    label: "Add a description (optional)",
    max: 200,
    optional: true
  },
  weight: {
    type: Number,
    label: "Please specify the weight of the item (in kg)"
  },
  reward: {
    type: Number,
    label: "How much are you willing to pay (dollars) as reward?"
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
            label: item.postitem_destinaton_country,
            value: item.postitem_destinaton_country
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
