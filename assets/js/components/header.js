define( function() {
	'use strict';

	function Header( el ) {
		this._$header = document.querySelector( el );
		this._$html = document.querySelector( 'html' );
		this._$body = document.querySelector( 'body' );
		this._$nav = document.querySelector( '.nav' );
		this._$navToggle = document.querySelector( '.js-nav-toggle' );
		this._$searchToggle = document.querySelector( '.js-nav-search-toggle' );
		this._$searchInput = document.querySelector( '.js-nav-search-input' );
		this._navHeight = document.querySelector( el ).offsetHeight;
		this._lastScroll = 0;

		this._defaults = {
			detached: 'nav-detached',
			hidden: 'nav-hidden',
			active: 'is-active',
			inactive: 'is-inactive'
		};

		this._stickyHeader();
		this._attachEventHandlers();
	}

	Header.prototype = {
		_stickyHeader: function() {
			var _this = this;

			window.onscroll = function( e ) {
				// Sets current scroll top position
				var _scrollTop = document.body.scrollTop;

				// Detach nav
				if( _scrollTop > 400 ) {
					_this._$html.classList.add( _this._defaults.detached );
					_this._$body.style.paddingTop = _this._navHeight + 'px';
				}

				// Attach nav
				if( _scrollTop < 1 ) {
					_this._$html.classList.remove( _this._defaults.detached );
					_this._$body.style.paddingTop = '0px';
				}

				// Hide/show nav
				if( _scrollTop > _this._lastScroll && _this._lastScroll > _this._navHeight ) {
					_this._$html.classList.add( _this._defaults.hidden );

					if( _this._$html.classList.contains( 'nav__mobile--open' ) ) {
						_this._$html.classList.add( 'nav__mobile--closed' );
						_this._$html.classList.remove( 'nav__mobile--open' );
					}

					if( _this._$html.classList.contains( 'nav__search--open' ) ) {
						_this._$html.classList.add( 'nav__search--closed' );
						_this._$html.classList.remove( 'nav__search--open' );
					}
				} else {
					_this._$html.classList.remove( _this._defaults.hidden );
				}

				// Update scroll position
				_this._lastScroll = _scrollTop;
			};
		},

		_attachEventHandlers: function() {
			var _this = this;

			this._$navToggle.addEventListener( 'click', function() {
				if( !this.classList.contains( _this._defaults.active ) ) {
					this.classList.remove( _this._defaults.inactive );
					this.classList.add( _this._defaults.active );
				} else {
					this.classList.remove( _this._defaults.active );
					this.classList.add( _this._defaults.inactive );
				}
			});

			this._$searchToggle.addEventListener( 'click', function() {
				if( !this.classList.contains( _this._defaults.active ) ) {
					this.classList.remove( _this._defaults.inactive );
					this.classList.add( _this._defaults.active );
					_this._$searchInput.focus();
				} else {
					this.classList.remove( _this._defaults.active );
					this.classList.add( _this._defaults.inactive );
				}

				if( _this._$html.classList.contains( 'nav__mobile--open' ) ) {
					_this._$html.classList.remove( 'nav__mobile--open' );
					_this._$html.classList.add( 'nav__mobile--closed' );
					_this._$navToggle.classList.remove( _this._defaults.active );
					_this._$navToggle.classList.add( _this._defaults.inactive );
				}

				_this._$nav.style.overflow = 'hidden';

				if( _this._$html.classList.contains( 'nav__search--open' ) ) {
					setTimeout( function() {
						_this._$nav.style.overflow = 'visible';
					}, 300);
				} else {
					_this._$nav.style.overflow = 'hidden';
				}
			});
		}
	};

	return Header;
});
