
// ACTIVE NAVIGATION 
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        if (window.scrollY >= top) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// CONTACT FORM
const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("🌸 Thank you! We will contact you soon.");

        contactForm.reset();

    });

}


//  GEOLOCATION API
const locationInput = document.getElementById("location");

if (locationInput) {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            async function (position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                try {

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    locationInput.value = data.display_name;

                }
                catch (error) {

                    locationInput.value = latitude + ", " + longitude;

                }

            },

            function () {

                locationInput.value = "Location permission denied";

            }

        );

    }
    else {

        locationInput.value = "Geolocation not supported";

    }

}



//  DRAG & DROP IMAGE 
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("building-image");
const browseBtn = document.getElementById("browseBtn");
const fileName = document.getElementById("fileName");

if (dropZone && fileInput && browseBtn && fileName) {

    // Browse button
    browseBtn.addEventListener("click", () => {

        fileInput.click();

    });

    // Clicking anywhere on the drop zone
    dropZone.addEventListener("click", () => {

        fileInput.click();

    });

    // Highlight while dragging
    ["dragenter", "dragover"].forEach(event => {

        dropZone.addEventListener(event, function (e) {

            e.preventDefault();

            dropZone.classList.add("dragover");

        });

    });

    // Remove highlight
    ["dragleave", "drop"].forEach(event => {

        dropZone.addEventListener(event, function (e) {

            e.preventDefault();

            dropZone.classList.remove("dragover");

        });

    });

    // Drop file
    dropZone.addEventListener("drop", function (e) {

        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith("image/")) {

            fileInput.files = e.dataTransfer.files;

            fileName.textContent = file.name;

        }
        else {

            alert("Please drop an image file.");

        }

    });

    // File selected normally
    fileInput.addEventListener("change", function () {

        if (fileInput.files.length > 0) {

            fileName.textContent = fileInput.files[0].name;

        }

    });

}



//  ORDER FORM 
const orderForm = document.querySelector(".order-form");

if (orderForm) {

    orderForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const imageFile = fileInput.files[0];

        // Function to save order
        function saveOrder(imageData) {

            const order = {

                name: document.getElementById("customer-name").value,
                phone: document.getElementById("customer-phone").value,
                category: document.getElementById("flower-type").value,
                product: document.getElementById("product").value,
                quantity: document.getElementById("quantity").value,
                deliveryDate: document.getElementById("delivery-date").value,
                location: document.getElementById("location").value,
                address: document.getElementById("address").value,
                notes: document.getElementById("notes").value,
                buildingImage: imageData,
                orderTime: new Date().toLocaleString()

            };

            let orders = JSON.parse(localStorage.getItem("flowerOrders")) || [];

            orders.push(order);

            localStorage.setItem(
                "flowerOrders",
                JSON.stringify(orders)
            );

            alert("🌸 Order placed successfully!");

            // Preserve location after reset
            const currentLocation = locationInput.value;

            orderForm.reset();

            locationInput.value = currentLocation;

            fileName.textContent = "No image selected";

        }

        // If no image uploaded
        if (!imageFile) {

            saveOrder(null);

            return;

        }

        // Convert image to Base64
        const reader = new FileReader();

        reader.onload = function () {

            saveOrder(reader.result);

        };

        reader.readAsDataURL(imageFile);

    });

}