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
    price: {
        type: Number
    }
}))