const $ = document.querySelector.bind(document);

const email = $('.email-input');
const password = $('.password-input');
const username = $('.username-input');
const responseMessage = $('.response-message');
const form = $('.we-form');

const handleSubmit = (e) => {
  e.preventDefault();
  axios({
    url: 'http://localhost:3000/auth/register',
    method: 'POST',
    data: {
      email: email.value,
      password: password.value,
      username: username.value,
    },
  })
    .then(() => {
      window.location.replace('http://localhost:3000/auth/register');
    })
    .catch((err) => {
      console.log(err);
      responseMessage.innerText = err.response.data.message;
    });
};

form.addEventListener('submit', handleSubmit);
