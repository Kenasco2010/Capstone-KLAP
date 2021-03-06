Template.editItemForm.events({
    "change .file_bag": function(event, template){
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
    "click [data-action='remove-image']": function() {
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
                $("#imageThumbnail img").attr("src", "");
                   $('.img-thumbnail').hide();
                   $("[data-action='remove-image']").hide();
                 // $( "#progressbar" ).progressbar( "destroy" );
                   $(".progress").remove();
            }
        });
       
    }
})


Template.editItemForm.helpers({
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