document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('feedbackForm');
    const responseMessage = document.getElementById('responseMessage');

    loadFormData();

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'block';
        history.pushState({popupOpen: true}, '', '?popup=1');
    });

    closeBtn.addEventListener('click', closePopup);

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.popupOpen) {
            closePopup();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formcarry.com/s/s-D8GiRd9p3', {  
                method: 'POST',
                body: formData
            });

            if (response) {
                responseMessage.innerText = 'Форма успешно отправлена!';
                clearFormData();
                form.reset();
            } else {
                responseMessage.innerText = 'Ошибка отправки формы.';
            }
        } catch (error) {
            responseMessage.innerText = 'Ошибка отправки формы.';
        }
    });

    function closePopup() {
        popup.style.display = 'none';
        history.pushState(null, '', window.location.pathname); 
    }

    function loadFormData() {
        document.getElementById('fullname').value = localStorage.getItem('fullname') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';
        document.getElementById('organization').value = localStorage.getItem('organization') || '';
        document.getElementById('message').value = localStorage.getItem('message') || '';
    }

    function clearFormData() {
        localStorage.removeItem('fullname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('organization');
        localStorage.removeItem('message');
    }

    form.addEventListener('input', () => {
        localStorage.setItem('fullname', document.getElementById('fullname').value);
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('phone', document.getElementById('phone').value);
        localStorage.setItem('organization', document.getElementById('organization').value);
        localStorage.setItem('message', document.getElementById('message').value);
    });
});