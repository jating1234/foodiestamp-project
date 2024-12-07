document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('mail');
    const phoneInput = document.getElementById('phone');
    const reviewText = document.getElementById('reviews');

    // Validation functions
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function isValidPhone(phone) {
        // Validates Indian phone numbers (+91 followed by 10 digits)
        const phonePattern = /^\+91[0-9]{10}$/;
        return phonePattern.test(phone);
    }

    function isValidName(name) {
        return name.trim().length >= 2;
    }

    // Function to show error message
    function showError(element, message) {
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

    // Function to show success message
    function showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
        successDiv.style.color = 'green';
        successDiv.style.padding = '10px';
        successDiv.style.marginBottom = '20px';
        successDiv.style.borderRadius = '5px';
        successDiv.style.textAlign = 'center';
        successDiv.textContent = 'Thank you for your review!';

        reviewForm.parentElement.insertBefore(successDiv, reviewForm);

        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Form submission handler
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate name
        if (!isValidName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name (minimum 2 characters)');
            isValid = false;
        } else {
            removeError(nameInput);
        }

        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(emailInput);
        }

        // Validate phone
        if (!isValidPhone(phoneInput.value)) {
            showError(phoneInput, 'Please enter a valid Indian phone number (+91 followed by 10 digits)');
            isValid = false;
        } else {
            removeError(phoneInput);
        }

        // Validate review text
        if (reviewText.value.trim().length < 10) {
            showError(reviewText, 'Please enter a review with at least 10 characters');
            isValid = false;
        } else {
            removeError(reviewText);
        }

        // If form is valid, process the submission
        if (isValid) {
            // Create review data object
            const reviewData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                review: reviewText.value
            };

            // Log the review data (replace with your actual submission logic)
            console.log('Review submitted:', reviewData);

            // Show success message
            showSuccess();

            // Reset the form
            reviewForm.reset();
        }
    });

    // Real-time validation and formatting
    nameInput.addEventListener('input', function() {
        removeError(nameInput);
    });

    emailInput.addEventListener('input', function() {
        removeError(emailInput);
    });

    phoneInput.addEventListener('input', function() {
        removeError(phoneInput);
        
        // Auto-format phone number
        let value = phoneInput.value.replace(/\D/g, '');
        if (!phoneInput.value.startsWith('+91') && value.length > 0) {
            phoneInput.value = '+91' + value;
        }
    });

    reviewText.addEventListener('input', function() {
        removeError(reviewText);
    });

    // Reset button handler
    const resetButton = reviewForm.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', function() {
        // Remove all error messages
        [nameInput, emailInput, phoneInput, reviewText].forEach(element => {
            removeError(element);
        });
    });

    // Character counter for review text
    reviewText.addEventListener('input', function() {
        const charCount = reviewText.value.length;
        let countDisplay = reviewText.parentElement.querySelector('.char-count');
        
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.className = 'char-count';
            countDisplay.style.fontSize = '12px';
            countDisplay.style.color = '#666';
            countDisplay.style.marginTop = '5px';
            reviewText.parentElement.appendChild(countDisplay);
        }
        
        countDisplay.textContent = `${charCount} characters`;
    });
});
