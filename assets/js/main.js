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
