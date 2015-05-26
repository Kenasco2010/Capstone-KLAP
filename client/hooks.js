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

AutoForm.hooks({
  postItemForm: {
       formToDoc: function(doc, ss, formId) {
        console.log(doc);
          doc.relativeImageUrl = Session.get('relativeImageUrl');
          doc.absoluteImageUrl = Session.get('absoluteImageUrl');
          /*doc.delivery_date = Session.get("delivery_date");
          doc.send_date = Session.get("send_date");*/
          return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('postItem', insertDoc, function (error, result) {
          if (error) {
            console.log(error);
            // this.done();
          }
          else {
            $("#buzzModal").modal("hide");
            swal("Thanks! your item has been posted successfuly");
          }
        });
         return false;  
    }
  }
})

AutoForm.addHooks(null, {
  onError: function (operation, error, template) {
    console.log('Error: ' + error);
  }
});