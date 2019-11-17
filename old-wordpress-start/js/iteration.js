/*

*/
var cur_top;

// Add Bootstrap to WP  < from in WP?
$('#menu-footer-menu').addClass('row');
$('#menu-footer-menu .menu-item').addClass('col-4');

//Hidden Elements
$('#close').hide();
$('#submit').hide();
$('.iteration-load-more').hide();
$('.ad-content').hide();
$('.image-controls').hide();


var imageThumbs = $('.img-wrap');
console.log(imageThumbs);


$('.multi-collapse').each(function( index ) {
	index += 1;
	$(this).attr("id", "filter" + index );
});

$(function(){
    var _top = $(window).scrollTop();
    var direction;
	var headerCheck = true;
    $(window).scroll(function(){
        cur_top = $(window).scrollTop();
		//console.log(cur_top);
		
		// SCROLL DOWN
        if(_top < cur_top){
			
            direction = 'down';
			
			$('header').hide();
			$('filter-panel').hide();
			$('#refresh').hide();
			$('.iteration-load-more').show();
			
			$('.intro-content').addClass('sticky-content');
			$('.intro-content').css("padding-top", 0);
						
			$('footer').addClass('footer');
			
			$('.img-container').removeClass('col-3').addClass('col-12');
			$('.img-container').css('margin-bottom', '10px');
			$('.image-controls').show();


			for(var i = 0;i < imageThumbs.length;i++){
				var rect = imageThumbs[i].getBoundingClientRect();
				var controls = imageThumbs[i].nextElementSibling;
				console.log(controls);
				console.log(rect.top);
				if(rect.top < 245 && rect.top > 0){
					controls.setAttribute("style","display: flex;");
				}
				else{
					controls.setAttribute("style","display: none;");
				}
			}
			
			// Switch to Ad
			if (cur_top > 250){
				$('.license-content').hide();
				$('.ad-content').show();
			}				
			headerCheck = false;

		// SCROLL UP
        } else {
            direction = 'up';
			
			if(headerCheck == false){
				headerCheck = true;
				$('header').css("top", 0);
				$('header').show();				
				
				$('filter-panel').show();
											
				$('.intro-content').css("padding-top", '140px');
				$('.intro-content').removeClass('sticky-content');
			
				cur_top += 116;
			}
			
			// Switch to Small Grid
			if (cur_top < 40){
				$('.image-controls').hide();
				$('.img-container').removeClass('col-12').addClass('col-3');
				$('footer').removeClass('footer');
				$('.iteration-load-more').hide();
				$('#refresh').show();
				$('.img-container').css('margin-bottom', 0);
				$('.license-content').show();				
				$('.ad-content').hide();
				// works but throws error
				controls.setAttribute("style","display: none;");
			}	


			for(var i = 0;i < imageThumbs.length;i++){
				var rect = imageThumbs[i].getBoundingClientRect();
				var controls = imageThumbs[i].nextElementSibling;
				console.log(controls);
				console.log(rect.top);
				if(rect.top < 245 && rect.top > 0){
					controls.setAttribute("style","display: flex;");
				}
				else{
					controls.setAttribute("style","display: none;");
				}
			}


			
        }
        _top = cur_top;
    });
})

$('.filters-select a').click(function() {
	$('#close').show();
	$('#submit').show();
});

$('#close').click(function() {
	$('.filters .collapse').collapse('hide');
	$(this).hide();
	$('#submit').hide();
});

jQuery(document).ready( function($){

	$(document).on('click','.iteration-load-more', function(){
			
		
		var that = $(this);
		var page = $(this).data('page');
		var newPage = page+1;
		var ajaxurl = $(this).data('url');
		
		$.ajax({
			
			url : ajaxurl,
			type : 'post',
			data : {
				
				page : page,
				action : 'iteration_load_more'
			},
			error : function( response ){
				console.log(response);
				console.log('sup?');
			},
			success : function( response ) {
				
				that.data('page', newPage);
				$('.iteration-posts-container').append( response );
			}
		});
	});
});




