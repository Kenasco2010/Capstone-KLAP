Template.navigation.events({
  "click [data-action='sign-out']": function () {
    Meteor.logout(function() {
      Router.go('home');
    })
  }
});

Template.myProfile.events({
  "click [data-action='delete-item']": function (e, t) {
    var ItemId = e.currentTarget.getAttribute('data-id');
    var item = Items.findOne(ItemId);
    sweetAlert({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      html: false
    }, function(){
      Meteor.call('removeItem', ItemId, function (error, result) {
        if (error) {}
          else {
            S3.delete(
              item.relativeImageUrl,
              function(error, success) {
                if (error) {
                  console.log(error);
                };
              });
          }
        });
      swal("Deleted!",
        "this post has been deleted.",
        "success");
    });

    
  },
  "click [data-action='delete-trip']": function(e,t){
    var tripId = e.currentTarget.getAttribute('data-id');
    var trip = Travels.findOne(tripId);
    sweetAlert({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      html: false
    }, function(){
      Meteor.call('removeTrip', tripId, function (error, result) {
        if (error) {}
          else {
          }
        });
      swal("Deleted!",
        "this post has been deleted.",
        "success");
    });
  },
  "click .list-group": function(e, t){
    var messageId = e.currentTarget.getAttribute('data-id');
    Meteor.call('updateUserMessageStatus', messageId, function (error, result) {});
  }
});

Template.userPublicProfile.rendered = function () {
  $this = this;
  ratings = $this.ratings.get();
  userId = $this.userId.get();
  $('.ui.rating').rating('setting', 'onRate', function(value) {
          // Session.set("review-value", value);
          if (Meteor.userId() == this.id) {
            swal("Illegal Operation");
          }
          else {
            $this.ratings.set(value);
            $this.userId.set(this.id);
          }
        });
};

Template.userPublicProfile.events({
  'click #hide-reviews': function() {
    $(".second-container").slideUp();
  },
  'click .show-reviews': function() {
   $(".second-container").slideDown();
 },
 'click .btn-send-msg': function() {
      // $("#messageModal").modal("show");
      $('.ui.send-message.modal')
      .modal('show')
      ;
    },
    'click .btn-send-request': function(){
      var carrierId = $("p.getme").attr("data-user-id");
      $(".ui.send-request.modal").modal("setting", {
        closable: false,
        onApprove: function () {
         var req_carry_itemId = Session.get("itemSelected");
         Meteor.call('requestToCarry', req_carry_itemId, carrierId, function (error, result) {
          if (error) {
            $('.ui.send-request.modal').modal('hide');
            swal("Sorry! something went wrong");
          }
          else {
            $('.ui.send-request.modal').modal('hide');
            swal("Thanks! your request has been sent");
          }
        });
         return false;
       }
     }).modal("show");
    }
  });

Template.tripDetails.events({
  'click .btn-send-req': function () {
   var carrierId = this.owner;
   $(".ui.send-request.modal").modal("setting", {
     closable: false,
     onApprove: function () {
      var req_carry_itemId = Session.get("itemSelected");
      Meteor.call('requestToCarry', req_carry_itemId, carrierId, function (error, result) {
       if (error) {
         $('.ui.send-request.modal').modal('hide');
         swal("Sorry! something went wrong");
       }
       else {
         $('.ui.send-request.modal').modal('hide');
         swal("Thanks! your request has been sent");
       }
     });
      return false;
    }
  }).modal("show");
   console.log(this);
 }
});

