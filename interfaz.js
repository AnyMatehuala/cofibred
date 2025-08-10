import { bebidas, leches, guardarPedido, calcularTotalPedidos } from './logica.js';

let bebidaSeleccionada = null;
let lecheSeleccionada = null;

function renderOpciones(idDiv, opciones, tipo) {
    const contenedor = document.getElementById(idDiv);
    contenedor.innerHTML = opciones.map((opcion, index) => {
        return `
            <button class="opcion" data-tipo="${tipo}" data-indice="${index}">
                ${tipo === "bebida" ? `<img src="${opcion.imagen}" alt="${opcion.nombre}" class="imagen-bebida">` : ""}
                <div class="info-bebida">
                    <h3>${opcion.nombre}</h3>
                    <p>$${opcion.precio}</p>
                </div>
            </button>
        `;
    }).join("");
}

function manejarSeleccion(e) {
    const boton = e.target.closest("button.opcion");
    if (!boton) return;

    const tipo = boton.dataset.tipo;
    const indice = parseInt(boton.dataset.indice);

    const botones = boton.parentElement.querySelectorAll("button");
    botones.forEach(btn => btn.classList.remove("boton-activo"));
    boton.classList.add("boton-activo");

    if (tipo === "bebida") {
        bebidaSeleccionada = indice;
        const bebida = bebidas[bebidaSeleccionada].nombre;
        const menuLeche = document.getElementById("menuLeche");
        const mensajeLeche = document.getElementById("mensajeLeche");

        if (bebida === "Café capuchino" || bebida === "Matcha latte") {
            menuLeche.style.display = "block";
            mensajeLeche.style.display = "block";
        } else {
            menuLeche.style.display = "none";
            mensajeLeche.style.display = "none";
            lecheSeleccionada = null;
        }
    }

    if (tipo === "leche") {
        lecheSeleccionada = indice;
    }

    mostrarResultado();
}

function mostrarResultado() {
    if (bebidaSeleccionada === null) return;

    const nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    if (nombreUsuario === "") return;

    const bebida = bebidas[bebidaSeleccionada];
    const leche = lecheSeleccionada !== null ? leches[lecheSeleccionada] : { nombre: "sin leche", precio: 0 };
    const cuentaTotal = bebida.precio + leche.precio;

    document.getElementById("resultado").innerHTML =
        `Gracias por tu pedido ${nombreUsuario}.<br>
        Elegiste ${bebida.nombre} y ${leche.nombre}.<br>
        El total de tu cuenta es de: $${cuentaTotal}.`;

    const pedido = {
        nombre: nombreUsuario,
        bebida,
        leche,
        total: cuentaTotal,
        fecha: new Date().toLocaleString()
    };

    guardarPedido(pedido);
    mostrarHistorial();
}

function mostrarHistorial() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const contenedor = document.getElementById("historialPedidos");
    contenedor.innerHTML = pedidos.map(p => `
        <div class="pedido">
            <strong>${p.nombre}</strong>: pidió ${p.bebida.nombre} con ${p.leche.nombre} - Total: $${p.total}
            <small>${p.fecha}</small>
        </div>
    `).join("");
}

function nuevoPedido() {
    bebidaSeleccionada = null;
    lecheSeleccionada = null;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("nombreUsuario").value = "";
    document.querySelectorAll(".boton-activo").forEach(btn => btn.classList.remove("boton-activo"));
}

document.getElementById("iniciarPedidoBtn").addEventListener("click", () => {
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("contenidoPedido").style.display = "block";
    document.getElementById("mensajeLeche").style.display = "none";
});

renderOpciones("menuBebidas", bebidas, "bebida");
renderOpciones("menuLeche", leches, "leche");

document.getElementById("volverInicioBtn").addEventListener("click", () => {
    document.getElementById("contenidoPedido").style.display = "none";
    document.getElementById("pantallaInicio").style.display = "block";
});

document.getElementById("menuBebidas").addEventListener("click", manejarSeleccion);
document.getElementById("menuLeche").addEventListener("click", manejarSeleccion);
document.getElementById("nuevoPedidoBtn").addEventListener("click", nuevoPedido);

document.getElementById("mostrarHistorialBtn").addEventListener("click", () => {
    const contenedor = document.getElementById("historialPedidos");
    if (contenedor.style.display === "none") {
        mostrarHistorial();
        contenedor.style.display = "block";
        document.getElementById("mostrarHistorialBtn").textContent = "Ocultar historial";
    } else {
        contenedor.style.display = "none";
        document.getElementById("mostrarHistorialBtn").textContent = "Mostrar historial de pedidos";
    }
});

document.getElementById("borrarHistorialBtn").addEventListener("click", () => {
    localStorage.removeItem("pedidos");
    document.getElementById("historialPedidos").innerHTML = "";
    document.getElementById("historialPedidos").style.display = "none";
    document.getElementById("mostrarHistorialBtn").textContent = "Mostrar historial de pedidos";
});

document.getElementById("calcularTotalBtn").addEventListener("click", () => {
    const total = calcularTotalPedidos();
    document.getElementById("totalAcumulado").textContent = `El total de todos los pedidos es: $${total}`;
});

mostrarHistorial();