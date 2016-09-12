/**
 * JavaScript for Accessibility Menu
 */
( function ( mw, $ ) {
    
    function loadAccessibility() {
		var menu = mw.template.get( "ext.MaterialFAB", "menu.mustache" );
		
		var accessibilityMenuData = {
			"menu-id" : "md-accessibility",
			"menu-location" : "tr", // top-right
			"menu-toggle-event" : "hover",
			"main-button" : [{
				"href" : "#",
				"bg-color": "#274690",
				"label" : mw.msg('accessibility-reset-toggle-popup'),
				"resting-id" : "main_toggle",				
				//"resting-label" : mw.msg('accessibility-menu-popup'),
				"resting-class-icon" : "material-icons",
				"resting-icon" : "accessibility",
				"active-id" : "reset_toggle",				
				"active-class-icon" : "material-icons",
				"active-icon" : "replay"
			}],			
			"menu-items": [
			{
				"id" : "grayscale_toggle",
				"href" : "#",
				"label" : mw.msg('accessibility-contrast-toggle-popup'),
				"bg-color" : "#8c8989",
				"class-icon" : "material-icons",
				"icon" : "brightness_6"			
			},
			{
				"id" : "invert_toggle",
				"href" : "#",
				"label" : mw.msg('accessibility-contrast-rgb-toggle-popup'),
				"bg-color" : "#8c8989",
				"class-icon" : "material-icons",
				"icon" : "invert_colors"			
			},
			{
				"id" : "smaller_toggle",
				"href" : "#",
				"label" : mw.msg('accessibility-smaller-text-toggle-popup'),
				"bg-color" : "#8c8989",
				"class-icon" : "material-icons",
				"icon" : "zoom_out"			
			},
			{
				"id" : "larger_toggle",
				"href" : "#",
				"label" : mw.msg('accessibility-smaller-text-toggle-popup'),
				"bg-color" : "#8c8989",
				"class-icon" : "material-icons",
				"icon" : "zoom_in"			
			}]
		};
		
		var randeredMenu = menu.render(accessibilityMenuData);
		
		var $affectedResizeElements = $("*").not(".access-no-resize");
		var $affectedContrastElements = $("*").not(".access-no-contrast");			
		var $affectedImagesElements = $("img");

		var maxFontSize = 32;
		var minFontSize = 10;
		
		// Storing the original size in a data attribute so size can be reset
		$affectedResizeElements.each( function(){
			var $this = $(this);
			var currentSize = $this.css("font-size");
			
			if (currentSize) {					
				$this.data("orig-size", currentSize);					
				var checkSize = parseInt(currentSize);				
				
				if (checkSize > maxFontSize) {
					maxFontSize = checkSize;
				}
				if (checkSize < minFontSize) {
					minFontSize = checkSize;
				}
			}				
		});

		function changeFontSize(intSize){
			$affectedResizeElements.each( function(){
				var $this = $(this);					
				var currentSize =  parseInt($this.css("font-size")); 
				if (currentSize <= maxFontSize && currentSize >= minFontSize) {
					var newSize = currentSize + intSize;
					$this.css("font-size", newSize);
				}					
			});
		}
		
		function resetFontSize(){
			$affectedResizeElements.each( function(){
				var $this = $(this);					
				$this.css("font-size", $this.data("orig-size"));
			});
		}
		
		function resetContrastElements(){
			
			//iterate through every element
			$affectedImagesElements.each(function() {
				var $this = $(this);					
				$this.removeClass('contrast-grayscale');
				$this.removeClass('contrast-invert');
			});
			
			$affectedContrastElements.each( function() {
				var $this = $(this);
				
				if($this.css('background-image'))
				{						
					$this.removeClass('contrast-grayscale');
					$this.removeClass('contrast-invert');
				}					
			});
		}

		function changeContrastRGBElements() {

			//iterate through every element in reverse order...
			$affectedContrastElements.each(function() {
				var $this = $(this);
				$this.addClass("contrast-invert");
			});
			
			//iterate through every element
			$affectedImagesElements.each(function() {
				var $this = $(this);
				$this.addClass("contrast-invert");
			});
		}	
		
		function changeColorBlackAndWhite() {

			//iterate through every element in order...
			$affectedContrastElements.each(function() {
				var $this = $(this);
				$this.addClass("contrast-grayscale");									
			});
							
			//iterate through every element
			$affectedImagesElements.each(function() {
				var $this = $(this);
				$this.addClass("contrast-grayscale");
			});
		}
		
		//////////////////////////////////////////////////////////////////////////////////////////////	
		$( document ).on( "click", "#grayscale_toggle", function() {
			resetContrastElements();
			changeColorBlackAndWhite();
		});

		$( document ).on( "click", "#invert_toggle", function () {
			resetContrastElements();
			changeContrastRGBElements();
		});
		
		$( document ).on( "click", "#larger_toggle", function () {
			changeFontSize(2);
		});
		
		$( document ).on( "click", "#smaller_toggle", function () {
			changeFontSize(-2);
		});
		
		$( document ).on( "click", "#reset_toggle", function () {
			resetContrastElements();
			resetFontSize();								
		});

		$("body").append(randeredMenu);		
    }
    
    $( function () {
        loadAccessibility();
    });

}( mediaWiki, jQuery ) );
