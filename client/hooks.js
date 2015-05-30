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

    var send_date = $("input[name='send_date']").val()
    send_date = new Date(send_date);
    doc.send_date = send_date;
    var delivery_date = $("input[name='delivery_date']").val()
    delivery_date = new Date(delivery_date);
    doc.delivery_date = delivery_date;
    return doc;
  },
  onSubmit: function (insertDoc, updateDoc, currentDoc) {
    Meteor.call('postItem', insertDoc, function (error, result) {
      if (error) {
        this.done();
      }
      else {
        swal("Thanks! your item has been successfuly posted");
      }
    });
    return false;  
  }
}
})

AutoForm.hooks({
  postTravelForm: {
    formToDoc: function(doc, ss, formId)  {
      var travel_date = $("input[name='travel_date']").val();
      travel_date = new Date(travel_date);
      doc.travel_date = travel_date;
      var arrival_date = $("input[name='arrival_date']").val();
      arrival_date = new Date(arrival_date);
      doc.arrival_date = arrival_date;
      console.log(doc);
      return doc;
    },
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      Meteor.call('postTrip', insertDoc, function (error, result) {
        if (error) {
              // this.done();
              console.log(error);
            }
            else {
              swal("Thanks! your trip has been successfuly posted");
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