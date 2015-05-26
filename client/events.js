Template.navigation.events({
    "click [data-action='sign-out']": function () {
        Meteor.logout(function() {
          Router.go('home');
    })
}
});


Template.rating.rendered = function () {
    $this = this;
    ratings = $this.ratings.get();
    userId = $this.userId.get();
    $('.ui.rating').rating('setting', 'onRate', function(value) {
          Session.set("review-value", value);
          $this.ratings.set(value);
          $this.userId.set(this.id);
      });
};

Template.userPublicProfile.events({
    'click .rating': function () {
        console.log(this);
       console.log(Session.get("review-value"));
    }
});


Template.rating.created = function () {
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



