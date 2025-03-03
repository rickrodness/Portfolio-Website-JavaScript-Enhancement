document.addEventListener("DOMContentLoaded", function () {
    /* === Dark Mode Toggle Code === */
    const themeToggle = document.getElementById("theme-toggle");

    // Function to set theme
    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
        if (themeToggle) {
            themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        }
    }

    // Attach dark mode event if button exists
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const currentTheme = document.documentElement.dataset.theme;
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(newTheme);
        });
    }
    // Load stored theme (applies regardless of toggle button)
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    /* === Contact Form Validation Code === */
    const form = document.getElementById("contactForm");
    if (form) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const charCountOutput = document.getElementById("charCount");
        const formErrorsField = document.getElementById("formErrors");
        let formErrors = [];

        // Character countdown for textarea
        if (messageInput && charCountOutput) {
            messageInput.addEventListener("input", function () {
                const remaining = 500 - messageInput.value.length;
                charCountOutput.textContent = `${remaining} characters left`;
                charCountOutput.style.color = remaining <= 50 ? "red" : "black";
            });
        }

        // Input validation function
        function validateField(input, errorOutput, pattern) {
            if (!input.value.match(pattern)) {
                errorOutput.textContent = `Invalid input: ${input.placeholder}`;
                input.classList.add("invalid");
                formErrors.push({ field: input.name, message: errorOutput.textContent });
                return false;
            } else {
                errorOutput.textContent = "";
                input.classList.remove("invalid");
                return true;
            }
        }

        // Prevent form submission if validation fails
        form.addEventListener("submit", function (event) {
            formErrors = []; // Reset errors
            const isValidName = nameInput ? validateField(nameInput, document.getElementById("nameError"), /^[A-Za-z\s]+$/) : true;
            const isValidEmail = emailInput ? validateField(emailInput, document.getElementById("emailError"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/) : true;

            if (!isValidName || !isValidEmail) {
                event.preventDefault();
                if (formErrorsField) {
                    formErrorsField.value = JSON.stringify(formErrors);
                }
            }
        });
    }
});
