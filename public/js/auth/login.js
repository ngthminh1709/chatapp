const $ = document.querySelector.bind(document);

const email = $('.email-input');
const password = $('.password-input');
const responseMessage = $('.response-message');
const form = $('.we-form');

const handleSubmit = (e) => {
  e.preventDefault();
  axios({
    url: 'http://localhost:3000/auth/login',
    method: 'POST',
    data: {
      email: email.value,
      password: password.value,
    },
  })
    .then(() => {
      window.location.replace('http://localhost:3000/');
    })
    .catch((err) => {
      console.log(err);
      responseMessage.innerText = err.response.data.message;
    });
};

form.addEventListener('submit', handleSubmit);
