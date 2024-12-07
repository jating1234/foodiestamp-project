document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login');
    const emailInput = document.getElementById('mail');
    const passwordInput = document.querySelector('input[type="password"]');

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to show error message
    function showError(element, message) {
        // Remove any existing error
        removeError(element);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        element.parentElement.appendChild(errorDiv);
    }

    // Function to remove error message
    function removeError(element) {
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Validate password
        if (passwordInput.value === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, 'Password must be at least 8 characters long');
            isValid = false;
        } else {
            removeError(passwordInput);
        }

        // If form is valid, process the login
        if (isValid) {
            // Create login data object
            const loginData = {
                email: emailInput.value,
                password: passwordInput.value
            };

            // Here you would typically send the data to a server for authentication
            console.log('Login attempt:', loginData);

            // Simulated login success
            handleLoginSuccess();
        }
    });

    // Function to handle successful login
    function handleLoginSuccess() {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.color = 'green';
        successMessage.style.textAlign = 'center';
        successMessage.style.padding = '10px';
        successMessage.textContent = 'Login successful!';

        // Insert success message before the form
        loginForm.parentElement.insertBefore(successMessage, loginForm);

        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.remove();
            // Redirect to home page or dashboard
            window.location.href = 'main.html';
        });

        // Reset the form
        loginForm.reset();
    }

    // Real-time validation
    emailInput.addEventListener('input', function() {
        removeError(emailInput);
    });

    passwordInput.addEventListener('input', function() {
        removeError(passwordInput);
    });

    // Reset button handler
    const resetButton = loginForm.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', function() {
        removeError(emailInput);
        removeError(passwordInput);
    });

    // Add password visibility toggle
    const togglePassword = document.createElement('button');
    togglePassword.type = 'button';
    togglePassword.textContent = 'Show';
    togglePassword.style.marginLeft = '10px';
    togglePassword.onclick = function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = 'Show';
        }
    };
    passwordInput.parentElement.insertBefore(togglePassword, passwordInput.nextSibling);
});
