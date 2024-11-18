const AWAIT_TIME_MS = 100;

export default async function editar(id, incrementar = true, token = null) {
  if (!token) {
    const element = document.querySelector('input[name="_token"]');
    if (element) token = element.value;
    else return createToast("No se pudo editar el producto del carrito 1");
  }

  const input = document.querySelector(`input#producto_carrito_${id}`);
  if (!input) return createToast("No se pudo editar el producto del carrito 2");
  

  if (incrementar) input.valueAsNumber += 1;
  else if (input.valueAsNumber <= 1) input.valueAsNumber = 1;
  else input.valueAsNumber -= 1;

  
  if (!input.classList.contains("cambiando")) {
    input.classList.add("cambiando");
    input.tiempoEspera = setTimeout(() => {
      actualizar(id, input.valueAsNumber, token);
    }, AWAIT_TIME_MS);

  } else {
    clearTimeout(input.tiempoEspera);
    input.tiempoEspera = setTimeout(() => {
      actualizar(id, input.valueAsNumber, token);
    }, AWAIT_TIME_MS);
  }
}


async function actualizar(id, cantidad, token) {
  try {
    const resultado = await fetch("/carrito/editar", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ id, cantidad }),
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': token
      },
    });

    if (!resultado.ok) {
      return createToast("No se pudo editar el producto del carrito");
    }
    
    const resumen = await resultado.json();
    document.querySelector("dd#carrito_resumen_subtotal").textContent = `$${resumen.subtotal} MXN`;
    document.querySelector("dd#carrito_resumen_descuento").textContent = `-$${resumen.descuento} MXN`;
    document.querySelector("dd#carrito_resumen_total").textContent = `$${resumen.total} MXN`;
  } catch (error) { 
    console.error(error);
    createToast("No se pudo editar el producto del carrito");
  }
}