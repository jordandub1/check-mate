const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#pwd').value.trim();

  //Adds name, email, password to JSON
  if (name && email && password) {
    const response = await fetch(`/api/users/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add user');
    }
    console.log(name, email, password);
  }
};

document
  .querySelector('.new-user-form')
  .addEventListener('submit', newFormHandler);
