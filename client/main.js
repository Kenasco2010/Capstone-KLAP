Template.registerHelper('emailscount',function(){
	return Emails.find().count()
})