$('document').ready( function () {
    $('uploadImage').click(function () {
        if ($('myFile').val() == null) {
            alert("Please upload Image first");
        }
        else
        {
            alert("successful");
        }
    });
});
