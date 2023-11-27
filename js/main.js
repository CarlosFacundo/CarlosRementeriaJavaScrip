const tarifas = {
    basico: {
        auto: 25000,
        moto: 18000,
        casa: 35000
    },
    intermedio: {
        auto: 40000,
        moto: 30000,
        casa: 50000
    },
    completo: {
        auto: 75000,
        moto: 60000,
        casa: 100000
    }
};

function calcularCostoSeguro(edadConductor, tipoCobertura, tipoSeguro) {
    let costoBase = tarifas[tipoCobertura][tipoSeguro];
    if (tipoCobertura === 'completo' && edadConductor < 30) {
        costoBase *= 1.2; // Aplicar el aumento del 20% para el seguro completo y edad < 30
    }
    return costoBase;
}

let precioTotal = 0;
let cotizando = true;

document.getElementById('cotizarBtn').addEventListener('click', function(event) {
    event.preventDefault();
    
    const edadConductor = parseInt(document.getElementById('edadConductor').value);
    const tipoCoberturaSeleccionado = document.getElementById('tipoCobertura').value;
    const tipoSeguroSeleccionado = document.getElementById('tipoSeguro').value;
    
    if (!isNaN(edadConductor) && tarifas[tipoCoberturaSeleccionado] && tarifas[tipoCoberturaSeleccionado][tipoSeguroSeleccionado]) {
        const costoSeguro = calcularCostoSeguro(edadConductor, tipoCoberturaSeleccionado, tipoSeguroSeleccionado);
        alert(`El costo del seguro es: $${costoSeguro}`);
        precioTotal += costoSeguro;
        alert(`El costo total de los seguros cotizados es: $${precioTotal}`);

        // Preguntarle al usuario si quiere seguir cotizando
        const continuar = prompt("¿Desea cotizar otro seguro? (Sí/No)").toLowerCase();
        if (continuar !== "si" && continuar !== "sí") {
            cotizando = false;
        }
    } else {
        alert("Edad ingresada no válida o tipo de cobertura incorrecto. Por favor, ingrese valores válidos.");
    }
    if (!cotizando) {
        alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
    }
});
