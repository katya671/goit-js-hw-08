import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedFormData) {
  emailInput.value = savedFormData.email;
  messageInput.value = savedFormData.message;
}

function onInput() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

form.addEventListener('input', throttle(onInput, 500));

function onSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (!emailValue || !messageValue) {
    return;
  }

  const formData = {
    email: emailValue,
    message: messageValue,
  };

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  emailInput.value = '';
  messageInput.value = '';
}

form.addEventListener('submit', onSubmit);
