document.addEventListener("DOMContentLoaded", function () {
    /* === Dark Mode Toggle Code === */
    const themeToggle = document.getElementById("theme-toggle");

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
        if (themeToggle) {
            themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
        });
    }
    setTheme(localStorage.getItem("theme") || "light");

    /* === Contact Form Handling === */
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const formErrors = [];

            // Validate name
            const name = formData.get("name");
            if (!name.match(/^[A-Za-z\s]+$/)) {
                formErrors.push({ field: "name", message: "Invalid name format." });
            }

            // Validate email
            const email = formData.get("email");
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                formErrors.push({ field: "email", message: "Invalid email format." });
            }

            // Show validation errors, if any
            if (formErrors.length > 0) {
                document.getElementById("formErrors").value = JSON.stringify(formErrors);
                alert("Please correct the errors before submitting.");
                return;
            }

            // Send data asynchronously to httpbin.org
            fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                alert("Message sent successfully!");
                form.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            });
        });
    }
});
