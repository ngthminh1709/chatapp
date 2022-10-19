const { default: axios } = require("axios");

const email = $('.email-input').val();
const password = $('.password-input').val();
const username = $('.username-input').val();
const responseMessage = $('.response-message');
const form = $('.we-form');

const handleSubmit = (e) => {
    e.preventDefault();
    axios({
        url: 'https://localhost:3000/auth/register',
        method: 'POST',
        data: {
            email, password, username
        }
    }).then(()=> {
        window.location.path = '/auth/login';
    }).catch(err=> {
        console.log(err);
        responseMessage.innerText = err.data
    });
};

form.on('submit',)