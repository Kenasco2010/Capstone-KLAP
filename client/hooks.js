/*Router.onBeforeAction(function(pause) {
  if (!Meteor.userId()) {*/
    // pause();
    // alert(
    //   "you need to be logged-in to view this page. Thank You"
    //   )
/*Router.go('notSignIn');
} else {
  this.next();
}
}, {
  except: ['home', 'signin', 'signup', 'signout','notSignIn']
});*/

Router.onBeforeAction('authenticate', {
  authenticate: {
    template: 'notSignIn'
  },
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
          doc.acceptance_status = "not-accepted",
          doc.delivery_status = "not-delivered"
          return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('postItem', insertDoc, function (error, result) {
          if (error) {
            this.done(new Error(error));
          }
          else {
              sweetAlert({
              title: "Thanks!",
               text: "Your post has successfuly been sent to members who match the route you specified. You will receive a notification if any member accepts to carry your item."
            }, function(){ Router.go("my-profile")}
            );
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
  sendMessageForm: {
       formToDoc: function(doc, ss, formId) {
        var sent_to = $("p.getter").attr("data-user-id");
        var sentToArray = [];
        sentToArray.push(sent_to);
        doc.sent_to = sentToArray;
        doc.status = "unread";
        return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('sendMessage', insertDoc, function (error, result) {
          if (error) {
            this.done(new Error(error));
          }
          else {
            $('.ui.send-message.modal').modal('hide');
            swal("Thanks! your message has been sent");
          }
        });
         this.done();
         return false;  
    }
}
})

AutoForm.hooks({
  sendReplyForm: {
       formToDoc: function(doc, ss, formId) {
        var messageId = $("p.getter").attr("data-id");
        var sent_to = $("p.getter").attr("data-owner");
        doc.messageId = messageId;
        doc.sent_to = sent_to;
        doc.status = "unread";
        return doc;
      },
      onSubmit: function (insertDoc, updateDoc, currentDoc) {
        Meteor.call('sendReply', insertDoc, function (error, result) {
          if (error) {
            this.done(new Error(error));
          }
          else {
            // swal("Thanks! your message has been sent");
          }
        });
         this.done();
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
              Router.go('filteredItems', {_id: result})
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
