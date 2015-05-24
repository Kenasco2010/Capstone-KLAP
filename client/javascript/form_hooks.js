  AutoForm.hooks({
  profileForm: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
            Meteor.call('updateUserProfile', insertDoc, function (error, result) {
              if (error) {
                this.done();
              }
              else {
                Router.go("welcome-page");
              }
            });
       return false;  
  }
}
});