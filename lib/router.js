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
		evenTrips: evenTrips
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
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
			console.log(openRequests);
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
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
			console.log(openRequests);
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
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
			console.log(openRequests);
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
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
		var user = Meteor.users.findOne(_id);
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var req_carry = Requests.find({carrierId: _id}).fetch();
		var app_carry = Requests.find({senderId: _id}).fetch();
		var requests = req_carry.concat(app_carry);
		var unreadRequests = [];
		var openRequests = [];
		var closedRequests = [];
		var requestId = this.params._id;
		var request = Requests.findOne(requestId);
		var req_to_carry_item = Items.findOne({owner: request.owner});
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

		$(userMessages).each(function(index, value) {
			if (value.status == "unread") {
				console.log(value);
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
			unreadMessages: unreadMessages,
			messages: userMessages,
			unreadRep: unread_replies_for_user_messages,
			unreadRequests: unreadRequests,
			openRequests: openRequests,
			closedRequests: closedRequests,
			request: request,
			req_to_carry_item: req_to_carry_item,
			notifications: notifications,
			unreadNotifications: unreadNotifications
		}; 
	}

})

Router.route("/messages-home", function(){
	this.render("messagesHome");
},
{	name: "messages-home",
	data: function(){
		var _id = Meteor.userId();
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var unreadMessages = [];
		var replies_to_user_messages = Replies.find({sent_to: _id}).fetch();
		var unread_replies_for_user_messages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var notifications = Notifications.find({recipient: _id}).fetch();
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
			};
		});

		$(replies_to_user_messages).each(function(index, value) {
			if (value.status == "unread") {
				unread_replies_for_user_messages.push(value);
			};
		});

		$(userMessages).each(function(index, value) {
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
			unreadMessages: unreadMessages,
			messages: userMessages,
			unreadRep: unread_replies_for_user_messages,
			notifications: notifications,
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
		var userMessages = Messages.find({sent_to: _id}).fetch();
		var unreadMessages = [];
		var items = Items.find({owner: _id}).fetch();
		var oddItems = [];
		var evenItems = [];
		var trips = Travels.find({owner: _id}).fetch();
		var evenTrips = [];
		var oddTrips = [];
		var messages = Messages.find({sent_to: _id});
		var notifications = Notifications.find({recipient: _id}).fetch();
		var unreadNotifications = [];

		$(notifications).each(function(index, value) {
			if (value.status == "unread") {
				unreadNotifications.push(value);
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

		$(userMessages).each(function(index, value) {
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
			messages: messages,
			unreadMessages: unreadMessages,
			message: message,
			sender: sender,
			replies: replies,
			unreadReplies: unreadReplies,
			unreadRep: unread_replies_for_user_messages,
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

Router.route("/pending-items", function(){
	this.render("pendingItems");
},
{	name: "pending-items",
data: function() {
	var items = Items.find().fetch();
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
	}

}
})