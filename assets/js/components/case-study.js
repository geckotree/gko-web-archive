define( function() {
	'use strict';

	function CaseStudy( el ) {
		this._defaults = {
			activeIdx: 0,
			active: 'is-active',
			activeColour: 'ter'
		};

		this._$el = el;
		this._$logoButton = el.querySelectorAll( '.js-logo-button' );
		this._$logoMark = el.querySelector( '.js-logo-mark' );
		this._$activeButton = el.querySelector( '.js-logo-button' + '.' + this._defaults.active );
		this._$clickedButton = null;

		this._logoColourSwitcher();
	}

	CaseStudy.prototype = {
		_logoColourSwitcher: function() {
			var _this = this;

			for( var i = 0; i < this._$logoButton.length; i++ ) {
				this._$logoButton[ i ].addEventListener( 'click', _this._update( i ) );
			}
		},

		_update: function( i ) {
			var _this = this;

			return function() {
				_this._defaults.activeIdx = i;
				_this._$clickedButton = this;
				_this._updateNav();
				_this._updateColour();
			};
		},

		_updateNav: function() {
			this._$activeButton.classList.remove( this._defaults.active );
			this._$clickedButton.classList.add( this._defaults.active );
			this._$activeButton = this._$el.querySelector( '.js-logo-button' + '.' + this._defaults.active );
		},

		_updateColour: function() {
			this._$logoMark.classList.remove( 'is-active-colour-' + this._defaults.activeColour );
			this._defaults.activeColour = this._$activeButton.getAttribute( 'data-colour' );
			this._$logoMark.classList.add( 'is-active-colour-' + this._defaults.activeColour );
		}
	};

	return CaseStudy;
});
