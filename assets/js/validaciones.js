export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("form-control-plaintext--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("form-control-plaintext--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
            mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números",
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 5 a 40 caracteres.",
    },
    reCaptcha: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 5 a 40 caracteres.",
    },
};
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}