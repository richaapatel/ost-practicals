// Typing Effect on Header Subtitle
document.addEventListener("DOMContentLoaded", function () {
    var subtitleEl = document.querySelector("header p");
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
            // Remove blinking cursor after typing is done
            setTimeout(function () {
                subtitleEl.style.borderRight = "none";
            }, 1500);
        }
    }

    typeChar();


    //Scroll Fade-In Animation (moved from inline script)
    var sections = document.querySelectorAll(".fade-in");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(function (section) {
        observer.observe(section);
    });


    //Active Nav Link Highlighting on Scroll
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
    highlightNav(); // run once on load


    //Contact Form Validation
    var form = document.getElementById("contactForm");
    var nameInput = document.getElementById("nameInput");
    var emailInput = document.getElementById("emailInput");
    var messageInput = document.getElementById("messageInput");
    var formSuccess = document.getElementById("formSuccess");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        var isValid = true;

        // Validate Name
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name.");
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, "Name must be at least 2 characters.");
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim() === "") {
            showError(emailInput, "Please enter your email.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === "") {
            showError(messageInput, "Please enter a message.");
            isValid = false;
        } else if (messageInput.value.trim().length < 1) {
            showError(messageInput, "Message cannot be empty.");
            isValid = false;
        }

        // If all valid, show success
        if (isValid) {
            formSuccess.style.display = "block";
            form.reset();
            setTimeout(function () {
                formSuccess.style.display = "none";
            }, 4000);
        }
    });

    // Clear error on input
    [nameInput, emailInput, messageInput].forEach(function (input) {
        input.addEventListener("input", function () {
            var errorEl = input.parentElement.querySelector(".error-msg");
            if (errorEl) {
                errorEl.remove();
                input.classList.remove("input-error");
            }
        });
    });

    function showError(inputEl, message) {
        inputEl.classList.add("input-error");
        var errorSpan = document.createElement("span");
        errorSpan.className = "error-msg";
        errorSpan.textContent = message;
        inputEl.parentElement.appendChild(errorSpan);
    }

    function clearErrors() {
        var errors = document.querySelectorAll(".error-msg");
        errors.forEach(function (el) { el.remove(); });
        var inputs = document.querySelectorAll(".input-error");
        inputs.forEach(function (el) { el.classList.remove("input-error"); });
        formSuccess.style.display = "none";
    }

    function isValidEmail(email) {
        var re =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
