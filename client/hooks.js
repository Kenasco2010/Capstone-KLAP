Router.onBeforeAction(function(pause) {
  if (!Meteor.userId()) {
    // pause();
    // alert(
    //   "you need to be logged-in to view this page. Thank You"
    //   )
Router.go('notSignIn');
} else {
  this.next();
}
}, {
  except: ['home', 'signin', 'signup', 'signout','notSignIn']
});



AutoForm.hooks({
	insertEmailForm: {
		onSuccess: function(formType, result) {
			console.log("successfuly done")
			swal("Great!", "We will notify you as soon as we launch", "success")
		}
	}
});

AutoForm.hooks({
  addReviewForm: {
    formToDoc: function(doc, ss, formId) {

      var reviewee = $("p.getter").attr("data-user-id");
      var reviewer = Meteor.userId();
      doc.reviewee = reviewee;
      doc.reviewer = reviewer;
      return doc;
    },
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
     Meteor.call('insertReview', insertDoc, function (error, result) {
      if (error) {
        this.done();
      };
    });
     return false; 
   },
   onSuccess: function(formType, result) {
     $('.ui.send-message.modal').modal('hide');
     swal("Thanks! review successfuly posted");
   }
 }
})

AutoForm.hooks({
  sendMessageForm: {
    formToDoc: function(doc, ss, formId) {

      var  sent_to= $("p.getter").attr("data-user-id");
      var sent_from = Meteor.userId();
      doc.sent_to = sent_to;
      doc.sent_from = sent_from;
      return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      Meteor.call('sendMessage', insertDoc, function (error, result) {
        if (error) {
          this.done();
        };
      });
      return false;  
    },
    onSuccess: function(formType, result) {
     $('.ui.send-message.modal').modal('hide');
     swal("Thanks! your message has been sent");
   }
 }
})

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
          doc.relativeImageUrl = Session.get('relativeImageUrl');
          doc.absoluteImageUrl = Session.get('absoluteImageUrl');
          return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('postItem', insertDoc, function (error, result) {
          if (error) {
            this.done(new Error(error));
          }
          else {
            swal("Thanks! your item has been successfuly posted");
          }
        });
         this.done();
         this.resetForm();
         $("#imageThumbnail img").attr("src", "");
         $('.img-thumbnail').hide();
         $("[data-action='remove-image']").hide();
         $(".progress").remove();
         return false;  
    }
}
})

AutoForm.hooks({
  editItemForm: {
       formToDoc: function(doc, ss, formId) {
          doc.relativeImageUrl = Session.get('relativeImageUrl');
          doc.absoluteImageUrl = Session.get('absoluteImageUrl');
          return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('editItem', currentDoc._id, updateDoc, function (error, result) {
          if (error) {
            this.done(new Error(error));
          };
        });
         this.done();
         return false;  
    },
    onSuccess: function(formType, result) {
         swal("Thanks! your item has been successfuly updated");
         $( "button.confirm" ).click(function() {
           Router.go("my-profile");
         });
    }
  }
})


AutoForm.hooks({
  postTravelForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
          Meteor.call('postTrip', insertDoc, function (error, result) {
            if (error) {
              this.done(new Error(error));
            }
            else {
              swal("Thanks! your trip has been successfuly posted");
            }

        });
           this.done();
           this.resetForm();
           return false;  
  }
}
})

AutoForm.hooks({
  editTravelForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
          Meteor.call('editTrip', currentDoc._id, updateDoc, function (error, result) {
            if (error) {
              this.done(new Error(error));
            }
            else {
              swal("Thanks! your trip has been successfuly updated");
              $( "button.confirm" ).click(function() {
                Router.go("my-profile");
              });
            }
          });
           return false;  
      },
    }
})
AutoForm.addHooks(null, {
  onError: function (operation, error, template) {
    console.log('Error: ' + error);
  }
});

reset_form_element = function(e) {
    e.wrap('<form>').parent('form').trigger('reset');
    e.unwrap();
}
