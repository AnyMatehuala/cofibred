export const bebidas = [
    {nombre: "Café americano", precio: 10, imagen: "assets/americano.jpg"},
    {nombre: "Café capuchino", precio: 15, imagen: "assets/capuchino.jpg"},
    {nombre: "Matcha latte", precio: 25, imagen: "assets/matcha.jpg"},
    {nombre: "Affogato", precio: 30, imagen: "assets/afogatto.jpg"},
    {nombre: "Tisana floral", precio: 20, imagen: "assets/tisana.jpg"}
];

export const leches = [
    {nombre: "Leche entera", precio: 0},
    {nombre: "Leche deslactosada", precio: 5},
    {nombre: "Leche de avena", precio: 10},
    {nombre: "Sin leche", precio: 0}
];

export function guardarPedido(pedido) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

export function calcularTotalPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    let total = 0;
    for (let i = 0; i < pedidos.length; i++) {
        total += pedidos[i].total;
    }
    return total;
}
