Template.registerHelper("fullUserName", function(user){
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})

Template.registerHelper("rating", function(user){
    console.log(user.profile.rating);
    var rating = user.profile.rating;
    return rating;
})

Template.registerHelper("hasPicture", function(id){
    var user = Meteor.users.findOne(id);
    var pictureUrl = user.profile.picture;
    if (typeof(pictureUrl) != "undefined") {
        return true;
    };
})

Template.searchForm.helpers({
    searchFormSchema: function () {
        return Schema.search;
    }
});

Template.registerHelper("s2OptsOCountry", function(){
    return  {placeholder: "Select Country"};
})

Template.registerHelper("s2OptsOCity", function(){
    return {placeholder: "Select City"};
})
Template.registerHelper("s2OptsDCountry", function(){
    return {placeholder: "Select Country"};
})
Template.registerHelper("s2OptsDCity", function(){
    return {placeholder: "Select City"};
})

Template.registerHelper("item_owner", function(itemId){
            var item = Items.findOne(itemId);
            var ownerId = item.owner;
            var owner = Meteor.users.findOne(ownerId);
            if (typeof(owner) == "undefined") {
                return "user"
            }
            else if (Meteor.userId() == ownerId) {
                return "You"
            }
            
            else {
                var first_name = owner.profile.first_name;
                var last_name = owner.profile.last_name;
                var full_name = first_name + " " + last_name;
                return full_name;
            }
})

Template.registerHelper("itemOwnerId", function(){
    var item = Items.findOne(this._id);
    var ownerId = item.owner;
    return ownerId;
})

Template.registerHelper("tripOwnerId", function(){
    var trip = Travels.findOne(this._id);
    var ownerId = trip.owner;
    return ownerId;
})


Template.registerHelper("trip_owner", function(tripId){
        var trip = Travels.findOne(tripId);
        var ownerId = trip.owner;
        if (Meteor.userId() == ownerId) {
            return "You"
        }
        else {
            var owner = Meteor.users.findOne(ownerId);
            var first_name = owner.profile.first_name;
            var last_name = owner.profile.last_name;
            var full_name = first_name + " " + last_name;
            return full_name;
        }
})

Template.registerHelper("noReviews", function(count){
    if (count == 0) {
        return true;
    }
    else {
        return false;
    }
})

Template.registerHelper('userPic', function(){
    var user = Meteor.user();
    var picture = user.profile.picture;
    return picture;
})

Template.registerHelper('imgWidth', function() {
    var user = Meteor.user();
    var picture = user.profile.picture;
    if (typeof(picture) == "undefined") {
      return 0;
    }
    else {
      return 40;
    }
})

Template.registerHelper("ownerPicture", function(tripId){
    var trip = Travels.findOne(tripId);
    var ownerId = trip.owner;
    var owner = Meteor.users.findOne(ownerId);
    var pictureUrl = owner.profile.picture;
    return pictureUrl;
})

Template.registerHelper("date_ft", function(date){
    var m = moment(date);
    return m.format("dddd, MMMM Do YYYY");
})

Template.createProfile.helpers({
    profileFormSchema: function () {
        return Schemas.updateProfile;
    },
    s2OptsDay: function() {
        return {placeholder: "Select Day"};
    },
     s2OptsMonth: function() {
        return {placeholder: "Select Month"};
    },
      s2OptsYear: function() {
        return {placeholder: "Select Year"};
    }
});

Template.registerHelper("profileFormSchema", function(){
    return Schemas.updateProfile
})

Template.registerHelper("reviewerPicture", function(id){
    var user = Meteor.users.findOne(id);
    var pictureUrl = user.profile.picture;
    return pictureUrl;
})

Template.registerHelper("reviewCountString", function(count){
    if (count == 1) {
        return "Review";
    }
    else {
        return "Reviews";
    }
})

Template.registerHelper("checkAbout", function(id){
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var about = user.profile.about;
    if (typeof(about) == "undefined") {
        return "(" + first_name + " has not written any bio yet)";
    }
    else
    {
        return about;
    }
})

Template.registerHelper("hasError", function(){
    return Session.get("has-error");;
})

Template.registerHelper("helpMessage", function(){
    return "Picture is required"
})

Template.registerHelper("sentFrom", function(id) {
    var user = Meteor.users.findOne(id);
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})