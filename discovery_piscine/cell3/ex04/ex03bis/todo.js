/* cargar lista de tareas desde cookie */
function loadTasks() {
    const tasks = getCookie("tasks"); /* representar las tareas almacenadas en una cookie llamada tasks */
    if (tasks) {
        const taskList = JSON.parse(tasks); /* convertir de nuevo un arreglo de objetos o tareas */
        taskList.forEach(task => addTaskToList(task)); /* el arreglo */
    }
}

/* agregar tarea a la lista */
function addTaskToList(task) {
    const taskList = $("#ft_list"); /* donde lo quiero agregar */
    const todoItem = $("<div class='todo-item'></div>").text(task); /* crear uno */

    /* hacer clic en la tarea y preguntar si lo quiere eliminar */
    todoItem.on("click", function() {
        if (confirm("¿quieres eliminar esta tarea?")) {
            todoItem.remove(); /* lo que elimina */
            saveTasks(); /* mostrar la nueva lista sin eliminar la tarea */
        }
    });

    /* nueva tarea al principio de la lista */
    taskList.prepend(todoItem); /* agregar al principio de la lista */
}

/* guardar tareas en cookie */
function saveTasks() {
    const tasks = []; /* almacenar los textos de los que están en la lista */
    $("#ft_list .todo-item").each(function() {
        tasks.push($(this).text()); /* arreglar y lo guarda */
    });
    setCookie("tasks", JSON.stringify(tasks), 7); /* guardar por 7 días */
}

/* función para establecer/crear/actualizar una cookie */
function setCookie(name, value, days) {
    let expires = "";
    /* almacenar día de la expiración de la cookie */
    if (days) {
        const date = new Date(); /* fecha y horas actuales */
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); /* tiempo de la fecha, número de días específico */
        expires = "; expires=" + date.toUTCString(); /* ponerlo en una cadena de texto */
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"; /* establece la cookie en el navegador */
}

/* función para obtener cookie */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null; /* si no se encuentra la cookie */
}

/* agregar función al botón new */
$("#newTodoBTn").on("click", function() {
    const newTask = prompt("¿qué tarea quieres agregar?");
    if (newTask) {
        addTaskToList(newTask);
        saveTasks();
    }
    console.log("Tarea añadida");
});

/* cargar las tareas al abrir la página */
$(document).ready(function() {
    loadTasks();
});