document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');
    const addressInput = document.getElementById('address');

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to show error message
    function showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.textContent = message;
        
        // Remove any existing error message
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        element.parentElement.appendChild(errorDiv);
    }

    // Function to remove error message
    function removeError(element) {
        const errorDiv = element.parentElement.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (nameInput.value.length < 2) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            removeError(nameInput);
        }

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

        // Validate address
        if (addressInput.value.trim() === '') {
            showError(addressInput, 'Address is required');
            isValid = false;
        } else {
            removeError(addressInput);
        }

        // If form is valid, process the submission
        if (isValid) {
            // Create an object with form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                address: addressInput.value
            };

            // Here you would typically send the data to a server
            console.log('Form submitted successfully:', formData);
            
            // Show success message
            alert('Registration successful!');
            
            // Reset the form
            form.reset();
            
            //Optionally redirect to login page
            window.location.href = 'login.html';
        }
    });

    // Real-time validation
    const inputs = [nameInput, emailInput, passwordInput, addressInput];
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(input);
        });
    });

    // Reset button handler - clear all error messages
    const resetButton = form.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', function() {
        inputs.forEach(input => removeError(input));
    });
});
