/*
 * portfolio-jquery.js
 * jQuery DOM manipulation for the Portfolio website.
 *
 * Concepts used:
 * - Basic jQuery syntax: $(selector).method()
 * - $() selector shorthand
 * - jQuery selectors (#id, .class, element, [attribute])
 * - $(document).ready()
 * - .text() and .html()
 * - .addClass(), .removeClass(), .toggleClass(), .hasClass()
 * - .css()
 * - .on() events and $(this)
 * - .val() for form controls
 * - Method chaining
 * - .each(), .filter(), .find()
 * - .show(), .hide(), .fadeIn(), .fadeOut(), .slideDown(), .slideUp()
 * - .animate()
 * - .attr()
 */

$(document).ready(function () {


    /* =========================
       1. TYPING EFFECT  (jQuery .text() + setTimeout)
    ========================== */

    var $subtitle = $("#heroSubtitle");              // ID selector
    var fullText  = $subtitle.text();                // .text() getter

    $subtitle.text("");                               // .text() setter
    $subtitle.css("border-right", "2px solid white"); // .css()

    var charIndex = 0;

    function typeChar() {

        if (charIndex < fullText.length) {

            // .text() getter + setter (appending one character)
            $subtitle.text(
                $subtitle.text() + fullText.charAt(charIndex)
            );

            charIndex++;
            setTimeout(typeChar, 60);

        } else {

            setTimeout(function () {
                $subtitle.css("border-right", "none");  // .css()
            }, 1500);
        }
    }

    typeChar();



    /* =========================
       2. SCROLL FADE-IN  (.each(), .addClass())
    ========================== */

    var $fadeEls = $(".fade-in");                     // Class selector

    // IntersectionObserver for performance
    var observer = new IntersectionObserver(

        function (entries) {

            $.each(entries, function (i, entry) {     // $.each()

                if (entry.isIntersecting) {
                    $(entry.target).addClass("visible"); // .addClass()
                }
            });
        },
        { threshold: 0.15 }
    );

    $fadeEls.each(function () {                       // .each()
        observer.observe(this);
    });



    /* =========================
       3. ACTIVE NAVIGATION HIGHLIGHT  (.on(), .each(), .attr())
    ========================== */

    var $navLinks    = $(".navbar .nav-link");         // Class selector
    var $allSections = $("section[id]");               // Attribute selector

    function highlightNav() {

        var scrollPos = $(window).scrollTop() + 120;   // jQuery scroll

        $allSections.each(function () {                // .each()

            var $sec   = $(this);
            var top    = $sec.offset().top;             // .offset()
            var height = $sec.outerHeight();            // .outerHeight()
            var id     = $sec.attr("id");               // .attr()

            if (scrollPos >= top && scrollPos < top + height) {

                $navLinks
                    .removeClass("active")              // .removeClass()
                    .filter('[href="#' + id + '"]')      // .filter() + attribute selector
                    .addClass("active");                 // .addClass()
            }
        });
    }

    $(window).on("scroll", highlightNav);              // .on()
    highlightNav();



    /* =========================
       4. SMOOTH SCROLL ON NAV LINKS  (.on(), .animate())
    ========================== */

    $navLinks.on("click", function (e) {               // .on() + $(this)

        var href = $(this).attr("href");               // .attr()

        if (href && href.charAt(0) === "#") {

            e.preventDefault();

            var $target = $(href);                      // jQuery selector from href

            if ($target.length) {

                $("html, body").animate(                // .animate()
                    { scrollTop: $target.offset().top - 70 },
                    600
                );
            }

            // Close mobile menu after click
            var $navCollapse = $(".navbar-collapse");

            if ($navCollapse.hasClass("show")) {        // .hasClass()
                $navCollapse.removeClass("show");        // .removeClass()
            }
        }
    });



    /* =========================
       5. BOOTSTRAP TOOLTIPS INIT  (element selector + .each())
    ========================== */

    $('[data-bs-toggle="tooltip"]').each(function () { // Attribute selector
        new bootstrap.Tooltip(this);
    });



    /* =========================
       6. PROJECT FILTER  (.on(), .filter(), .show(), .hide(), $(this))
    ========================== */

    $(".project-filter").on("click", function () {     // .on() + Class selector

        var category = $(this).attr("data-filter");    // .attr() via $(this)

        // Toggle active-filter class (method chaining)
        $(".project-filter")
            .removeClass("active-filter")               // .removeClass()
            ;

        $(this).addClass("active-filter");              // .addClass()

        if (category === "all") {

            $(".project-item")
                .removeClass("filtered-out")            // .removeClass()
                .hide()                                  // .hide()
                .fadeIn(300);                             // .fadeIn()

        } else {

            $(".project-item").each(function () {       // .each()

                var $item = $(this);

                if ($item.attr("data-category") === category) { // .attr()

                    $item
                        .removeClass("filtered-out")
                        .hide()
                        .fadeIn(300);

                } else {

                    $item.addClass("filtered-out");     // .addClass()
                }
            });
        }

        // Show / hide "no projects" message
        var visibleCount = $(".project-item")
            .not(".filtered-out")                        // .not()
            .length;

        if (visibleCount === 0) {
            $("#noProjectsMessage").fadeIn(200);          // .fadeIn()
        } else {
            $("#noProjectsMessage").fadeOut(200);         // .fadeOut()
        }
    });



    /* =========================
       7. MESSAGE CHARACTER COUNTER  (.on(), .val(), .text())
    ========================== */

    $("#messageInput").on("input", function () {        // .on()

        var length = $(this).val().length;              // .val() + $(this)

        $("#messageCounter").text(                      // .text() setter
            length + " / 500 characters"
        );
    });



    /* =========================
       8. CONTACT FORM VALIDATION  (.on(), .val(), .addClass(), .html())
    ========================== */

    $("#contactForm").on("submit", function (e) {      // .on()

        e.preventDefault();
        e.stopPropagation();

        var $form         = $(this);                    // $(this)
        var $nameInput    = $("#nameInput");             // ID selector
        var $emailInput   = $("#emailInput");
        var $messageInput = $("#messageInput");
        var $formMessage  = $("#formMessage");

        $form.removeClass("was-validated");              // .removeClass()
        $formMessage.hide();                             // .hide()

        // Native HTML5 validity check
        if (!this.checkValidity()) {
            $form.addClass("was-validated");              // .addClass()
            return;
        }

        var isValid = true;

        // Custom checks using .val()
        if ($nameInput.val().trim().length < 2) {        // .val()

            this.querySelector("#nameInput")
                .setCustomValidity(
                    "Name must be at least 2 characters."
                );
            isValid = false;

        } else {
            this.querySelector("#nameInput")
                .setCustomValidity("");
        }

        if ($messageInput.val().trim().length < 10) {    // .val()

            this.querySelector("#messageInput")
                .setCustomValidity(
                    "Message must be at least 10 characters."
                );
            isValid = false;

        } else {
            this.querySelector("#messageInput")
                .setCustomValidity("");
        }

        $form.addClass("was-validated");

        if (isValid && this.checkValidity()) {

            // Method chaining: .attr() -> .text() -> .fadeIn()
            $formMessage
                .attr("class",
                    "alert alert-success text-center mt-3"
                )
                .text(
                    "Thank you! Your message has been received."
                )
                .fadeIn(300);

            // Bootstrap Toast
            var toastEl = document.getElementById("formToast");
            var bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
            bsToast.show();

            // Reset form
            this.reset();
            $form.removeClass("was-validated");
            $("#messageCounter").text("0 / 500 characters"); // .text()

            setTimeout(function () {
                $formMessage.fadeOut(300);                // .fadeOut()
            }, 4000);
        }
    });


    // Clear custom validity on input  (.on() with each field)
    $("#nameInput, #emailInput, #messageInput")          // Multiple selectors
        .on("input", function () {
            this.setCustomValidity("");
        });



    /* =========================
       9. BACK TO TOP BUTTON  (.on(), .fadeIn(), .fadeOut(), .animate())
    ========================== */

    var $backToTop = $("#backToTop");                    // ID selector

    $(window).on("scroll", function () {                // .on()

        if ($(this).scrollTop() > 400) {
            $backToTop.fadeIn(300);                       // .fadeIn()
        } else {
            $backToTop.fadeOut(300);                      // .fadeOut()
        }
    });

    $backToTop.on("click", function () {                // .on()

        $("html, body").animate(                        // .animate()
            { scrollTop: 0 },
            600
        );
    });



    /* =========================
       10. SKILL BADGE HOVER EFFECT  (.on(), .css(), $(this), .animate())
    ========================== */

    $(".skill-badge").on("mouseenter", function () {    // .on("mouseenter")

        $(this).css({                                   // .css() + $(this)
            cursor: "pointer",
            transition: "all 0.3s ease"
        });

        $(this).animate({ opacity: 0.85 }, 150)        // .animate()
               .animate({ opacity: 1 }, 150);

    }).on("mouseleave", function () {                   // Method chaining .on()

        $(this).css({
            cursor: "default"
        });
    });


    /* =========================
       10b. CSS BADGE PULSE ANIMATION
       Finds the CSS skill badge using :contains() selector,
       changes its text and colour, and adds a repeating
       pulse glow so it catches the eye.
    ========================== */

    // Find the CSS badge using jQuery :contains selector
    var $cssBadge = $(".skill-badge").filter(function () {  // .filter()
        return $.trim($(this).text()) === "CSS";             // .text() getter
    });

    // Change its text and colour using .text() and .css()
    $cssBadge
        .text("CSS3")                                        // .text() setter
        .css({                                               // .css() setter
            background: "linear-gradient(135deg, #2980b9, #8e44ad)",
            boxShadow: "0 2px 8px rgba(142, 68, 173, 0.35)"
        });

    // Pulse animation using setInterval + .animate()
    setInterval(function () {

        $cssBadge
            .animate({ opacity: 0.7 }, 400)                 // .animate()
            .animate({ opacity: 1 }, 400);

    }, 3000);



    /* =========================
       11. FOOTER YEAR AUTO-UPDATE  (.html())
    ========================== */

    var currentYear = new Date().getFullYear();

    $("#footerText").html(                              // .html() setter
        "&copy; " + currentYear + " Richa Patel | " +
        "Designed with " +
        '<i class="bi bi-heart-fill text-danger"></i> ' +
        "using Bootstrap 5"
    );



    /* =========================
       12. CONSOLE LOG — .text() getter demo
    ========================== */

    var headingText = $("#heroTitle").text();            // .text() getter

    console.log(
        "Portfolio heading retrieved using jQuery .text(): " +
        headingText
    );



    /* =========================
       13. TIME-BASED GREETING  (.text() setter + .css() color change)
       Changes the hero subtitle text and color
       based on the time of day.
    ========================== */

    var hour = new Date().getHours();
    var greeting;
    var greetingColor;

    if (hour >= 5 && hour < 12) {

        greeting      = "Good Morning";
        greetingColor = "#f39c12";              // warm gold for morning

    } else if (hour >= 12 && hour < 17) {

        greeting      = "Good Afternoon";
        greetingColor = "#e67e22";              // amber for afternoon

    } else {

        greeting      = "Good Evening";
        greetingColor = "#9b59b6";              // soft purple for evening
    }

    // Change the hero heading text using .text()
    $("#heroTitle").text(greeting + ", I'm Richa Patel");  // .text() setter

    // Change the heading colour using .css()
    $("#heroTitle").css("color", greetingColor);            // .css() setter

});