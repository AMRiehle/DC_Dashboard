//'access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A'

$( document ).ready(function() {
    console.log( "ready!" );
});

// $("#sportsBtn").click(function () {
//     $('#parent').toggleClass("embed-responsive-1by1");
//     console.log('cllicked');
// })

// $(".test").click(function () {
//     $('#sportgraph',  window.parent.document).css({"height":"650px"});
//     console.log('cllicked');
// })

// var frlink = "{{ url_for('show_sports') }}"
// $('#openBtn').click(function(){
//     $('#myModal').on('show', function () {
      
// 	});
//     $('#myModal').modal({show:true})
// });

$('#sportsBtn').click(function(){
	$('#sports-modal').modal({show:true})
});

$('#mapsBtn').click(function(){
	$('#maps-modal').modal({show:true})
});

$("#submitForm").on('click', function() {
	$("#contact_form").submit();
});

// $(document).ready(function () {
//     $("#contact_form").on("submit", function(e) {
// 		var postData = $(this).serializeArray();
// 		console.log(postData)
//         var formURL = $(this).attr("action");
//         $.ajax({
//             url: formURL,
//             type: "POST",
//             data: postData,
//             success: function(data, textStatus, jqXHR) {
//                 $('#contact_dialog .modal-header .modal-title').html("Result");
//                 $('#contact_dialog .modal-body').html(data);
//                 $("#submitForm").remove();
//             },
//             error: function(jqXHR, status, error) {
//                 console.log(status + ": " + error);
//             }
//         });
//         e.preventDefault();
// 	});
// 	$("#submitForm").on('click', function() {
//         $("#contact_form").submit();
//     });
// });