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
Template.home.events({
	'click .send-package': function(event, template){
		event.preventDefault();
		if(Meteor.userId()){

			Router.go('senderPostForm');
		}
		else{
			Router.go('signup');
		}
	},
	'click .carry-package': function(event, template){
		event.preventDefault();
		if(Meteor.userId()){

			Router.go('travellerPostForm');
		}
		else{
			Router.go('signup');
		}
	}
});
Template.listings.rendered = function () {
	return new WOW().init();
};

