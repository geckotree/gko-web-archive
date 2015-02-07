define( function( require ) {
	'use strict';

	if( 'querySelector' in document &&
		'localStorage' in window &&
		'addEventListener' in window ) {

		//var Header = require( 'components/header' );
		var Toggle = require( 'lib/toggle' );
		var Carousel = require( 'components/carousel' );
		var CaseStudy = require( 'components/case-study' );

		var $html = document.querySelector( 'html' );
		var $toggle = document.querySelectorAll( '[data-toggle]' );
		var $carousel = document.querySelectorAll( '.js-carousel' );
		var $caseStudy = document.querySelector( '.js-case-study' );

		$html.classList.remove( 'no-mustard' );
		$html.classList.add( 'mustard' );

		//new Header( '.js-page-header' );

		if( $toggle.length ) {
			for( var i in $toggle ) {
				if( $toggle[i].nodeType == 1 ) {
					new Toggle( $toggle[i] );
				}
			}
		}

		if( $carousel.length ) {
			for( var x in $carousel ) {
				if( $carousel[ x ].nodeType == 1 ) {
					new Carousel( $carousel[ x ] );
				}
			}
		}

		new CaseStudy( $caseStudy );

		(function() {

		    // Feature Test
		    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

		        // Function to animate the scroll
		        var smoothScroll = function (anchor, duration) {

		            // Calculate how far and how fast to scroll
		            var startLocation = window.pageYOffset;
		            var endLocation = anchor.offsetTop;
		            var distance = endLocation - startLocation;
		            var increments = distance/(duration/16);
		            var stopAnimation;

		            // Scroll the page by an increment, and check if it's time to stop
		            var animateScroll = function () {
		                window.scrollBy(0, increments);
		                stopAnimation();
		            };

		            // If scrolling down
		            if ( increments >= 0 ) {
		                // Stop animation when you reach the anchor OR the bottom of the page
		                stopAnimation = function () {
		                    var travelled = window.pageYOffset;
		                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
		                        clearInterval(runAnimation);
		                    }
		                };
		            }
		            // If scrolling up
		            else {
		                // Stop animation when you reach the anchor OR the top of the page
		                stopAnimation = function () {
		                    var travelled = window.pageYOffset;
		                    if ( travelled <= (endLocation || 0) ) {
		                        clearInterval(runAnimation);
		                    }
		                };
		            }

		            // Loop the animation function
		            var runAnimation = setInterval(animateScroll, 16);

		        };

		        // Define smooth scroll links
		        var scrollToggle = document.querySelectorAll('.scroll');

		        // For each smooth scroll link
		        [].forEach.call(scrollToggle, function (toggle) {

		            // When the smooth scroll link is clicked
		            toggle.addEventListener('click', function(e) {

		                // Prevent the default link behavior
		                e.preventDefault();

		                // Get anchor link and calculate distance from the top
		                var dataID = toggle.getAttribute('href');
		                var dataTarget = document.querySelector(dataID);
		                var dataSpeed = toggle.getAttribute('data-speed');

		                // If the anchor exists
		                if (dataTarget) {
		                    // Scroll to the anchor
		                    smoothScroll(dataTarget, dataSpeed || 500);
		                }

		            }, false);

		        });

		    }

		 })();



		// $('a[href^="#"]').on('click', function(event) {
		//    var target = $( $(this).attr('href') );
		//    if( target.length ) {
		//        event.preventDefault();
		//        $('html, body').animate({
		//            scrollTop: target.offset().top
		//        }, 800);
		//    }
		// });

	}
});
