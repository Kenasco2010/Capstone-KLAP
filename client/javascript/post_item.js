Template.postItem.events({
    "change .file_bag": function(event, template){
        sAlert.info('Please wait! photo upload is in progress', {effect: 'bouncyflip', timeout: 10000});
        var files = $("input.file_bag")[0].files
                S3.upload({
                        files:files,
                        path:"images",
                        unique_name: false,
                         acl: "public-read"
                    },function(error, success){
                        if (error) {
                            swal('we are sorry, something went wrong');
                        }
                        else {
                            Session.set('fileExists', true);
                            Session.set('absoluteImageUrl', success.url);
                            Session.set('relativeImageUrl', success.relative_url);
                            Session.set('percent_uploaded', success.percent_uploaded);
                        }
                });
    },
    "click [data-action='remove-image']": function(e, t) {
        var relative_url = this.relative_url;
        S3.delete(
            relative_url,
        function(error, success) {
            if (error) {
                console.log(error);
            }
            else {
                this.status = 'removed';
                reset_form_element( $('.file_bag') );
                $("#imageThumbnail").remove();
                   $('.img-thumb').remove();
                   $("[data-action='remove-image']").remove();
                   $(".progress").remove();
            }
        });
       
    }
})


Template.postItem.helpers({
    "files": function(){
        if (Session.get('fileExists')) {
          return S3.collection.find();
        };
    },
    'complete': function() {
        if (this.status == 'complete') {
            return true;
        };
    },
    'uploadNotStarted': function() {
        if (this.percent_uploaded == 'undefined' || null) {
            return true;
        };
    }
})

reset_form_element = function(e) {
    e.wrap('<form>').parent('form').trigger('reset');
    e.unwrap();
}

  