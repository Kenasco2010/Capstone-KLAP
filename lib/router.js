Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loadingTemplate",
	notFoundTemplate: 'notSignIn'
	
})

Router.route(":_id/user/profile", function() {
	this.render("userPublicProfile")
},
{	name: "user_profile",
waitOn: function() {
  return Meteor.subscribe('reviews');
},
data: function() {
	var _id = this.params._id;
	var myreviews = Reviews.find({reviewee: _id});
	var reviews = ReviewsPagination.find({reviewee: _id}, {itemsPerPage:10});
	var reviewCount = myreviews.count();
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
waitOn: function() {
	this.subscribe('travels')
  return Meteor.subscribe('items');
},
data: function() {
	var  items = ItemsPagination.find({}, {itemsPerPage:10});
	var paginationItems = ItemsPagination.find({}, {itemsPerPage:10}).fetch();
	var oddItems = [];
	var evenItems = [];
	var trips = TripsPagination.find({}, {itemsPerPage:10});
	var paginationTrips = TripsPagination.find({}, {itemsPerPage:10}).fetch();
	var evenTrips = [];
	var oddTrips = [];

	$(paginationTrips).each(function(index, value) {
		if ( index % 2 == 0 ) {
			evenTrips.push(value);
		}
		else {
			oddTrips.push(value);
		}
	});

	$(paginationItems).each(function(index, value) {
		if ( index % 2 == 0 && value.acceptance_status != "accepted") {
			evenItems.push(value);
		}
		else if ( index % 2 != 0 && value.acceptance_status != "accepted") {
			oddItems.push(value);
		}
	});

	return {
		oddItems: oddItems,
		evenItems: evenItems,
		oddTrips: oddTrips,
		evenTrips: evenTrips,
		items: items,
		trips: trips,
		paginationItems: paginationItems,
		paginationTrips: paginationTrips
	}

}
})

Router.route("/item/:_id/itemdetails", function(){
	this.render("itemDetails");
},
{
	name: "itemDetails",
	waitOn: function() {
	  return Meteor.subscribe('items');
	},
	data: function(){
		var itemId = this.params._id;
		return {
			itemDetails: Items.findOne(itemId)
		}
	}
});

Router.route("/my-profile", function(){
	this.render("myProfile");
},
{	name: "my-profile",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.users.findOne(_id);
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = RequestsPagination.find({carrierId: _id}, {itemsPerPage:10}).fetch();
		var rec_req_carry_your_item = RequestsPagination.find({senderId: _id}, {itemsPerPage:10}).fetch();
		var sent_requests = RequestsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
		var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10});
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationTrips: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			pagRequests: pagRequests,
			notifications: notifications,
			unreadNotifications: unreadNotifications,
			pagNotifications: pagNotifications
}
}
})

Router.route("/my-profile/notifications", function(){
	this.render("notifications");
},
{	name: "notifications",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.users.findOne(_id);
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
		var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10});
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationTrips: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			pagRequests: pagRequests,
			notifications: notifications,
			unreadNotifications: unreadNotifications,
			pagNotifications: pagNotifications
}
}
})

Router.route("/my-profile/notification/:_id", function(){
	this.render("notificationView");
},
{	name: "notification-view",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.users.findOne(_id);
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
		var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1});
		var unreadNotifications = [];
		var notifId = this.params._id;
		var notification = Notifications.findOne(notifId);

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationTrips: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			pagRequests: pagRequests,
			notifications: notifications,
			unreadNotifications: unreadNotifications,
			notification: notification,
			pagNotifications: pagNotifications
}
}
})

Router.route("/my-profile/requests-home", function(){
	this.render("requestsHome");
},
{	name: "requests-home",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.users.findOne(_id);
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
		var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10});
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationTrips: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			pagRequests: pagRequests,
			notifications: notifications,
			unreadNotifications: unreadNotifications,
			pagNotifications: pagNotifications
		}; 
	}
})

Router.route("/my-profile/closed-requests", function(){
	this.render("closedRequests");
},
{	name: "closed-requests",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.users.findOne(_id);
		var recievedMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var notifications = Notifications.find({recipient: _id}).fetch();
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(recievedMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(items).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(trips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			unreadMessages: unreadMessages,
			messages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			notifications: notifications,
			unreadNotifications: unreadNotifications
		}; 
}
})

Router.route("/my-profile/request/:_id", function(){
	this.render("requestDetails");
},
{	name: "request-details",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var user = Meteor.user();
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var requestId = this.params._id;
		var request = Requests.findOne(requestId);
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1});
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationItems: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			request: request,
			sent_requests: sent_requests,
			notifications: notifications,
			unreadNotifications: unreadNotifications,
			pagNotifications: pagNotifications
		}; 
}
})

