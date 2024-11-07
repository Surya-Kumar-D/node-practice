const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;

  // Create a temporary element to hold the markup
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = markup; // Set the innerHTML to the markup

  // Insert the first child of tempDiv (the alert element) into the body
  document
    .querySelector('body')
    .insertAdjacentElement('afterbegin', tempDiv.firstChild);

  window.setTimeout(() => {
    hideAlert();
  }, 5000);
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Login successful!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

document.querySelector('.form--login')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.reload(true);
      console.log(location.href());
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};

const logOutBtn = document.querySelector('.nav__el--logout');
console.log(logOutBtn);
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

//UpdateSettings

const updateSettings = async (form) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/v1/users/updateMe',
      data: form,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully');
    }
  } catch (err) {
    console.log(err);
  }
};

const userDataForm = document.querySelector('.form-user-data');

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    console.log(form);
    updateSettings(form);
  });
}
