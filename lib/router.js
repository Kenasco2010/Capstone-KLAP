Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loadingTemplate",
	notFoundTemplate: '404'
	
})

Router.route("check-me", function(){
	this.render("checkMe");
})
Router.route("/user/profile", function() {
	this.render("userPublicProfile")
},
{	name: "user_profile"
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
Router.route('/sender-post', function(){
	this.render('senderpost');
},
{	name: 'sender-post'

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
