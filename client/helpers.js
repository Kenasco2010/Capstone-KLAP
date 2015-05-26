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

Template.createProfile.helpers({
    profileFormSchema: function () {
        return Schema.updateProfile;
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