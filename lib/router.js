Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loadingTemplate",
	notFoundTemplate: '404'
	
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

Router.route('/signin', function(){
	this.render('signin');
},
{	name: 'signin'

})

Router.route('/signup', function(){
	this.render('signup');
},
{	name: 'signup'

})

Router.route('/create-profile', function(){
	this.render('createProfile');
},
{	name: 'create_profile'

})