export function onMouse(imagen) {
  const main = document.getElementById('producto_imagen_main');
  const newImagen = imagen.src;
  if (main.src !== newImagen) main.src = newImagen;
}