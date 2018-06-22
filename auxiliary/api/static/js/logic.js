$( document ).ready(function() {
    console.log( "ready!" );
});

$(".test").click(function () {
    $('#parent').toggleClass("embed-responsive-1by1");
    console.log('cllicked');
})

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

$('#openBtn').click(function(){
	$('#myModal').modal({show:true})
});