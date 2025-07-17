// Arrays de café y tipos de leche

let bebidas = ["Café americano", "Café capuchino", "Matcha latte", "Té herbal", "Tisana frutal"];
let preciosBebidas = [10, 15, 25, 15, 20];

let leche = ["Leche entera", "Leche deslactosada", "Leche de avena", "Sin leche"];
let preciosLeche = [0, 5, 10, 0];

let bebidaSeleccionada = null;
let lecheSeleccionada = null;

// Menú
function mostrarOpciones(idDiv, opciones, precios, callback){
    const contenedor = document.getElementById(idDiv);
    contenedor.innerHTML = "";
    opciones.forEach(function(opcion, index) {
        const button = document.createElement("button");
        button.textContent = opcion + " ($" + precios[index] + ")";
        button.onclick = function() {
            const botones = contenedor.querySelectorAll("button");
            botones.forEach(b => b.classList.remove("boton-activo"));
            button.classList.add("boton-activo");
            callback(index);
        }
        contenedor.appendChild(button);
    });
}

window.onload = () => {
    mostrarOpciones("menuBebidas", bebidas, preciosBebidas, elegirBebida);
    mostrarOpciones("menuLeche", leche, preciosLeche, elegirLeche);
};

// Elegir bebida y leche
function elegirBebida(indice){
    bebidaSeleccionada = indice;
    mostrarResultado();
}

function elegirLeche(indice){
    lecheSeleccionada = indice;
    mostrarResultado();
}

// Elecciones del usuario y el total de la cuenta
function mostrarResultado(){
    if (bebidaSeleccionada !== null && lecheSeleccionada !== null) {
    let nombreBebida = bebidas[bebidaSeleccionada];
    let precioBebida = preciosBebidas[bebidaSeleccionada];
    let nombreLeche = leche[lecheSeleccionada];
    let precioLeche = preciosLeche[lecheSeleccionada];
    let nombreUsuario = document.getElementById("nombreUsuario").value.trim();
    let cuentaTotal = precioBebida + precioLeche;

    document.getElementById("resultado").innerHTML = 
    "Gracias por tu pedido " + nombreUsuario + ".<br>" + 
    "Elegiste " + nombreBebida + " y " + nombreLeche + ".<br>" +
    "El total de tu cuenta es de: $" + cuentaTotal + ".";

    guardarPedido( {
        nombre: nombreUsuario,
        bebida: nombreBebida,
        precioBebida: precioBebida,
        leche: nombreLeche,
        precioLeche: nombreLeche !== "Sin leche" ? precioLeche : 0,
        total: cuentaTotal
    });
    }
}

//Guardar pedidos
function guardarPedido(pedido) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function nuevoPedido() {
    bebidaSeleccionada = null;
    lecheSeleccionada = null;
    document.getElementById("resultado").innerHTML = "";
}

// let continuar = true;
// while (continuar) {
//     let bebidaElegida = mostrarMenu("Elige la bebida de tu preferencia:", bebidas, preciosBebidas);
//     let nombreBebida = nombre(bebidas, bebidaElegida);
//     let precioBebida = precio(preciosBebidas, bebidaElegida);
//     alert("Has elegido " + nombreBebida + " el costo es: $" + precioBebida);

//     let LecheElegida = mostrarMenu("Elige la leche de tu preferencia:", leche, preciosLeche);
//     let nombreLeche = nombre(leche, LecheElegida);
//     let precioLeche = precio(preciosLeche, LecheElegida);
//     alert("Has elegido " + nombreLeche + " el costo extra de la leche es: $" + precioLeche);

//     let cuentaTotal = precioBebida + precioLeche;
//     alert("El total de tu cuenta es: $" + cuentaTotal);

//     let otroPedido = prompt("¿Deseas realizar otro pedido? (si/no)");
//     if (otroPedido !== "si"){
//         continuar = false;
//         alert("Gracias! Te esperamos muy pronto!");
//     }
// }

// let bebidaUsuario = prompt("Elige la bebida de tu preferencia:\n 1. Café americano\n 2. Café capuchino\n 3. Matcha latte\n 4. Té herbal\n 5. Tisana frutal");
// cuentaTotal = 0

// if (bebidaUsuario == 1){
//     cuentaTotal = 10
//     alert("Has elegido Café americano");
// }
// else if (bebidaUsuario == 2){
//     cuentaTotal = 15
//     alert("Has elegido Café capuchino");
// }
// else if (bebidaUsuario == 3){
//     cuentaTotal = 25
//     alert("Has elegido Matcha latte");
// }
// else if (bebidaUsuario == 4){
//     cuentaTotal = 15
//     alert("Has elegido Té herbal");
// }
// else if (bebidaUsuario == 5){
//     cuentaTotal = 20
//     alert("Has elegido Tisana frutal");
// }
// else{
//     alert("Opción inválida")
// }

// let lecheUsuario = prompt("Elige la leche de tu preferencia:\n 1. Leche entera \n 2. Leche deslactosada \n 3. Leche de avena \n 4. Sin leche");
// if (lecheUsuario == 1){
//     cuentaTotal += 0
//     alert("Has elegido leche entera");
// }
// else if (lecheUsuario == 2){
//     cuentaTotal += 5
//     alert("Has elegido leche deslactosada");
// }
// else if (lecheUsuario == 3){
//     cuentaTotal += 10
//     alert("Has elegido leche de avena");
// }
// else if (lecheUsuario == 4){
//     cuentaTotal += 0
//     alert("No has elegido ningún tipo de leche para tu bebida")
// }
// else{
//     alert("Opción inválida")
// }