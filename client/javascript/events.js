Template.navigation.events({
    "click [data-action='sign-out']": function () {
        Meteor.logout(function() {
          Router.go('home');
    })
}
});

Template.createProfile.events({
    "submit form[name='createProfileForm']": function (e,t) {
        var first_name = $("input[name='firstname']").val();
        var last_name = $("input[name='lastname']").val();
        var country = $("#country").val();
        var city = $("#city").val();
        var month = $("#month").val();
        var day = $("#day").val();
        var year = $("#year").val();
        console.log(first_name);
        console.log(last_name);
        console.log(country);
        console.log(city);
        console.log(month);
        console.log(day);
        console.log(year);
        $("form[name='createProfileForm']").reset();
        return false;
        // e.preventDefault();
    }
});