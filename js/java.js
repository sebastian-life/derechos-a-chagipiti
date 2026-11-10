const formulario = document.getElementById("formulario");
const inputTitulo = document.getElementById("titulo");
const inputTipo = document.getElementById("tipo");
const inputFecha = document.getElementById("fecha");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const mensajeVacio = document.getElementById("mensajeVacio");
const botonesFiltro = document.querySelectorAll(".filtro");

let filtroActual = "todas";

function formatearFecha(fecha) {
    return fecha.split("-").reverse().join("/");
}

function crearActividad(titulo, tipo, fecha) {
    const li = document.createElement("li");
    li.classList.add("actividad");

    const info = document.createElement("div");

    const spanTitulo = document.createElement("span");
    spanTitulo.classList.add("titulo");
    spanTitulo.textContent = titulo;

    const spanDetalle = document.createElement("span");
    spanDetalle.classList.add("detalle");
    spanDetalle.textContent = tipo + " · " + formatearFecha(fecha);

    info.appendChild(spanTitulo);
    info.appendChild(spanDetalle);

    const acciones = document.createElement("div");
    acciones.classList.add("acciones");

    const botonCompletar = document.createElement("button");
    botonCompletar.classList.add("boton-completar");
    botonCompletar.textContent = "Completar";

    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("boton-eliminar");
    botonEliminar.textContent = "Eliminar";

    botonCompletar.addEventListener("click", function () {
        li.classList.toggle("completada");

        if (li.classList.contains("completada")) {
            botonCompletar.textContent = "Deshacer";
        } else {
            botonCompletar.textContent = "Completar";
        }

        actualizarLista();
    });

    botonEliminar.addEventListener("click", function () {
        li.remove();
        actualizarLista();
    });

    acciones.appendChild(botonCompletar);
    acciones.appendChild(botonEliminar);

    li.appendChild(info);
    li.appendChild(acciones);

    lista.appendChild(li);
}

function actualizarLista() {
    const actividades = lista.children;
    let visibles = 0;
    let pendientes = 0;

    for (let i = 0; i < actividades.length; i++) {
        const actividad = actividades[i];
        const estaCompletada = actividad.classList.contains("completada");

        if (!estaCompletada) {
            pendientes++;
        }

        let mostrar = true;

        if (filtroActual === "pendientes" && estaCompletada) {
            mostrar = false;
        }

        if (filtroActual === "completadas" && !estaCompletada) {
            mostrar = false;
        }

        if (mostrar) {
            actividad.classList.remove("oculta");
            visibles++;
        } else {
            actividad.classList.add("oculta");
        }
    }

    contador.textContent = pendientes + " pendientes";

    if (visibles === 0) {
        mensajeVacio.style.display = "block";
    } else {
        mensajeVacio.style.display = "none";
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = inputTitulo.value.trim();
    const tipo = inputTipo.value;
    const fecha = inputFecha.value;

    if (titulo === "") {
        return;
    }

    crearActividad(titulo, tipo, fecha);
    formulario.reset();
    actualizarLista();
});

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        filtroActual = boton.dataset.filtro;

        botonesFiltro.forEach(function (b) {
            b.classList.remove("activo");
        });

        boton.classList.add("activo");
        actualizarLista();
    });
});

actualizarLista();