$( function() {
    // run the currently selected effect
    function runEffect() {
        // get effect type from
        var selectedEffect = $( "#effectTypes" ).val();

        // Most effect types need no options passed by default
        var options = {};
        // some effects have required parameters
        if ( selectedEffect === "scale" ) {
            options = { percent: 50 };
        } else if ( selectedEffect === "transfer" ) {
            options = { to: "#button", className: "ui-effects-transfer" };
        } else if ( selectedEffect === "size" ) {
            options = { to: { width: 200, height: 60 } };
        }

        // Run the effect
        $( "#effect" ).effect( selectedEffect, options, 500, callback );
    };

    // Callback function to bring a hidden box back
    function callback() {
        setTimeout(function() {
            $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
        }, 1000 );
    };

    // Set effect from select menu value
    $( "#button" ).on( "click", function() {
        runEffect();
        return false;
    });
} );
