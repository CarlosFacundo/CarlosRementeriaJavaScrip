const tarifas = {
    basico: 25000,
    intermedio: 40000,
    completo: 75000
    };
    function calcularCostoSeguro(edadConductor, tipoCobertura) {
    let costoBase = tarifas[tipoCobertura];
    if (edadConductor < 30) {
        costoBase *= 1.2;
    }
    return costoBase;
    }

    let precioTotal = 0;
    let cotizando = true;

    while (cotizando) {
    const edadConductor = prompt("Por favor, ingrese su edad:");
    const tipoCoberturaSeleccionado = prompt("Elija el tipo de cobertura (basico, intermedio o completo):");
    const edadConductorNumero = parseInt(edadConductor);
    if (!isNaN(edadConductorNumero) && tarifas[tipoCoberturaSeleccionado]) {
    const costoSeguro = calcularCostoSeguro(edadConductorNumero, tipoCoberturaSeleccionado);
    alert(`El costo del seguro es: $${costoSeguro}`);
    precioTotal += costoSeguro;
    } else {
    alert("Edad ingresada no válida o tipo de cobertura incorrecto. Por favor, ingrese valores válidos.");
    }
    const continuar = prompt("¿Desea cotizar otro seguro? (Sí/No)").toLowerCase();
    if (continuar !== "si" && continuar !== "sí") {
    cotizando = false;
    }
    }

    alert(`El precio total de los seguros cotizados es: $${precioTotal}`);

