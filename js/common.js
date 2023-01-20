$(document).ready(function () {

	$("#sandwich").on("click", function(){
	$(this).toggleClass("active");
	$("body").toggleClass("menubar-dashboard");
	$("html").toggleClass("o-hidden");
	$(".form-search").toggleClass("form-transform");
	window.dispatchEvent(new Event('resize'));
	});

  Waves.attach('.new-lead');
  Waves.attach('.btn',  ['waves-light']);
  Waves.init();

});