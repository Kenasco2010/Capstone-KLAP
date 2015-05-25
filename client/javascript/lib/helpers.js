Template.registerHelper("fullUserName", function(user){
    var first_name = user.profile.first_name;
    var last_name = user.profile.last_name;
    var full_name = first_name + " " + last_name;
    return full_name;
})

Template.registerHelper("rating", function(user){
    var rating = user.profile.rating;
    return rating;
})