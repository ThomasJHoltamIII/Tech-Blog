// Handler for login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    // Send a POST request to the API endpoint for user login
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If login is successful, redirect to the profile page
    if (response.ok) {
      const newResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // 2nd check added to prevent false log in, not dry but works
      if (newResponse.ok)
      document.location.replace('/profile');
    // Error handeling
    } else {
      alert(response.statusText);
    }
  }
};

// Handler for signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); 

  // Collect values from the signup form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if name, email, and password are provided
  if (name && email && password) {
    // Send a POST request to the API endpoint for user registration
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name: name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If signup is successful, redirect to the profile page
    if (response.ok) {
      const newResponse = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      // 2nd check added to force log in on new user, not dry but works
      if (newResponse.ok)
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// Attach the event listeners to the form submit events
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
