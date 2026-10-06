/*
 * portfolio-jquery.js
 * jQuery DOM manipulation for the Portfolio website.
 *
 * Concepts used:
 * - Basic jQuery syntax: $(selector).method()
 * - $() selector shorthand
 * - jQuery selectors
 * - $(document).ready()
 * - .text() and .html()
 * - .addClass(), .removeClass(), .toggleClass(), .hasClass()
 * - .css()
 * - .on() events and $(this)
 * - .val() for form controls
 * - Method chaining
 */

$(document).ready(function () {

    // 1. Basic jQuery syntax + click event + .text()
    $("#changeHeadingBtn").on("click", function () {
        $("#heroTitle").text("Welcome to My jQuery Portfolio!");

        $("#jqueryStatus").text(
            "The portfolio heading was changed using jQuery .text()."
        );
    });


    // 2. CSS selector examples:
    // #id selector, .class selector, element selector,
    // attribute selector

    $("#styleAboutBtn").on("click", function () {

        // ID selector + CSS manipulation
        $("#aboutText").css({
            color: "#1271b0",
            backgroundColor: "#f0f2f5",
            padding: "15px",
            borderRadius: "8px"
        });

        // Class selector
        $(".skill-badge").css("cursor", "pointer");

        // Element selector
        $("section").css("scroll-margin-top", "80px");

        // Attribute selector
        $("input[type='email']").attr(
            "title",
            "Email field selected using an attribute selector"
        );

        $("#jqueryOutput").text(
            "CSS properties were applied using jQuery .css()."
        );
    });


    // 3. toggleClass() and hasClass()
    $("#toggleHighlightBtn").on("click", function () {

        $("#aboutText").toggleClass(
            "jquery-highlight jquery-large-text"
        );

        if ($("#aboutText").hasClass("jquery-highlight")) {

            $("#jqueryOutput").text(
                "Highlight class added. Click again to remove it."
            );

        } else {

            $("#jqueryOutput").text(
                "Highlight class removed."
            );
        }
    });


    // 4. .html() getter
    // Reads the HTML present inside the About section

    $("#showHtmlBtn").on("click", function () {

        var currentHtml = $("#aboutText").html();

        $("#jqueryOutput").html(
            "<strong>HTML inside About Me:</strong><br>" +
            currentHtml
        );
    });


    // 5. keyup event + $(this) + .val()
    // Displays the name while the user types

    $("#nameInput").on("keyup", function () {

        var typedName = $(this).val();

        if (typedName.trim() !== "") {

            $("#jqueryStatus").text(
                "Hello, " +
                typedName +
                "! jQuery read the form value using .val()."
            );

        } else {

            $("#jqueryStatus").text(
                "Type your name to see the jQuery keyup event."
            );
        }
    });


    // 6. Form submit + preventDefault() + .val()

    $("#contactForm").on("submit", function (event) {

        event.preventDefault();

        var name = $("#nameInput").val().trim();
        var email = $("#emailInput").val().trim();
        var message = $("#messageInput").val().trim();

        if (name && email && message) {

            $("#jqueryStatus").text(
                "Form values read successfully using jQuery .val()."
            );
        }
    });


    // 7. Method chaining
    // text() -> addClass() -> css() -> show()

    $("#messageHeading").on("click", function () {

        $(this)
            .text("Message Me — jQuery Method Chaining!")
            .addClass("jquery-highlight")
            .css({
                color: "#1271b0",
                fontWeight: "700"
            })
            .show();
    });


    // 8. Reset the jQuery changes

    $("#resetJqueryBtn").on("click", function () {

        // Restore heading
        $("#heroTitle").text("Richa Patel");

        // Restore subtitle
        $("#heroSubtitle").text(
            "CSE-MBA Student • Developer • Learner"
        );

        // Restore About text and remove classes
        $("#aboutText")
            .html(
                "I am <b>Richa Patel</b>. I am a 3rd year CSE-MBA student who enjoys learning web development and programming along with some managerial skills."
            )
            .removeClass(
                "jquery-highlight jquery-large-text"
            )
            .css({
                color: "",
                backgroundColor: "",
                padding: "",
                borderRadius: ""
            });

        $("#jqueryStatus").text(
            "jQuery changes were reset. Try the buttons again."
        );

        $("#jqueryOutput").text("");
    });


    // 9. Getting text using .text()
    // This runs when the DOM is ready.

    var headingText = $("#heroTitle").text();

    console.log(
        "Portfolio heading retrieved using jQuery .text(): " +
        headingText
    );

});