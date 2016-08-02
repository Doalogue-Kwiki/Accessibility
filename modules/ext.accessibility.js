/**
 * JavaScript for Accessibility Menu
 */
( function ( mw, $ ) {
    
    function loadAccessibility() {
        
        mw.loader.using(['oojs-ui']).then(function () {
			
			function resizeElementText(intSize, elementText) {
				var elementSize = $( elementText ).css( "fontSize" );
				if (elementSize != "") {					 
					elementSize = (parseFloat(elementSize) + intSize) + "px";
					$( elementText ).css( "fontSize", elementSize );
				}
				else{
					$( elementText ).css( "fontSize", "1em" );
				}
            }
			
			function resizeTagElementsText(intSize, tagName) {
				var tagElements = document.getElementsByTagName(tagName);
				
				for(var i = 0; i < tagElements.length; i++) {				   
				   resizeElementText(intSize, tagElements[i]);
				}
			}
			
            function resizeText(intSize) {				
			
				resizeElementText(intSize, document.body);
				resizeTagElementsText(intSize, "h1");
				resizeTagElementsText(intSize, "h2");
				resizeTagElementsText(intSize, "h3");
				resizeTagElementsText(intSize, "h4");
				resizeTagElementsText(intSize, "h5");
				resizeTagElementsText(intSize, "h6");
				resizeTagElementsText(intSize, "p");
				resizeTagElementsText(intSize, "a");
				resizeTagElementsText(intSize, "span");
				resizeTagElementsText(intSize, "div");	
				//resizeTagElementsText(intSize, "nav");
				resizeTagElementsText(intSize, "input");
				resizeTagElementsText(intSize, "strong");
				resizeTagElementsText(intSize, "select");
				resizeTagElementsText(intSize, "tr");
				resizeTagElementsText(intSize, "td");
            }
			
			function changeColorTagElementsText(color, backgroundColor, tagName) {
				var tagElements = document.getElementsByTagName(tagName);

				for(var i = 0; i < tagElements.length; i++) {
				   tagElements[i].style.background = backgroundColor;
				   tagElements[i].style.color = color;
				}
			}
			
            var contrast_toggle, larger_text_toggle, smaller_text_toggle, buttons_group;

            contrast_toggle = new OO.ui.ToggleButtonWidget(
            {
                label: " ◑ ",
				//icon: 'halfBright',
				id: "contrast-toggle",               
                classes: ['ui-accessibility-button'],  
                value: false,
                //title: mw.msg( 'contrast-toggle-popup-text' )
            });

            contrast_toggle.on( 'click', function ()
            {
                if(contrast_toggle.getValue())
                {
                    document.body.style.background = "#000";
                    document.body.style.color = "#fff";
                    document.getElementById("content").style.background = "#000";
                    changeColorTagElementsText("#fff","#000", "h1");
					changeColorTagElementsText("#fff","#000", "h2");
					changeColorTagElementsText("#fff","#000", "h3");
					changeColorTagElementsText("#fff","#000", "h4");
					changeColorTagElementsText("#fff","#000", "h5");
					changeColorTagElementsText("#fff","#000", "h6");
					changeColorTagElementsText("#fff","#000", "span");
					changeColorTagElementsText("#fff","#000", "p");
					changeColorTagElementsText("#fff","#000", "a");
					changeColorTagElementsText("#fff","#000", "div");
					changeColorTagElementsText("#fff","#000", "nav");
					changeColorTagElementsText("#fff","#000", "ul");
					changeColorTagElementsText("#fff","#000", "li");
					changeColorTagElementsText("#fff","#000", "input");
					changeColorTagElementsText("#fff","#000", "select");
					changeColorTagElementsText("#fff","#000", "button");
					changeColorTagElementsText("#fff","#000", "strong");
					changeColorTagElementsText("#fff","#000", "tr");
					changeColorTagElementsText("#fff","#000", "td");
                }
                else
                {
                    document.body.style.background = "";
                    document.body.style.color = "";
                    document.getElementById("content").style.background = "";
                    changeColorTagElementsText("","", "h1");
					changeColorTagElementsText("","", "h2");
					changeColorTagElementsText("","", "h3");
					changeColorTagElementsText("","", "h4");
					changeColorTagElementsText("","", "h5");
					changeColorTagElementsText("","", "h6");
					changeColorTagElementsText("","", "span");
					changeColorTagElementsText("","", "p");
					changeColorTagElementsText("","", "a");
					changeColorTagElementsText("","", "div");
					changeColorTagElementsText("","", "nav");					
					changeColorTagElementsText("","", "ul");
					changeColorTagElementsText("","", "li");
					changeColorTagElementsText("","", "input");
					changeColorTagElementsText("","", "select");
					changeColorTagElementsText("","", "button");
					changeColorTagElementsText("","", "strong");
					changeColorTagElementsText("","", "tr");
					changeColorTagElementsText("","", "td");
                }
            });

            larger_text_toggle = new OO.ui.ButtonWidget(
            {
                label: "A+",
				//icon: 'bigger',
				id: "larger-text-toggle",
                classes: ['ui-accessibility-button'],                
                //title: mw.msg( 'larger-text-toggle-popup-text' )
            });

            larger_text_toggle.on( 'click', function ()
            {
                resizeText(2);
            });

            smaller_text_toggle = new OO.ui.ButtonWidget(
            {
                label: "A−",
				//icon: 'smaller',
				id: "smaller-text-toggle",
                classes: ['ui-accessibility-button'],
                //title: mw.msg( 'smaller-text-toggle-popup-text' )
            });

            smaller_text_toggle.on( 'click', function ()
            {
                resizeText(-2);
            });

            buttons_group = new OO.ui.ButtonGroupWidget(
            {
                id: "mw-accessibility-menu",
                items: [larger_text_toggle,
                        smaller_text_toggle,
                        contrast_toggle]                
            });
            
            $( '#content' ).append( buttons_group.$element);
        });
    }
    
    $( function () {
        loadAccessibility();
    });

}( mediaWiki, jQuery ) );
