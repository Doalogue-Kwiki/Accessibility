/**
 * JavaScript for Accessibility Menu
 */
( function ( mw, $ ) {
    
    function loadAccessibility() {
        
		mw.loader.using(['oojs-ui']).then(function () {
		
			var $affectedResizeElements = $('*').not('.access-no-resize');
			var $affectedContrastElements = $('*').not('input');			
			// Can be extended, ex. $("div, p, span.someClass")

			// Storing the original background color in a data attribute so size can be reset
			$affectedResizeElements.each( function(){
				var $this = $(this);
				$this.data("orig-back-color", $this.css("background-color"));
			});
			
			// Storing the original color in a data attribute so size can be reset
			$affectedResizeElements.each( function(){
				var $this = $(this);
				$this.data("orig-color", $this.css("color"));
			});
			
			
			// Storing the original size in a data attribute so size can be reset
			$affectedResizeElements.each( function(){
				var $this = $(this);
				$this.data("orig-size", $this.css("font-size"));
			});

			function changeFontSize(percent){
				$affectedResizeElements.each( function(){
					var $this = $(this);				
					var currentSize =  parseInt($this.css('font-size')); 
					var newSize = currentSize * percent;
					$this.css("font-size" , newSize);				
				});
			}
			
			function resetFontSize(){
				$affectedResizeElements.each( function(){
					var $this = $(this);				
					$this.css("font-size", $this.data("orig-size"));
				});
			}
			
			function resetContrastElements(){
				$affectedResizeElements.each( function() {
					var $this = $(this);				
					$this.css("background-color", $this.data("orig-back-color"));
					$this.css("color", $this.data("orig-color"));
				});
			}
		
			function changeContrastElements() {
				
				//set up color properties to iterate through
				var colorProperties = ['color', 'background-color'];

				//iterate through every element
				$affectedContrastElements.each(function() {
					var color = null;

					for (var prop in colorProperties) {
						prop = colorProperties[prop];

						//if we can't find this property or it's null, continue
						if (!$(this).css(prop)) continue; 

						//create RGBColor object
						color = new RGBColor($(this).css(prop));

						if (color.ok) { 
							$(this).css(prop, 'rgb(' + (255 - color.r) + ', ' 
													 + (255 - color.g) + ', ' 
													 + (255 - color.b) + ')');
						}
						
						color = null; //some cleanup
					}
				});
			}	
			
			/*function changeColorBlackAndWhite(newColor, newBackgroundColor) {
				
				//iterate through every element
				$affectedContrastElements.each(function() {
					var $this = $(this);
					
					//if we can't find this color property or it's null, continue
					if ($this.css('color')) {
						$this.css('color', newColor);
					}
					
					//if we can't find this background color property or it's null, continue
					if ($this.css('background-color')) {
						$this.css('background-color', newBackgroundColor);
					}
				});
			}*/
			
			//////////////////////////////////////////////////////////////////////////////////////////////
			
			var contrast_RGB_toggle = new OO.ui.ToggleButtonWidget( {				
				label: " 👁 ",
				//icon: 'halfBright',
				//title: mw.msg( 'contrast-toggle-popup-text' )
				id: "contrast-rgb-toggle",               
				classes: ['ui-accessibility-button', 'access-no-resize', 'access-no-contrast'],  
				value: false                
			});
			
			/*var contrast_toggle = new OO.ui.ToggleButtonWidget( {
				label: " ◑ ",				
				//icon: 'halfBright',
				//title: mw.msg( 'contrast-toggle-popup-text' )
				id: "contrast-toggle",               
				classes: ['ui-accessibility-button', 'access-no-resize', 'access-no-contrast'],  
				value: false                
			});*/
			
			contrast_RGB_toggle.on('click', function () {
				if(contrast_RGB_toggle.getValue()) {
					changeContrastElements();
				}
				else {
					resetContrastElements();					
				}				
			});

			/*contrast_toggle.on('click', function () {				
				if(contrast_toggle.getValue()) {
					changeColorBlackAndWhite("#fff","#000");
				}
				else {
					changeColorBlackAndWhite("","");					
				}			
			});*/
			
			var larger_font_size_toggle = new OO.ui.ButtonWidget( {
				label: "A+",
				//icon: 'bigger',
				//title: mw.msg( 'larger-text-toggle-popup-text' ),
				id: "larger-font-toggle",
				classes: ['ui-accessibility-button', 'access-no-resize', 'access-no-contrast']
			});

			larger_font_size_toggle.on( 'click', function () {
				changeFontSize(1.1);
			});
			
			var original_font_size_toggle = new OO.ui.ButtonWidget( {
				label: "A",
				//icon: 'bigger',
				//title: mw.msg( 'larger-text-toggle-popup-text' ),
				id: "original-font-toggle",
				classes: ['ui-accessibility-button', 'access-no-resize', 'access-no-contrast']
			});

			original_font_size_toggle.on( 'click', function () {
				resetFontSize();
			});

			var smaller_font_size_toggle = new OO.ui.ButtonWidget( {
				label: "A−",
				//icon: 'smaller',
				//title: mw.msg( 'smaller-text-toggle-popup-text' )
				id: "smaller-font-toggle",
				classes: ['ui-accessibility-button', 'access-no-resize', 'access-no-contrast']
			});

			smaller_font_size_toggle.on( 'click', function () {
				changeFontSize(0.90);
			});

			var buttons_group = new OO.ui.ButtonGroupWidget( {
				id: "mw-accessibility-menu",
				items: [contrast_RGB_toggle,
						larger_font_size_toggle,
						original_font_size_toggle,
						smaller_font_size_toggle],
				classes: ['fixed-action-btn horizontal','access-no-resize', 'access-no-contrast']						
			});
				
			$('#content').append( buttons_group.$element);
        });
    }
    
    $( function () {
        loadAccessibility();
    });

}( mediaWiki, jQuery ) );
