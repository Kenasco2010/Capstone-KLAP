Template.registerHelper('emailscount',function(){
	return Emails.find().count()
})

Template.home.events({
	'click .submit': function(){
		// var data = Emails.find().fetch()
		// var entry = document.getElementById('emails').value;
		// console.log(entry)
		// if (entry === data){
		// 	alert("you hgave entered data 2x");
		// }
	}

})

