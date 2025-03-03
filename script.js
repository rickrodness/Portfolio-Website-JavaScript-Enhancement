document.addEventListener("DOMContentLoaded", function () {
    // Dark mode toggle elements
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
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Contact form elements (if present)
    const form = document.getElementById("contactForm");
    if (form) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const charCountOutput = document.getElementById("charCount");
        const formErrorsField = document.getElementById("formErrors");
        const errorMsg = document.getElementById("errorMsg");
        const infoMsg = document.getElementById("infoMsg");
        let formErrors = [];

        // Character countdown for textarea
        if (messageInput && charCountOutput) {
            messageInput.addEventListener("input", function () {
                const remaining = 500 - messageInput.value.length;
                charCountOutput.textContent = `${remaining} characters left`;
                charCountOutput.style.color = remaining <= 50 ? "red" : "black";
            });
        }

        // Validation function that returns an error message if invalid
        function validateField(input, pattern) {
            if (!input.value.match(pattern)) {
                let msg = `Invalid input: ${input.placeholder}`;
                formErrors.push({ field: input.name, message: msg });
                return msg;
            }
            return "";
        }

        // On form submission, validate inputs and show errors in errorMsg
        form.addEventListener("submit", function (event) {
            formErrors = [];
            errorMsg.textContent = "";
            infoMsg.textContent = "";
            
            let errName = validateField(nameInput, /^[A-Za-z\s]+$/);
            let errEmail = validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            if (errName || errEmail) {
                // Display the errors in the errorMsg output element
                errorMsg.textContent = errName + " " + errEmail;
                event.preventDefault();
                formErrorsField.value = JSON.stringify(formErrors);
            } else {
                // Optionally, set a success message in infoMsg if needed
                formErrorsField.value = "";
                infoMsg.textContent = "Form is valid! Submitting...";
            }
        });
    }
});
