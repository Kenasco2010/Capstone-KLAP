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
          $this.ratings.set(value);
          $this.userId.set(this.id);
      });
};

Template.userPublicProfile.events({
    'click .rating': function () {
        console.log(this);
       console.log(Session.get("review-value"));
    },
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

Template.postItem.rendered = function () {
  $(".date-picker").pickadate();

};

Template.postTravel.rendered = function () {
  $(".date-picker").pickadate();
};

Template.editTripForm.rendered = function () {
  $(".date-picker").pickadate();
};

Template.searchForm.rendered = function () {
  $(".date-picker").pickadate();
};

Template.editItemForm.rendered = function () {
  $(".date-picker").pickadate();
};

Template.listings.rendered = function () {
  $('.menu .item').tab();
  new WOW().init()
};

Template.myProfile.rendered = function () {
  $('.menu .item').tab();
};

Template.navigation.rendered = function () {
  $('.ui.dropdown')
    .dropdown()
  ;
};

Template.messageView.rendered = function () {
  $('.menu .item').tab();
   var messageId = Router.current().params._id;
   Meteor.call('updateReplyMessageStatus', messageId, function (error, result) {});
};

Template.messagesHome.rendered = function () {
  $('.menu .item').tab();
};


Template.postItem.events({
  'submit #postItemForm': function () {
     if($("input.file_bag").val() == ''){
        // your error validation action
        $("div#attach-pic").addClass('has-error');
        Session.set("has-error", true);
    }
  }
});

Template.messagesHome.events({
  "click .list-group": function(e, t){
    var messageId = e.currentTarget.getAttribute('data-id');
    Meteor.call('updateUserMessageStatus', messageId, function (error, result) {});
  }
});
