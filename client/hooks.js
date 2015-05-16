AutoForm.hooks({
	insertEmailForm: {
		onSuccess: function(formType, result) {
			console.log("successfuly done")
			// $('#Emailsuccess').modal('show');
			swal("Great!", "We will notify you as soon as we launch", "success")
		}
	}
});