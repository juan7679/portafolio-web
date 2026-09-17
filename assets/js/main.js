// Manejo del formulario de contacto: envío por fetch a Netlify + modal de confirmación
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  if (!form || !modalOverlay) return;

  function openModal(){
    modalOverlay.classList.add('is-visible');
  }

  function closeModal(){
    modalOverlay.classList.remove('is-visible');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then(() => {
        form.reset();
        openModal();
      })
      .catch((error) => {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un problema al enviar tu mensaje. Intenta de nuevo o escríbeme directo por correo.');
      });
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});