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