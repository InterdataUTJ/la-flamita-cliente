export default async function eliminar(id, token = null) {
  if (!token) {
    const element = document.querySelector('input[name="_token"]');
    if (element) token = element.value;
    else return createToast("No se pudo quitar el producto del carrito");
  }
  
  try {
    const resultado = await fetch("/carrito/eliminar", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': token
      },
    });

    if (resultado.ok) {
      document.querySelector(`section#producto_carrito_container_${id}`)?.remove();
      createToast("Producto eliminado del carrito");
      const resumen = await resultado.json();
      document.querySelector("dd#carrito_resumen_subtotal").textContent = `$${resumen.subtotal} MXN`;
      document.querySelector("dd#carrito_resumen_descuento").textContent = `-$${resumen.descuento} MXN`;
      document.querySelector("dd#carrito_resumen_total").textContent = `$${resumen.total} MXN`;
    } else {
      createToast("No se pudo eliminar el producto del carrito");
    }
  } catch (error) { 
    console.error(error);
  }
}