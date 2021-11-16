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

async function newIncomeHandler(event) {

  event.preventDefault();
  
  const user_id = (document.querySelector('#transaction-modal')).getAttribute("userInfo");
  const tran_name = document.querySelector('#trx_name').value;
  const tran_date = document.querySelector('#trx_date').value;
  const amount = 2000;
  const category = document.querySelector('#trx_category').value;
  const is_expense = true;
  const is_recurring = true;
  const recur_date = document.querySelector('#recurring-date').value;
  const notes = document.querySelector('#notes').value;


  const response = await fetch('/api/transaction', {
      method: 'POST',
      body: JSON.stringify({
          
          user_id,
          tran_name,
          tran_date,
          amount,
          category,
          is_expense,
          is_recurring,
          recur_date,
          notes,

      }),
      headers: {
          'Content-Type': 'application/json'
      },
  });

  if (response.ok) {
      document.location.replace('/');
  } else {
      alert('Failed to update income/expense')
  }

}


document.querySelector('#transaction-form').addEventListener('submit', newIncomeHandler);