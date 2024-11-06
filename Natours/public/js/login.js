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

document?.querySelector('.form--login')?.addEventListener('submit', (e) => {
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

const logOutBtn = document?.querySelector('.nav__el--logout');

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

//UpdateSettings
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

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
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
  });
}
