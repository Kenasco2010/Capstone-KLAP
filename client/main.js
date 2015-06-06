Template.registerHelper('emailscount',function(){
	return Emails.find().count()
})

// Template.home.events({
// 	'click .submit': function(){
// 		// var data = Emails.find().fetch()
// 		// var entry = document.getElementById('emails').value;
// 		// console.log(entry)
// 		// if (entry === data){
// 		// 	alert("you hgave entered data 2x");
// 		// }
// 	}

// })
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


//This section of the code gets the particular country and reveals its cities
Template.registerHelper('cityListings', function () {

//this is linked to the province field in the EVENTS collection
var index = _.pluck(Config.countries, 'origin_country').indexOf(Session.get('countries'));
var provinceByCountry = Config.countries[index] ? (Config.countries[index]).origin_city : null

	//Returning the name from provinces attached to country

	array = _.map(provinceByCountry, function(item, key) {
		return {
			label: item,
			value: item
		}
	});
	return array;

});

//This section of the code gets the particular country and reveals its cities
Template.registerHelper('posttraveldestinationcityListings', function () {
//this is linked to the province field in the EVENTS collection
var index = _.pluck(Config.countries, 'posttravel_destination_country').indexOf(Session.get('posttraveldestinationcountries'));

var provinceByCountry = Config.countries[index] ? (Config.countries[index]).origin_city : null

	//Returning the name from provinces attached to country
	array = _.map(provinceByCountry, function(item, key) {
		return {
			label: item,
			value: item
		}
	});
	
	return array;

});

//This section of the code gets the particular country and reveals its cities
Template.registerHelper('postitemdestinationcityListings', function () {
//this is linked to the province field in the EVENTS collection
var index = _.pluck(Config.countries, 'origin_country').indexOf(Session.get('postitemdestinationcountries'));

var provinceByCountry = Config.countries[index] ? (Config.countries[index]).origin_city : null

	//Returning the name from provinces attached to country
	array = _.map(provinceByCountry, function(item, key) {
		return {
			label: item,
			value: item
		}
	});
	return array;

});
