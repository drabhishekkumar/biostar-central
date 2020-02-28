/*
Code that handles recipe interface goes here.
*/


function prepare_codemirror(element, size, mode) {

    var area = CodeMirror.fromTextArea(
        element[0],
        {
            lineNumbers: true,
            mode: mode,
        }
    );

    function update() {
        area.save();
    }

    area.on('change', update);

    area.setSize(null, size);

    return area
}

$(document).ready(function () {

    prepare_codemirror($('#code textarea'), 700, 'shell');
    prepare_codemirror($('#interface textarea'), 700, 'engine');

    //script.refresh();
    //interface.refresh();

    // Select open item or the default
    hash = window.location.hash || "#description" ;

    // Select collapsable elements
    collapse = $(".collapse");

    // Hide all collapsable elements.
    collapse.hide();

    // Show only the selected tab.
    $(hash).show();

    $(".clickable > .item").click(function (event) {

        // Don't trigger other behaviors.
        event.preventDefault();

        // The clicked element
        var elem = $(this);

        // Find the targeted element.
        var target_id = '#' + elem.data('value');

        // Find the current hash
        var current_id = window.location.hash;

        // The selected page is already active.
        if (target_id === current_id){
            return;
        }

        // Move the target so it is first, thus always opens downwards.
        $(target_id).parent().prepend($(target_id));

        // Rewrite the window  with current id.
        window.location.hash = target_id;

        // Close all open elements.
        collapse.hide("slow", function () {
            // Animation complete.
        });

        // Open the current element.
        $(target_id).show("slow", function () {
            // Animation complete.
        });

    });

});
