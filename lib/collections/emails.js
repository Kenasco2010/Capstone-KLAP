Emails = new Mongo.Collection('emails');
Emails.attachSchema(new SimpleSchema({
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		label: "E-mail address"
	},
	typeOfUser: {
		type: String,
		allowedValues: [ 'Carrying Items', 'Sending Items', 'Both' ],
		label: "Am interested in ?"
	},

}))