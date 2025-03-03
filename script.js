document.addEventListener("DOMContentLoaded", function () {
    /* ======================================
       1) Dark Mode Toggle 
       ====================================== */
    const themeToggle = document.getElementById("theme-toggle");

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        if (themeToggle) {
            // Switch icon based on theme
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

    // Load saved theme (dark/light) from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    /* ======================================
       2) Theme Customizer (Extra Credit)
       ====================================== */
    // Elements from the Theme Customizer section
    const customThemeNameInput = document.getElementById("customThemeName");
    const customTextColorInput = document.getElementById("customTextColor");
    const customBgColorInput = document.getElementById("customBgColor");
    const customFontSelect = document.getElementById("customFontSelect");
    const applyCustomThemeBtn = document.getElementById("applyCustomTheme");
    const saveCustomThemeBtn = document.getElementById("saveCustomTheme");
    const loadCustomThemeBtn = document.getElementById("loadCustomTheme");

    // Function to apply the custom theme by updating CSS variables
    function applyCustomTheme(themeName, textColor, bgColor, fontFamily) {
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--background-color', bgColor);
        document.documentElement.style.setProperty('--font-family', fontFamily);

        // Optionally set a data-theme attribute
        document.documentElement.dataset.theme = themeName || 'custom';
    }

    // Apply button: immediately apply the chosen colors/font to the page
    if (applyCustomThemeBtn) {
        applyCustomThemeBtn.addEventListener('click', () => {
            const themeName = customThemeNameInput.value.trim() || 'custom';
            const textColor = customTextColorInput.value;
            const bgColor = customBgColorInput.value;
            const fontFamily = customFontSelect.value;

            applyCustomTheme(themeName, textColor, bgColor, fontFamily);
        });
    }

    // Save button: store the custom theme in localStorage
    if (saveCustomThemeBtn) {
        saveCustomThemeBtn.addEventListener('click', () => {
            const themeName = customThemeNameInput.value.trim() || 'custom';
            const textColor = customTextColorInput.value;
            const bgColor = customBgColorInput.value;
            const fontFamily = customFontSelect.value;

            const customTheme = {
                themeName,
                textColor,
                bgColor,
                fontFamily
            };
            localStorage.setItem("customTheme", JSON.stringify(customTheme));
            alert("Custom theme saved!");
        });
    }

    // Load button: retrieve the custom theme from localStorage and apply it
    if (loadCustomThemeBtn) {
        loadCustomThemeBtn.addEventListener('click', () => {
            const saved = localStorage.getItem("customTheme");
            if (saved) {
                const customTheme = JSON.parse(saved);

                // Populate the inputs
                customThemeNameInput.value = customTheme.themeName;
                customTextColorInput.value = customTheme.textColor;
                customBgColorInput.value = customTheme.bgColor;
                customFontSelect.value = customTheme.fontFamily;

                // Apply it to the page
                applyCustomTheme(
                    customTheme.themeName,
                    customTheme.textColor,
                    customTheme.bgColor,
                    customTheme.fontFamily
                );
            } else {
                alert("No custom theme found in localStorage!");
            }
        });
    }

    /* ======================================
       3) Contact Form Validator
       ====================================== */
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

        // Prevent submission if there are errors
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            formErrors = [];
            errorMsg.textContent = "";
            infoMsg.textContent = "";

            let errName = validateField(nameInput, /^[A-Za-z\s]+$/);
            let errEmail = validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            if (errName || errEmail) {
                errorMsg.textContent = errName + " " + errEmail;
                formErrorsField.value = JSON.stringify(formErrors);
                return; // Stop submission if errors exist
            }

            // Send the form data via fetch()
            const formData = new FormData(form);
            fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                infoMsg.textContent = "✅ Message successfully sent!";
                form.reset(); // Clear form after submission
                charCountOutput.textContent = "500 characters left";
            })
            .catch(error => {
                errorMsg.textContent = "❌ An error occurred. Please try again.";
            });
        });
    }
});
