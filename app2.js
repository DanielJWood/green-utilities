
(function ($) {

	$(document).ready(function() { 

$('a.pull-tab').click(function (e) {
       e.preventDefault();
       $('a.pull-tab').removeClass('active');
       $('.about-data').addClass('active');
       $('a.closed').addClass('active');
   });

$('a.closed').click(function (e) {
       e.preventDefault();
       $('.about-data').removeClass('active');
       $('a.closed').removeClass('active');
       $('a.pull-tab').addClass('active');
   });       
}(jQuery));