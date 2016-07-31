/**
 * JavaScript for Accessibility Menu
 */
( function ( mw, $ ) {
    
    function loadAccessibility() {
        
        mw.loader.using(['oojs-ui']).then(function () {

            function resizeText(intSize) {
              if (document.body.style.fontSize == "") {
                document.body.style.fontSize = "1.0em";
              }
              if (intSize == "0") {
                document.body.style.fontSize = "1.0em";
              } else {
              document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (intSize * 0.2) + "em";
              }
            }
            var contrast_toggle, larger_text_toggle, smaller_text_toggle, buttons_group;

            contrast_toggle = new OO.ui.ToggleButtonWidget(
            {
                label: "◑",
				id: "contrast-toggle",               
                classes: ['ui-accessibility-button'],  
                value: false,
                iconTitle: mw.msg( 'contrast-toggle-popup-text' )
            });

            contrast_toggle.on( 'click', function ()
            {
                if(contrast_toggle.getValue())
                {
                    document.body.style.background = "#000";
                    document.body.style.color = "#fff";
                    document.getElementById("content").style.background = "#000";
                    //document.getElementById("main-row").style.background = "#000";
                }
                else
                {
                    document.body.style.background = "";
                    document.body.style.color = "";
                    document.getElementById("content").style.background = "";
                    //document.getElementById("main-row").style.background = "";
                }
            });

            larger_text_toggle = new OO.ui.ButtonWidget(
            {
                label: "A+",
                classes: ['ui-accessibility-button'],                
                iconTitle: mw.msg( 'larger-text-toggle-popup-text' )
            });

            larger_text_toggle.on( 'click', function ()
            {
                resizeText(1);
            });

            smaller_text_toggle = new OO.ui.ButtonWidget(
            {
                label: "A−",
                classes: ['ui-accessibility-button'],
                iconTitle: mw.msg( 'smaller-text-toggle-popup-text' )
            });

            smaller_text_toggle.on( 'click', function ()
            {
                resizeText(-1);
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