Template.userPublicProfile.created = function () {
  var instance = this;
    // initialize the reactive variable
    instance.ratings = new ReactiveVar(0);
    instance.userId = new ReactiveVar("dummytext");

    instance.autorun(function () {

        // get the rating
        var ratings = instance.ratings.get();
        var userId = instance.userId.get();

        Meteor.call("updateRatings", userId, ratings, function(err, result){
          if (err) {
           console.log(err);
         }
         else {
           console.log(result);
         }
       })

      });
  };

  Template.listings.rendered = function () {
    $('.menu .item').tab();
    new WOW().init()
  };

  Template.myProfile.rendered = function () {
    $('.menu .item').tab();
  };

  Template.closedRequests.rendered = function () {
   $('.menu .item').tab();
 };

 Template.requestsHome.rendered = function () {
   $('.menu .item').tab();
 };

 Template.notifications.rendered = function () {
  $('.menu .item').tab();
};

Template.notificationView.rendered = function () {
 $('.menu .item').tab();
};
Template.navigation.rendered = function () {
/* $('.ui.dropdown')
   .dropdown()
   ;*/
   $('.dropdown-toggle').dropdown();
 };

 Template.sentMessages.rendered = function () {
  $('.menu .item').tab();
};

Template.messageView.rendered = function () {
  $('.menu .item').tab();
  var messageId = Router.current().params._id;
  Meteor.call('updateReplyMessageStatus', messageId, function (error, result) {});
};

Template.messagesHome.rendered = function () {
  $('.menu .item').tab();
};

Template.requestDetails.rendered = function () {
  $('.menu .item').tab();
};


Template.postItem.events({
  'submit #postItemForm': function () {
   if($("input.file_bag").val() == ''){
        // your error validation action
        $("div#attach-pic").addClass('has-error');
        Session.set("has-error", true);
      }
    },
    'change #item_post_origin_country': function (e,t) {
      var countries = e.currentTarget.value ? e.currentTarget.value : null
      Session.set('countries', countries);
      console.log(Session.get('countries'));

    },
    'change #item_post_destination_country': function (e,t) {
      var countries = e.currentTarget.value ? e.currentTarget.value : null
      Session.set('postitemdestinationcountries', countries);

    }

  });
Template.postTravel.events({
  'change #traveller_origin_country': function(e,t){
    var countries = e.currentTarget.value ? e.currentTarget.value : null
    Session.set('countries', countries);
  },
  'change #traveller_destination_country': function(e,t){
    var countries = e.currentTarget.value ? e.currentTarget.value : null
    Session.set('posttraveldestinationcountries', countries);
  }
});
Template.messagesHome.events({
  "click .list-group": function(e, t){
    var messageId = e.currentTarget.getAttribute('data-id');
    Meteor.call('updateUserMessageStatus', messageId, function (error, result) {});
  }
});
Template.createProfile.events({
  'change #create_profile_country': function(e,t){
    // alert("you have clicked me")
    var countries = e.currentTarget.value ? e.currentTarget.value : null
    Session.set('createProfileResidenceCity', countries);
  }

})

Template.selectItem.rendered = function () {
/*  $('.ui.selection.dropdown')
     .dropdown('restore default text')
     ;*/

     $(".ui.selection.dropdown").dropdown({
      onChange: function (val) {
        Session.set("itemSelected", val);
      }
    })

   };

   Template.itemDetails.events({
    'click .btn-carry-req': function (e, t) {
      var senderId = $("p.get-item-owner").attr("data-user-id");
      var app_carry_itemId = $("p.get-item-id").attr("data-item-id");
      Meteor.call('applicationToCarry', app_carry_itemId, senderId, function (error, result) {
        if (error) {
          swal("Sorry! something went wrong");
        }
        else {
          swal("Thanks! your request has been sent");
        }
      });
    },
    'click #send-msg': function(e, t){
      $('.ui.send-message.modal')
      .modal('show')
      ;
    }
  });

