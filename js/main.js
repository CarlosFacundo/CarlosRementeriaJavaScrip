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

let precioTotal = 0;
let cotizando = true;

document.addEventListener('DOMContentLoaded', function() {
    const savedAge = localStorage.getItem('savedAge');
    if (savedAge) {
        document.getElementById('edadConductor').value = savedAge;
    }
});

document.getElementById('cotizarBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const edadConductor = parseInt(document.getElementById('edadConductor').value);
    const tipoCoberturaSeleccionado = document.getElementById('tipoCobertura').value;
    const tipoSeguroSeleccionado = document.getElementById('tipoSeguro').value;

    if (!isNaN(edadConductor) && tarifas[tipoCoberturaSeleccionado] && tarifas[tipoCoberturaSeleccionado][tipoSeguroSeleccionado]) {
        const costoSeguro = calcularCostoSeguro(edadConductor, tipoCoberturaSeleccionado, tipoSeguroSeleccionado);

        if (tipoCoberturaSeleccionado === 'completo' && edadConductor < 30) {
            const aumentoPorEdad = costoSeguro * 0.2;
            const costoConAumento = costoSeguro + aumentoPorEdad;
            const continuar = confirm(`El costo del seguro es: $${costoConAumento}. ¿Desea cotizar otro seguro?`);
            if (!continuar) {
                cotizando = false;
                precioTotal += costoConAumento;
                alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
                localStorage.setItem('savedAge', edadConductor);
                precioTotal = 0;
            } else {
                precioTotal += costoConAumento;
                localStorage.setItem('savedAge', edadConductor);
            }
        } else {
            const continuar = confirm(`El costo del seguro es: $${costoSeguro}. ¿Desea cotizar otro seguro?`);
            if (!continuar) {
                cotizando = false;
                precioTotal += costoSeguro;
                alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
                localStorage.setItem('savedAge', edadConductor);
                precioTotal = 0;
            } else {
                precioTotal += costoSeguro;
                localStorage.setItem('savedAge', edadConductor);
            }
        }
    } else {
        alert("Edad ingresada no válida o tipo de cobertura incorrecto. Por favor, ingrese valores válidos.");
    }

    if (!cotizando) {
        alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
    }
});

function calcularCostoSeguro(edadConductor, tipoCobertura, tipoSeguro) {
    let costoBase = tarifas[tipoCobertura][tipoSeguro];
    return costoBase;
}
