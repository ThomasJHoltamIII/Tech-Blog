// Handler for creating a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  // Check if title and body are not empty
  if (title && body) {
    // Send a POST request to create a new post
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the request is successful, redirect to the profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// Handler for adding a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const postId = event.target.getAttribute('data-post-id');
  const commentText = document.querySelector('#comment').value.trim();

  // Check if comment text is not empty
  if (commentText) {
    // Send a POST request to create a new comment
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ commentText, postId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the request is successful, redirect to the profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
  }
};

// This is still being built, but is structure for future editing of posts
// const editButtonHandler = async (event) => {
//   if (event.target.hasAttribute('post-id-edit')) {
//     const id = event.target.getAttribute('post-id-edit');

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'PUT',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to edit post');
//     }
//   }
// };

// Handler for deleting a post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('post-id')) {
    // Collect post id from the attribute
    const id = event.target.getAttribute('post-id');

    // Send a DELETE request to remove the post
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    // If the request is successful, redirect to the profile page
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

// Add event listener for new comment submission
if (document.querySelector('#postComment')) {
  document.querySelector('#postComment').addEventListener('click', newCommentHandler);
}

// Add event listener for new post submission
if (document.querySelector('.new-post-form')) {
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
}

// Event listener for delete button clicks
// Had to rewrite this as original querySelector was not locating the post to be deleted
document.addEventListener('click', function(event) {
  if (event.target && event.target.matches("button[post-id]")) {
    delButtonHandler(event);
  }
});


