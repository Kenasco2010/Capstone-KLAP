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
Router.route('/view_profile', function(){
	this.render('view_profile');
},
{
	name: 'view_profile'
});