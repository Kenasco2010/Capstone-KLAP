Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loadingTemplate",
	notFoundTemplate: 'notSignIn'
	
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
		evenTrips: evenTrips,
		items: items,
		trips: trips
	}

}
})

Router.route("/item/:_id/itemdetails", function(){
	this.render("itemDetails");
},
{
	name: "itemDetails",
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications

	}
}
})

Router.route("/my-profile/notifications", function(){
	this.render("notifications");
},
{	name: "notifications",
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications
	}
}
})

Router.route("/my-profile/notification/:_id", function(){
	this.render("notificationView");
},
{	name: "notification-view",
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications,
		notification: notification
	}
}
})

Router.route("/my-profile/requests-home", function(){
	this.render("requestsHome");
},
{	name: "requests-home",
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications
	}; 
}

})

Router.route("/my-profile/closed-requests", function(){
	this.render("closedRequests");
},
{	name: "closed-requests",
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
		messages: recievedMessages,
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
data: function(){
	var _id = Meteor.userId();
	var user = Meteor.user();
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
	var requestId = this.params._id;
	var request = Requests.findOne(requestId);
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		request: request,
		sent_requests: sent_requests,
		notifications: notifications,
		unreadNotifications: unreadNotifications
	}; 
}
})

Router.route("/my-profile/messages-home", function(){
	this.render("messagesHome");
},
{	name: "messages-home",
data: function(){
	var _id = Meteor.userId();
	var recievedMessages = Messages.find({sent_to: _id}).fetch();
	var unreadMessages = [];
	var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
	var unread_replies_for_user_messages = [];
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
	var requestId = this.params._id;
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications

	};
} 
})

Router.route("/my-profile/sent-messages", function(){
	this.render("sentMessages");
},
{	name: "sent-messages",
data: function(){
	var _id = Meteor.userId();
	var recievedMessages = Messages.find({sent_to: _id}).fetch();
	var userSentMessages = Messages.find({owner: _id}).fetch();
	var unreadMessages = [];
	var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
	var unread_replies_for_user_messages = [];
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
	var requestId = this.params._id;
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
		messages: recievedMessages,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		userSentMessages: userSentMessages,
		unreadNotifications: unreadNotifications

	}; 
}

})


Router.route("/my-profile/message/:_id/", function(){
	this.render("messageView");
},
{	name: "message-view",

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
	var recievedMessages = Messages.find({sent_to: _id}).fetch();
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
	var messages = Messages.find({sent_to: _id});
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

	$(replies).each(function(index, value) {
		if (value.status == "unread") {
			unreadReplies.push(value);
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
		messages: recievedMessages,
		unreadMessages: unreadMessages,
		message: message,
		sender: sender,
		replies: replies,
		unreadReplies: unreadReplies,
		unreadRep: unread_replies_for_user_messages,
		unreadRequests: unreadRequests,
		openRequests: openRequests,
		closedRequests: closedRequests,
		notifications: notifications,
		unreadNotifications: unreadNotifications
	}; 
}


})

Router.route(":_id/edit/item", function(){
	this.render("editItem");
},
{	name: "edit-item",
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

