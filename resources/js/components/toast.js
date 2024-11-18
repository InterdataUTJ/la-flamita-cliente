function createToast(msg) {
  // Crear el contenedor del toast
  const toastDiv = document.createElement('div');
  toastDiv.className = "flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow";
  toastDiv.setAttribute('role', 'alert');

  // Crear el contenedor del icono
  const iconDiv = document.createElement('div');
  iconDiv.className = "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg";

  // Crear el elemento de imagen
  const img = document.createElement('img');
  img.className = "w-5 h-5";
  img.src = "/images/logo.svg"; // Asegúrate de que esta ruta sea correcta
  img.alt = "F";

  // Agregar la imagen al contenedor del icono
  iconDiv.appendChild(img);

  // Crear el div del mensaje de error
  const messageDiv = document.createElement('div');
  messageDiv.className = "ms-3 text-sm font-normal";
  messageDiv.textContent = msg;

  // Crear el botón de cerrar
  const closeButton = document.createElement('button');
  closeButton.type = "button";
  closeButton.className = "ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8";
  closeButton.setAttribute('aria-label', 'Close');

  // Agregar el icono de cerrar al botón
  const closeIcon = document.createElement('i');
  closeIcon.className = "fa-solid fa-xmark";
  closeButton.appendChild(closeIcon);

  // Agregar todos los elementos al contenedor principal
  toastDiv.appendChild(iconDiv);
  toastDiv.appendChild(messageDiv);
  toastDiv.appendChild(closeButton);

  closeButton.addEventListener('click', () => {
    toastDiv.remove();
  });

  // Agregar el toast al body o a un contenedor específico
  document.getElementById("toast-container").appendChild(toastDiv);
}

window.createToast = createToast;