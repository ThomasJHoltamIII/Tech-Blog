// Function to handle user logout
const logout = async () => {
  // Send a POST request to the API endpoint for user logout
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // If logout is successful, redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    // Display an error message if logout fails
    alert(response.statusText);
  }
};

// Attach the event listener to the logout button for click events
document.querySelector('#logout').addEventListener('click', logout);
