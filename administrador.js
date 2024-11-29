
const btnDeTema = document.getElementById("alterarTema");
const body = document.body;

btnDeTema.addEventListener("click", () => {
    const temaDelBody = body.classList.toggle("temaOscuro");
    localStorage.setItem("tema", temaDelBody ? "oscuro" : "claro")
   
});

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = localStorage.getItem("tema"); // Obtiene el tema guardado
    if (temaGuardado === "oscuro") {
        body.classList.add("temaOscuro"); // Aplica el tema oscuro si está guardado
    }
});

const formularioDeTareas = document.getElementById("formularioDeTareas");
const listaTareas = document.getElementById("listaTareas");
let tarea;
loadTareas();

formularioDeTareas.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputEntrada = document.getElementById("entradaTarea");
    tarea = inputEntrada.value;
    console.log(tarea);

    crearElementosTarea(tarea);
    alamcenarTareasEnLocalStorage(tarea);
    inputEntrada.value = "";
});

function crearElementosTarea(textoTarea) {
    const nuevoLi = document.createElement("LI");
    nuevoLi.textContent = textoTarea;
    nuevoLi.classList.add("li");

    const div = document.createElement("DIV");

    div.append(creatarBoton(" Delete", "btnDelete"), creatarBoton(" Edit", "btnEdit"), creatarBoton(" ✔ " ,"btnTareaHecha"));
    nuevoLi.append(div)
    listaTareas.insertAdjacentElement("afterbegin",nuevoLi);

    return nuevoLi;

}

function creatarBoton(text, className) {
    const btn = document.createElement("SPAN");
    btn.textContent = text;
    btn.className = className;
    return btn;
}

listaTareas.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnDelete")) {
        const tarea = event.target.closest("li");
        borrarTarea(tarea);
    } else if (event.target.classList.contains("btnEdit")) {
        const tarea = event.target.closest("li");
        editarTarea(tarea)
    } else if (event.target.classList.contains("btnTareaHecha")) {
        const tarea = event.target.closest("li");
        tareaHecha(tarea);
    }
})

function borrarTarea(tarea) {
    if (confirm("Estas seguro de que quieres eliminar esta tarea?")) {
        tarea.remove();
        actualizarLocalStorage();
    }
};

function editarTarea(tarea) {
    const tareaEditada = prompt("Edita tu tarea:", tarea.firstChild.textContent);

    if (tareaEditada !== null) {
        tarea.firstChild.textContent = tareaEditada;
        actualizarLocalStorage()
    }
};

function tareaHecha(tarea){
    if(confirm("La tarea esta hecha?")){
        tarea.classList.add("tareaCompletada");
        actualizarLocalStorage();
    }
}

function alamcenarTareasEnLocalStorage(tarea) {
    const tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    tareas.push(tarea);

    localStorage.setItem("tareas", JSON.stringify(tareas));
};

function loadTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    tareas.forEach((tarea) => {
        listaTareas.appendChild(crearElementosTarea(tarea));
    });
}


function actualizarLocalStorage(){
    const tareas = Array.from(listaTareas.querySelectorAll("li")).map((li) => li.firstChild.textContent);

    localStorage.setItem("tareas", JSON.stringify(tareas));
};


