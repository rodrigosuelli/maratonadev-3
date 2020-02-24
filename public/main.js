const btnElement = document.querySelector('button.btn');
const formElement = document.querySelector('.form');

btnElement.addEventListener('click', () => {
    // Add active effect
    btnElement.classList.add('active');
    setTimeout(() => btnElement.classList.remove('active'), 600);

    formElement.classList.toggle('hide');
  });