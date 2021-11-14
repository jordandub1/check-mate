const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

const newFormHandler = async (event) => {
  // handle project form submission

  event.preventDefault();

  const total_income = document.querySelector('#total_income').value;
  const total_remain = document.querySelector('#total_remain').value;

  const response = await fetch(`/api/budget`, {
    method: 'PUT',
    body: JSON.stringify({
      total_income,
      total_remain,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to update budget');
  }
};

// document
//   .querySelector('.new-budget-form')
//   .addEventListener('submit', newFormHandler);

document.querySelector('#logout').addEventListener('click', logout);