Router.route("/my-profile/messages-home", function(){
	this.render("messagesHome");
},
{	name: "messages-home",
waitOn: function(){
	this.subscribe('travels');
	this.subscribe('authUsers');
	this.subscribe('messages');
	this.subscribe('replies');
	this.subscribe('requests');
	this.subscribe('notifications');
	return Meteor.subscribe('items');
},
data: function(){
	var _id = Meteor.userId();
	var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
	var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
	var unreadMessages = [];
	var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
	var unread_replies_for_user_messages = [];
	var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
	var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
	var oddItems = [];
	var evenItems = [];
	var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
	var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
	var evenTrips = [];
	var oddTrips = [];
	var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
	var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
	var sent_requests = Requests.find({owner: _id}).fetch();
	// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
	var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
	var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
	var unreadRequests = [];
	var openRequests = [];
	var closedRequests = [];
	var requestId = this.params._id;
	var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1}).fetch();
	var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:1});
	var unreadNotifications = [];

	$(notifications).each(function(index, value) {
		if (value.status == "unread") {
			unreadNotifications.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.read_status == "unread") {
			unreadRequests.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.action_status == "open") {
			openRequests.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.action_status == "closed") {
			closedRequests.push(value);
		};
	});

	$(replies_to_user_messages).each(function(index, value) {
		if (value.status == "unread") {
			unread_replies_for_user_messages.push(value);
		};
	});

	$(pagRecMessages).each(function(index, value) {
		if (value.status == "unread") {
			unreadMessages.push(value);
		};
	});

	$(paginationItems).each(function(index, value) {
		if ( index % 2 == 0) {
			evenItems.push(value);
		}
		else {
			oddItems.push(value);
		}
	});

	$(paginationTrips).each(function(index, value) {
		if ( index % 2 == 0) {
			evenTrips.push(value);
		}
		else {
			oddTrips.push(value);
		}
	});
	return {
		user: Meteor.users.findOne(_id),
		oddItems: oddItems,
		evenItems: evenItems,
		oddTrips: oddTrips,
		evenTrips: evenTrips,
		items: items,
		trips: trips,
		paginationItems: paginationItems,
		paginationTrips: paginationTrips,
		unreadMessages: unreadMessages,
		messages: recievedMessages,
		pagRecMessages: pagRecMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		pagRequests: pagRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications,
		pagNotifications: pagNotifications

	};
} 
})

Router.route("/my-profile/sent-messages", function(){
	this.render("sentMessages");
},
{	name: "sent-messages",
	waitOn: function(){
		this.subscribe('travels');
		this.subscribe('authUsers');
		this.subscribe('messages');
		this.subscribe('replies');
		this.subscribe('requests');
		this.subscribe('notifications');
		return Meteor.subscribe('items');
	},
	data: function(){
		var _id = Meteor.userId();
		var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10});
		var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:10}).fetch();
		var userSentMessages = MessagesPagination.find({owner: _id}, {itemsPerPage:10});
		var pagUserSentMessages = MessagesPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var unreadMessages = [];
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
		var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
		var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
		var sent_requests = Requests.find({owner: _id}).fetch();
		// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
		var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
		var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var requestId = this.params._id;
		var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10}).fetch();
		var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10});
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.read_status == "unread") {
				unreadRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "open") {
				openRequests.push(value);
			};
		});

		$(requests).each(function(index, value) {
			if (value.action_status == "closed") {
				closedRequests.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(pagRecMessages).each(function(index, value) {
			if (value.status == "unread") {
				unreadMessages.push(value);
			};
		});

		$(paginationItems).each(function(index, value) {
			if ( index % 2 == 0) {
				evenItems.push(value);
			}
			else {
				oddItems.push(value);
			}
		});

		$(paginationTrips).each(function(index, value) {
			if ( index % 2 == 0) {
				evenTrips.push(value);
			}
			else {
				oddTrips.push(value);
			}
		});
		return {
			user: Meteor.users.findOne(_id),
			oddItems: oddItems,
			evenItems: evenItems,
			oddTrips: oddTrips,
			evenTrips: evenTrips,
			items: items,
			trips: trips,
			paginationItems: paginationItems,
			paginationTrips: paginationTrips,
			unreadMessages: unreadMessages,
			messages: recievedMessages,
			pagRecMessages: pagRecMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			pagRequests: pagRequests,
			notifications: notifications,
			userSentMessages: userSentMessages,
			unreadNotifications: unreadNotifications,
			pagNotifications: pagNotifications

		}; 
	}

})


