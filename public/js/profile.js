const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if ( title && body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  
  const postId = event.target.getAttribute('data-post-id');
  const commentText = document.querySelector('#comment').value.trim();

  if (commentText) {
    const response = await fetch(`/api/comments`, { 
      method: 'POST',
      body: JSON.stringify({ commentText, postId }), 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

if (document.querySelector('#postComment')) {
  document.querySelector('#postComment').addEventListener('click', newCommentHandler);
}


if (document.querySelector('.new-post-form')) {
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
}

document.addEventListener('click', function(event) {
  if (event.target && event.target.matches("button[post-id]")) {
    delButtonHandler(event);
  }
});

