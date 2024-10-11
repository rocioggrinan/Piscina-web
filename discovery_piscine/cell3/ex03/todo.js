/* cargar lista de tareas desde coolie */
function loadTasks() {
    const tasks = getCookie("tasks"); /* representar las tareas almacenadas en una cookie llamda tasks */
    if (tasks) {
        const taskList = JSON.parse(tasks); /* converit de uevo un arreglo de objetos o tareas */
        taskList.forEach(task => addTaskToList(task)); /* el arreglo */
    }
}

/* agregar tarea a la lista */
function addTaskToList(task) {
    const taskList = document.getElementById("ft_list");/* donde lo quiero agregar */
    const todoItem = document.createElement("div");/* crea uno */
    todoItem.className = "todo-item"; /* formato */
    todoItem.textContent = task;/* texto de la funcion */


/* hacer clic en la tarea y preguntar si lo quiere eliminar */
todoItem.onclick = function() {
    if (confirm("¿quieres eliminar esta tarea?")) {
        taskList.removeChild(todoItem); /* lo que elimina */
        saveTasks();/* mostrar la nueva lista sin eliminar la tarea */
    }
};

/* nueva tarea al principio de la lista */
taskList.insertBefore(todoItem, taskList.firstChild);
}

/* guardar tareas en cookie */
function saveTasks() {
    const taskList = document.getElementById("ft_list");/* contenido de la tarea */
    const tasks = [];/* almacenar los textos de los que esta en la lista */
    /* elementos de las tareas */
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].textContent);/* arregla y lo guarda */
    }
    setCookie("tasks", JSON.stringify(tasks), 7);/* guardar por 7 dias */
}

/* funcion para establecer/crear/actualizar una cookie */
function setCookie(name, value, days) {
    let expires = "";
    /* almacenar dia de la expiracion de la cookie */
    if (days) {
        const date = new Date();/* fecha y horas actuales */
        date.setTime(date.getTime() + (days * 24 *60 * 60* 1000));/* tiempo de la fecha, numero de dias especifico */
        expires = "; expires=" + date.toUTCString();/* ponerlo en  una cadena de texto */
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";/* establece la cookie en el navegador */
}

/* funcion para obtener cookie */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/* agregar funcion al boton new */
document.getElementById("newTodoBTn").onclick = function() {
    const newTask = prompt("¿que tarea quieres agregar?");
    if (newTask) {
        addTaskToList(newTask);
        saveTasks();
    }
    console.log("zzzzz")
};

/* cargar las tareas al abrir la pagina */
loadTasks();
