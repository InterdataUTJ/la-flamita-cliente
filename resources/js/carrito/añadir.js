export default async function add(boton, id, token = null) {

  if (boton.classList.contains("in-progress")) return;
  boton.classList.add("in-progress");
  
  if (!token) {
    const element = document.querySelector('input[name="_token"]');
    if (element) token = element.value;
    else return createToast("No se pudo añadir el producto al carrito");
  }

  const cantidadElement = document.querySelector(`input#add_carrito_producto_${id}`);
  if (!cantidadElement) return createToast("No se pudo añadir el producto al carrito");
  const cantidad = cantidadElement.value;

  boton.classList.add("animate-success");
  setTimeout(() => boton.classList.remove("animate-success"), 450);
  
  try {
    const resultado = await fetch("/carrito/add", {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ id, cantidad }),
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-Token': token
      },
    });

    if (resultado.ok) {
      const { cantidad } = await resultado.json();
      if (document.querySelector("span#carrito-numero") != undefined)
        document.querySelector("span#carrito-numero").textContent = cantidad;
      cantidadElement.value = 1;
    } else {
      createToast("No se pudo añadir el producto al carrito");
    }

    boton.classList.remove("in-progress");
  } catch (error) { 
    console.error(error);
  }
}