/*   Template.requestDetails.events({
    'click #accept-btn': function (e, t) {
      var itemId = e.currentTarget.getAttribute('data-id');
      var item = Items.findOne(itemId);
      var itemOwner = item.owner;
      var recipient = itemOwner;
      var from = Meteor.userId();
      var status = "accepted"
      Meteor.call('acceptedItemStatus', status, itemId, function (error, result) {});
      Meteor.call('sendAcceptedNotification', recipient, from, itemId, function (error, result) {});
    },
    'click #reject-btn': function(e, t){
      var itemId = e.currentTarget.getAttribute('data-id');
      var item = Items.findOne(itemId);
      var itemOwner = item.owner;
      var recipient = itemOwner;
      var from = Meteor.userId();
      var status = "rejected"
      Meteor.call('rejectedItemStatus', status, itemId, function (error, result) {});
      Meteor.call('sendRejectedNotification', recipient, from, itemId, function (error, result) {});
    }
  });*/


   Template.requestDetails.events({
    'click #accept-btn': function (e, t) {
      var itemId = e.currentTarget.getAttribute('data-id');
      var item = Items.findOne(itemId);
      var itemOwner = item.owner;
      var recipient = itemOwner;
      var from = Meteor.userId();
      var status = "accepted";
      var action_status = "closed"
      Meteor.call('acceptedItemStatus', status, itemId, function (error, result) {});
      Meteor.call('sendAcceptedNotification', recipient, from, itemId, function (error, result) {});
      Meteor.call('updateRequestActionStatus', action_status, function (error, result) {});
    },
    'click #reject-btn': function(e, t){
      var itemId = e.currentTarget.getAttribute('data-id');
      var item = Items.findOne(itemId);
      var itemOwner = item.owner;
      var recipient = itemOwner;
      var from = Meteor.userId();
      var status = "rejected"
      Meteor.call('rejectedItemStatus', status, itemId, function (error, result) {});
      Meteor.call('sendRejectedNotification', recipient, from, itemId, function (error, result) {});
      Meteor.call('updateRequestActionStatus', action_status, function (error, result) {});
    }
  });


Template.notificationView.events({
  'click .notif-send-msg': function () {
    $('.ui.send-message.modal')
    .modal('show')
    ;
  }
});


Template.notifications.events({
  'click .notif-list-group': function (e, t) {
    var notifId = e.currentTarget.getAttribute('data-id');
    Meteor.call('updateNotifStatus', notifId, function (error, result) {});
  }
});

Template.requestsHome.events({
  'click .open-req-list-group': function (e, t) {
    var requestId = e.currentTarget.getAttribute('data-id');
    Meteor.call('updateRequestReadStatus', requestId, function (error, result) {});
  }
});

Template.footer.events({
  'click #send-item': function (e, t) {
    e.preventDefault();
    
    if (Meteor.userId()) {
      var userId = Meteor.userId();
      var user = Meteor.users.findOne(userId);
      var check_first_name = user.profile.first_name;

      if ( typeof(check_first_name) != "undefined") {
          Router.go("senderPostForm");
      }
    }
    else {
      Router.go("signin");
    }
  },
   'click #post-trip': function (e,t) {
    e.preventDefault();
    if (Meteor.userId()) {
      var userId = Meteor.userId();
      var user = Meteor.users.findOne(userId);
      var check_first_name = user.profile.first_name;

      if ( typeof(check_first_name) != "undefined") {
          Router.go("travellerPostForm");
      }
    }
    else {
      Router.go("signin");
    }
  },
   'click #pending-items': function (e,t) {
    e.preventDefault();
    if (Meteor.userId()) {
      var userId = Meteor.userId();
      var user = Meteor.users.findOne(userId);
      var check_first_name = user.profile.first_name;

      if ( typeof(check_first_name) != "undefined") {
          Router.go("listings");
      }
    }
    else {
      Router.go("signin");
    }
  },
   'click #upcoming-trips': function (e,t) {
    e.preventDefault();
    if (Meteor.userId()) {
      var userId = Meteor.userId();
      var user = Meteor.users.findOne(userId);
      var check_first_name = user.profile.first_name;

      if ( typeof(check_first_name) != "undefined") {
          Router.go("upcoming-trips");
      }
    }
    else {
      Router.go("signin");
    }
  }
});

