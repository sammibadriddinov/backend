window.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelectorAll('button'),
    modal = document.querySelector('.modal'),
    btnClose = document.querySelector('.modal__close');

  btn.forEach(item => {
    item.addEventListener('click', () => {
      modal.style.display = 'block'
    })
  })

  btnClose.addEventListener('click', () => {
    modal.style.display = 'none'
  })

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Loading...',
    success: 'Murojatingiz qabul qilindi',
    failure: 'Xatolik yuz berildi'
  }

  forms.forEach(item => {
    postData(item);
  })

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const obj = {};
      formData.forEach(function(value, key) {
        obj[key] = value
      })

      const json = JSON.stringify(obj);

      request.send(json);
      
      request.addEventListener('load', () => {
        if(request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        }else{
          statusMessage.textContent = message.failure;
        }
      })
    })
  }
})