Router.route("/my-profile/message/:_id/", function(){
	this.render("messageView");
},
{	name: "message-view",
waitOn: function(){
	this.subscribe('travels');
	this.subscribe('authUsers');
	this.subscribe('messages');
	this.subscribe('replies');
	this.subscribe('requests');
	this.subscribe('notifications');
	return Meteor.subscribe('items');
},
data: function(){
	var _id = Meteor.userId();
	var messageId = this.params._id;
	var message = Messages.findOne(messageId);
	var senderId = message.owner;
	var sender = Meteor.users.findOne(senderId);
	var replies = Replies.find({messageId: messageId}).fetch();
	var unreadReplies = [];
	var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
	var unread_replies_for_user_messages = [];
	var recievedMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:1});
	var pagRecMessages = MessagesPagination.find({sent_to: _id}, {itemsPerPage:1}).fetch();
	var unreadMessages = [];
	var  items = ItemsPagination.find({owner: _id}, {itemsPerPage:10});
	var paginationItems = ItemsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
	var oddItems = [];
	var evenItems = [];
	var trips = TripsPagination.find({owner: _id}, {itemsPerPage:10});
	var paginationTrips = TripsPagination.find({owner: _id}, {itemsPerPage:10}).fetch();
	var evenTrips = [];
	var oddTrips = [];
	var rec_req_carry_user_item = Requests.find({carrierId: _id}).fetch();
	var rec_req_carry_your_item = Requests.find({senderId: _id}).fetch();
	var sent_requests = Requests.find({owner: _id}).fetch();
	// var requests = rec_req_carry_user_item.concat(rec_req_carry_your_item, sent_requests);
	var requests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10}).fetch();
	var pagRequests = RequestsPagination.find( { $or: [ { carrierId: _id }, { senderId: _id }, {owner: _id} ] },  {itemsPerPage:10});
	var unreadRequests = [];
	var openRequests = [];
	var closedRequests = [];
	var messages = Messages.find({sent_to: _id});
	var notifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10}).fetch();
	var pagNotifications = NotificationsPagination.find({recipient: _id}, {itemsPerPage:10});
	var unreadNotifications = [];

	$(notifications).each(function(index, value) {
		if (value.status == "unread") {
			unreadNotifications.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.read_status == "unread") {
			unreadRequests.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.action_status == "open") {
			openRequests.push(value);
		};
	});

	$(requests).each(function(index, value) {
		if (value.action_status == "closed") {
			closedRequests.push(value);
		};
	});
	$(replies_to_user_messages).each(function(index, value) {
		if (value.status == "unread") {
			unread_replies_for_user_messages.push(value);
		};
	});

	$(replies).each(function(index, value) {
		if (value.status == "unread") {
			unreadReplies.push(value);
		};
	});

	$(pagRecMessages).each(function(index, value) {
		if (value.status == "unread") {
			unreadMessages.push(value);
		};
	});

	$(paginationItems).each(function(index, value) {
		if ( index % 2 == 0) {
			evenItems.push(value);
		}
		else {
			oddItems.push(value);
		}
	});

	$(paginationTrips).each(function(index, value) {
		if ( index % 2 == 0) {
			evenTrips.push(value);
		}
		else {
			oddTrips.push(value);
		}
	});
	return {
		user: Meteor.users.findOne(_id),
		oddItems: oddItems,
		evenItems: evenItems,
		oddTrips: oddTrips,
		evenTrips: evenTrips,
		items: items,
		trips: trips,
		paginationItems: paginationItems,
		paginationTrips: paginationTrips,
		messages: recievedMessages,
		pagRecMessages: pagRecMessages,
		unreadMessages: unreadMessages,
		message: message,
		sender: sender,
		replies: replies,
		unreadReplies: unreadReplies,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		pagRequests: pagRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications,
		pagNotifications: pagNotifications
	}; 
}


})

Router.route(":_id/edit/item", function(){
	this.render("editItem");
},
{	name: "edit-item",
waitOn: function(){
	return Meteor.subscribe('items');
},
data: function(){
	var _id = this.params._id;
	return {
		item: Items.findOne(_id)
	}
}
})

Router.route(":_id/edit/trip", function(){
	this.render("editTrip");
},
{	name: "edit-trip",
waitOn: function(){
	return Meteor.subscribe('travels');
},
data: function(){
	var _id = this.params._id;
	return {
		trip: Travels.findOne(_id)
	}
}
})

Router.route("/notsignin", function(){
	this.render("notSignIn");
},{
	name: "notSignIn"
});

Router.route("/upcoming-trips", function(){
	this.render("upcomingTrips");
},
{	name: "upcoming-trips",
waitOn: function(){
	return Meteor.subscribe('travels');
},
data: function() {
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

	return {
		oddTrips: oddTrips,
		evenTrips: evenTrips
	}

}
})

Router.route("/:_id/filtered-items", function(){
	this.render("filteredItems");
},
{	name: "filteredItems",
waitOn: function(){
	this.subscribe('travels');
	return Meteor.subscribe('items');
},
data: function() {
	var tripId = this.params._id;
	var trip = Travels.findOne(tripId);
	var trip_origin_country = trip.origin_country;
	var trip_destination_country = trip.destination_country;
	var items = Items.find({origin_country: trip_origin_country, destination_country: trip_destination_country}).fetch();

	var oddItems = [];
	var evenItems = [];

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
		items: items
	}

}
})

Router.route("/detail/trip/:_id", function(){
	this.render("tripDetails");
},
{	name: "tripDetails",
waitOn: function(){
	return Meteor.subscribe('travels');
},
data: function(){
	var tripId = this.params._id;
	return {
		trip: Travels.findOne(tripId)
	}
}
})
Router.route('/country', function(){
	this.render('country')
},{

	name:'country'
})

