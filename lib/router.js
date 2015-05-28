Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loadingTemplate",
	notFoundTemplate: '404'
	
})


Router.route(":_id/user/profile", function() {
	this.render("userPublicProfile")
},
{	name: "user_profile",
data: function() {
	var _id = this.params._id;
	var reviews = Reviews.find({reviewee: _id});
	var reviewCount = reviews.count();
	return {
		user: Meteor.users.findOne(_id),
		reviews: reviews,
		reviewCount: reviewCount
	}

}
})

Router.route('/', function(){
	this.render('home');
},
{
	name: 'home'
});
Router.route('/emails', function(){
	this.render('emails');
},
{
	name: 'emails',
	data: function(){
		return{
			emails: Emails.find().fetch()

		}
	}
});

Router.route('/view_profile', function(){
	this.render('view_profile');
},
{
	name: 'view_profile'
});


Router.route('/create-profile', function(){
	this.render('createProfile');
},
{	name: 'create_profile'

})

Router.route('/sender-post-form', function(){
	this.render('senderPostForm');
},
{	name: 'senderPostForm'

})

Router.route('/welcome-page', function() {
	this.render("welcome");
},	
{
	name: "welcome-page"

})

Router.route("traveller-post-form", function(){
	this.render("travellerPostForm");
},
{	name: "travellerPostForm"
})

Router.route("/listings", function(){
		this.render("listings");
	},
	{	name: "listings",
		data: function() {
			var items = Items.find().fetch();
			var oddItems = [];
			var evenItems = [];
			var trips = Travels.find().fetch();
			var evenTrips = [];
			var oddTrips = [];

	        $(trips).each(function(index, value) {
		         if ( index % 2 == 0) {
		         	evenTrips.push(value);
		         }
		         else {
		         	oddTrips.push(value);
		         }
	        });

	        $(items).each(function(index, value) {
		         if ( index % 2 == 0) {
		         	evenItems.push(value);
		         }
		         else {
		         	oddItems.push(value);
		         }
	        });
			return {
				oddItems: oddItems,
				evenItems: evenItems,
				oddTrips: oddTrips,
				evenTrips: evenTrips
			}
		}

})
