Items = new Mongo.Collection.("items");

Items.attachSchema(new SinpleSchema({
    name: {
        type: String,
    },
    description: {
        type: String,
    }
    weight: {
        type: Number,
    }
    price: {
        type: Number
    }
}))