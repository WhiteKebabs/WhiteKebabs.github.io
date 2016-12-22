( function( $ ) {

	function removeNoJsClass() {
		$( 'html:first' ).removeClass( 'no-js' );
	}

	/* Superfish the menu drops ---------------------*/
	function superfishSetup() {
		$('.menu').superfish({
			delay: 200,
			animation: {opacity:'show', height:'show'},
			speed: 'fast',
			cssArrows: true,
			autoArrows:  true,
			dropShadows: false
		});
	}

	/* Disable Superfish on mobile ---------------------*/
	function superfishMobile() {
		var sf, body;
		var breakpoint = 767;
	    body = $('body');
	    sf = $('ul.menu');
	    if ( body.width() >= breakpoint ) {
	      // Enable superfish when the page first loads if we're on desktop
	      sf.superfish();
	    }
	    $(window).resize(function() {
	        if ( body.width() >= breakpoint && !sf.hasClass('sf-js-enabled') ) {
	            // You only want SuperFish to be re-enabled once (sf.hasClass)
	            sf.superfish('init');
	        } else if ( body.width() < breakpoint ) {
	            // Smaller screen, disable SuperFish
	            sf.superfish('destroy');
	        }
	    });
	}

	/* Flexslider ---------------------*/
	function flexSliderSetup() {
		if( ($).flexslider) {
			var slider = $('.flexslider');
			slider.fitVids().flexslider({
				slideshowSpeed		: slider.attr('data-speed'),
				animationDuration	: 600,
				animation			: slider.attr('data-transition'),
				video				: false,
				useCSS				: false,
				prevText			: '<i class="fa fa-angle-left"></i>',
				nextText			: '<i class="fa fa-angle-right"></i>',
				touch				: false,
				animationLoop		: true,
				smoothHeight		: true,
				pauseOnAction		: true,
				pauseOnHover		: false,

				start: function(slider) {
					slider.removeClass('loading');
					$( ".preloader" ).hide();
				}
			});
		}
	}

	/* Masonry ---------------------*/
	function masonrySetup() {
		var $third = $('.portfolio-third');
		var $half = $('.portfolio-half');
		$third.masonry({
			itemSelector : '.one-third',
			gutter       : '.gutter-sizer-third'
		});
		$half.masonry({
			itemSelector : '.one-half',
			gutter       : '.gutter-sizer-half'
		});
	}

	function modifyPosts() {

		/* Reveal Slidehow Nav On Hover ---------------------*/
		$('.slideshow').hover(
		    function() { $('.flex-direction-nav li a', this).stop().animate({ opacity: 1.0 }, 200); },
		    function() { $('.flex-direction-nav li a', this).stop().animate({ opacity: 0 }, 200); }
		);

		/* Insert Line Break Before More Links ---------------------*/
		$('<br />').insertBefore('.postarea .more-link');

		/* Hide Comments When No Comments Activated ---------------------*/
		$('.nocomments').parent().css('display', 'none');

		/* Animate Page Scroll ---------------------*/
		$(".scroll").click(function(event){
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
		});

		/* Fit Vids ---------------------*/
		$('.feature-vid, .postarea').fitVids();

	}

	/* If both fixed and main menus selected, hides the fixed menu on small screens ---------------------*/
	function oneMenuMobile() {
		console.log($('#navigation'));
		if ( $('#navigation').length && $('#nav-top').length ) {
			if ( $(window).width() < 768 ) {
				$('#nav-top').hide();
			} else {
				$('#nav-top').show();
			}

		}
	}

	$( document )
	.ready( removeNoJsClass )
	.ready( superfishSetup )
	.ready( superfishMobile )
	.ready( flexSliderSetup )
	.ready( modifyPosts )
	.on( 'post-load', modifyPosts );

	$( window )
	.load( masonrySetup )
	.load( oneMenuMobile )
	.resize( oneMenuMobile )
	.resize( masonrySetup );

})( jQuery );
