// 1. Esperar a que el HTML de la página esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    obtenerPijamas();
});

// 2. Función para pedir los datos a nuestro "puente" Node.js
async function obtenerPijamas() {
    try {
        // Hacemos la petición a la ruta de la API que creamos en el servidor
        const respuesta = await fetch('/api/pijamas');
        
        // Convertimos la respuesta cruda en un formato JSON legible (una lista de objetos)
        const pijamas = await respuesta.json();
        
        // Enviamos esa lista a la función encargada de pintarlas en pantalla
        renderizarCatalogo(pijamas);
    } catch (error) {
        console.error('Error al obtener los productos del catálogo:', error);
    }
}

// 3. Función para crear las tarjetas elegantes dinámicamente
function renderizarCatalogo(listaDePijamas) {
    const contenedor = document.getElementById('catalogo-pijamas');
    
    // Limpiamos el contenedor por seguridad
    contenedor.innerHTML = '';

    // Si no hay productos, mostramos un mensaje sutil
    if (listaDePijamas.length === 0) {
        contenedor.innerHTML = '<p class="mensaje-vacio">No hay pijamas disponibles por el momento.</p>';
        return;
    }

    // Recorremos cada pijama que vino de la base de datos
    listaDePijamas.forEach(pijama => {
        // Creamos la estructura HTML de una tarjeta limpia y minimalista
        const tarjetaHtml = `
            <article class="tarjeta-pijama">
                <div class="contenedor-imagen">
                    <img src="${pijama.imagen}" alt="${pijama.descripcion}" loading="lazy">
                </div>
                <div class="info-pijama">
                    <h3 class="descripcion">${pijama.descripcion}</h3>                     <p class="precio">$${Number(pijama.precio).toLocaleString('es-CO')}</p>
                    
                </div>
            </article>
        `;
        
        // Agregamos la tarjeta al contenedor principal sin borrar las anteriores
        contenedor.innerHTML += tarjetaHtml;
    });
}