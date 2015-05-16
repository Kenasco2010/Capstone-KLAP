Emails = new Mongo.Collection('emails');
Emails.attachSchema(new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "E-mail address"
	},
	typeOfUser: {
		type: String,
		allowedValues: [ 'International shopper', 'International traveller', 'Both' ],
		label: "Join klapEx as an ?"
	},

}))