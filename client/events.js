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
  // $('#my-datepicker').datepicker();
  // var picker = new Pikaday({ field: $('#my-datepicker')[0] });
  // var picker = new Pikaday({ field: document.getElementById('my-datepicker') });
  $(".date-picker").pickadate();

};

/*Template.postItem.events({
  'submit #postItemForm': function () {
    var send_date = $("input[name='send_date']").val();
    var delivery_date = $("input[name='delivery_date']").val();
    Session.set("send_date", send_date);
    Session.set("delivery_date", delivery_date);
  }
});*/

