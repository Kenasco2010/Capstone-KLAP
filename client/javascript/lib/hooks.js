AutoForm.hooks({
	insertEmailForm: {
		onSuccess: function(formType, result) {
			console.log("successfuly done")
			// $('#Emailsuccess').modal('show');
			swal("Great!", "We will notify you as soon as we launch", "success")
		}
	}
});

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