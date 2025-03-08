
const date = new Date();
console.log(date.toDateString())
const title = document.getElementById('title');
title.innerHTML = date.toDateString();
document.addEventListener("DOMContentLoaded", loadTasks);


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });

    if (document.getElementById("taskList") == "") {
        taskList.style.display = 'none';
    }
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;
    createTaskElement(taskText, false);
    saveTasks();
    taskInput.value = "";
}

function createTaskElement(taskText, isCompleted) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = isCompleted ? "checked.png" : "unchecked.png";
    img.classList.add("task-img");
    img.onclick = function () {
        toggleTask(img, taskText, li);
    };

    const span = document.createElement("span");
    span.textContent = taskText;
    if (isCompleted) span.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";
    delBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

function toggleTask(img, taskText, li) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);

    if (taskIndex > -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        img.src = tasks[taskIndex].completed ? "checked.png" : "unchecked.png";
        li.querySelector("span").classList.toggle("completed");
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const isCompleted = li.querySelector("span").classList.contains("completed");
        tasks.push({ text, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}