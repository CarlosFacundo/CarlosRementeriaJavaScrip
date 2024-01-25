const tarifas = {
    basico: {
        auto: {
            '2013-2015': 30000,
            '2016-2022': 35000,
            '2023-2024': 40000,
        },
        moto: {
            '2013-2015': 12000,
            '2016-2022': 20000,
            '2023-2024': 25000,
        },
        casa: 35000
    },
    intermedio: {
        auto: {
            '2013-2015': 45000,
            '2016-2022': 50000,
            '2023-2024': 55000,
        },
        moto: {
            '2013-2015': 15000,
            '2016-2022': 25000,
            '2023-2024': 30000,
        },
        casa: 50000
    },
    completo: {
        auto: {
            '2013-2015': 60000,
            '2016-2022': 65000,
            '2023-2024': 70000,
        },
        moto: {
            '2013-2015': 18000,
            '2016-2022': 30000,
            '2023-2024': 35000,
        },
        casa: 100000
    }
};

let precioTotal = 0;
let cotizando = true;

document.addEventListener('DOMContentLoaded', function () {
    const savedAge = localStorage.getItem('savedAge');
    if (savedAge) {
        document.getElementById('edadConductor').value = savedAge;
    }
});

document.getElementById('cotizarBtn').addEventListener('click', function (event) {
    event.preventDefault();

    const edadConductor = parseInt(document.getElementById('edadConductor').value);
    const tipoCoberturaSeleccionado = document.getElementById('tipoCobertura').value;
    const tipoSeguroSeleccionado = document.getElementById('tipoSeguro').value;
    const añoAuto = obtenerAñoSeleccionado();

    if (!isNaN(edadConductor) && tarifas[tipoCoberturaSeleccionado] && tarifas[tipoCoberturaSeleccionado][tipoSeguroSeleccionado]) {
        const costoSeguro = calcularCostoSeguro(edadConductor, tipoCoberturaSeleccionado, tipoSeguroSeleccionado, añoAuto);

        if (tipoCoberturaSeleccionado === 'completo' && edadConductor < 30) {
            const aumentoPorEdad = costoSeguro * 0.2;
            const costoConAumentoEdad = costoSeguro + aumentoPorEdad;
            const diferenciaMenor30 = 2000;
            const costoConDiferencia = costoConAumentoEdad + diferenciaMenor30;

            const continuar = confirm(`El costo del seguro es: $${costoConDiferencia}. ¿Desea cotizar otro seguro?`);
            if (!continuar) {
                cotizando = false;
                precioTotal += costoConDiferencia;
                alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
                localStorage.setItem('savedAge', edadConductor);
            } else {
                precioTotal += costoConDiferencia;
                localStorage.setItem('savedAge', edadConductor);
            }
        } else {
            const continuar = confirm(`El costo del seguro es: $${costoSeguro}. ¿Desea cotizar otro seguro?`);
            if (!continuar) {
                cotizando = false;
                precioTotal += costoSeguro;
                alert(`El costo total de todos los seguros cotizados es: $${precioTotal}`);
                localStorage.setItem('savedAge', edadConductor);
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

function calcularCostoSeguro(edadConductor, tipoCobertura, tipoSeguro, añoAuto) {
    const rangoAño = obtenerRangoAño(añoAuto);
    let costoBase = tarifas[tipoCobertura][tipoSeguro][rangoAño] || 0;

    if (edadConductor < 30) {
        costoBase += 2000;
    }

    return costoBase;
}

function obtenerRangoAño(año) {
    if (año >= 2013 && año <= 2015) {
        return '2013-2015';
    } else if (año >= 2016 && año <= 2022) {
        return '2016-2022';
    } else if (año >= 2023 && año <= 2024) {
        return '2023-2024';
    } else {
        return 'Otro';
    }
}

function obtenerAñoSeleccionado() {
    const opcionesAño = document.getElementsByName('añoAuto');
    let añoSeleccionado = '';

    opcionesAño.forEach(opcion => {
        if (opcion.checked) {
            añoSeleccionado = opcion.value;
        }
    });

    return añoSeleccionado;
}
