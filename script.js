let tasks = JSON.parse(localStorage.getItem("neonTasks")) || [];

function saveTasks() {
    localStorage.setItem("neonTasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let value = input.value.trim();

    if (value === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: value,
        done: false
    });

    input.value = "";
    saveTasks();
    displayTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.done = !task.done;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(task => {
        let div = document.createElement("div");
        div.className = task.done ? "task done" : "task";

        let span = document.createElement("span");
        span.textContent = task.text;

        let actions = document.createElement("div");
        actions.className = "task-actions";

        let doneBtn = document.createElement("button");
        doneBtn.textContent = task.done ? "Undo" : "Done";
        doneBtn.onclick = () => toggleTask(task.id);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.append(doneBtn, deleteBtn);
        div.append(span, actions);
        list.appendChild(div);
    });

    updateStats();
}

function updateStats() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.done).length;
    let remaining = total - completed;

    let percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("remaining").textContent = remaining;

    document.getElementById("percentage").textContent = percent + "%";
    document.getElementById("progress").style.width = percent + "%";
}

function updateClock() {
    let now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleTimeString();
}

document.getElementById("taskInput").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
);

setInterval(updateClock, 1000);
updateClock();
displayTasks();