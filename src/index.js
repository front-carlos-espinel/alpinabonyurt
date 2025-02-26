import './scss/main.scss';



const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  speed: 1000
});


// Referencias a elementos del DOM
const cameraButton = document.getElementById('cameraButton');
const cameraInput = document.getElementById('cameraInput');
const previewImage = document.getElementById('previewImage');
const uploadButton = document.getElementById('uploadButton');
const status = document.getElementById('status');

// Variable para almacenar la foto como Blob
let photoBlob = null;

// Evento de click para el botón de la cámara
cameraButton.addEventListener('click', function() {
  cameraInput.click();
});

// Evento cuando se selecciona una foto
cameraInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const imageUrl = URL.createObjectURL(file);
    photoBlob = file;
    
    // Mostrar vista previa
    previewImage.src = imageUrl;
    previewImage.style.display = 'block';
    uploadButton.style.display = 'block';
    status.textContent = 'Foto capturada';
  }
});

// Evento de click para enviar la foto
uploadButton.addEventListener('click', async function() {
  if (!photoBlob) {
    status.textContent = 'No hay foto para enviar';
    return;
  }
    
  try {
    status.textContent = 'Enviando...';
    
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('photo', photoBlob);
    
    // Reemplaza 'https://tu-endpoint.com/upload' con tu endpoint real
    const response = await fetch('https://tu-endpoint.com/upload', {
        method: 'POST',
        body: formData
    });
    
    if (response.ok) {
        status.textContent = '¡Foto enviada con éxito!';
    } else {
        throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    console.error('Error al enviar la foto:', error);
    status.textContent = 'Error al enviar la foto';
  }
});