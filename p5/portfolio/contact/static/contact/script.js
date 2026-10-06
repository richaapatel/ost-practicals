// Typing Effect on Header Subtitle

document.addEventListener("DOMContentLoaded", function () {

    var subtitleEl = document.querySelector("header p");

    if (subtitleEl) {

        var fullText = subtitleEl.textContent;

        subtitleEl.textContent = "";

        subtitleEl.style.borderRight = "2px solid white";

        var charIndex = 0;

        function typeChar() {

            if (charIndex < fullText.length) {

                subtitleEl.textContent += fullText.charAt(charIndex);

                charIndex++;

                setTimeout(typeChar, 60);

            } else {

                setTimeout(function () {
                    subtitleEl.style.borderRight = "none";
                }, 1500);

            }
        }

        typeChar();
    }


    // Scroll Fade-In Animation

    var sections = document.querySelectorAll(".fade-in");

    var observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.15
    });


    sections.forEach(function (section) {
        observer.observe(section);
    });


    // Active Nav Link Highlighting on Scroll

    var navLinks = document.querySelectorAll("nav a");

    var allSections = document.querySelectorAll("section[id]");


    function highlightNav() {

        var scrollPos = window.scrollY + 120;

        allSections.forEach(function (section) {

            var top = section.offsetTop;

            var height = section.offsetHeight;

            var id = section.getAttribute("id");


            if (scrollPos >= top && scrollPos < top + height) {

                navLinks.forEach(function (link) {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + id) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }


    window.addEventListener("scroll", highlightNav);

    highlightNav();

});