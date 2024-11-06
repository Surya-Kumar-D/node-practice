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

<<<<<<< HEAD
document?.querySelector('.form--login')?.addEventListener('submit', (e) => {
=======
document.querySelector('.form--login').addEventListener('submit', (e) => {
>>>>>>> 7b3286730bbb7433d96731b1ca9953e7f051c712
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

<<<<<<< HEAD
const logOutBtn = document?.querySelector('.nav__el--logout');

=======
const logOutBtn = document.querySelector('.nav__el--logout');
console.log(logOutBtn);
>>>>>>> 7b3286730bbb7433d96731b1ca9953e7f051c712
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

//UpdateSettings
<<<<<<< HEAD
//type is either 'password' or 'data'
const updateSettings = async ({ data }, type) => {
  const url =
    type === 'password'
      ? 'http://localhost:8000/api/v1/users/updateMyPassword'
      : 'http://localhost:8000/api/v1/users/updateMe';
  try {
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type?.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

const userDataForm = document?.querySelector('.form-user-data');

console.log(userDataForm);
=======

const updateSettings = async (email, name) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:8000/api/v1/users/updateMe',
      data: {
        name,
        email,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully');
    }
  } catch (err) {
    console.log(err);
  }
};

const userDataForm = document.querySelector('.form-user-data');
>>>>>>> 7b3286730bbb7433d96731b1ca9953e7f051c712

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
<<<<<<< HEAD
    updateSettings({ email, name }, 'data');
  });
}

const userPasswordForm = document.querySelector('.form-user-settings');

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').innerHTML =
      'Updating Password...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;

    const passwordConfirm = document.getElementById('password-confirm').value;
    updateSettings({ passwordConfirm, passwordCurrent, password }, 'password');

    document.querySelector('.btn--save-password').innerHTML = 'Save Passwords';
=======
    updateSettings(email, name);
>>>>>>> 7b3286730bbb7433d96731b1ca9953e7f051c712
  });
}
