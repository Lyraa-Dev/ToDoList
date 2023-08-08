const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn= document.querySelector("#cancel-edit-btn")
const searchInput = document.getElementById("search-input")
let tarefa = document.querySelectorAll('.todo')
let filterSelect = document.getElementById("filter-select");
let eraseButton = document.getElementById("erase-button");

let oldInputValue;
//criar uma nova tarefa
const saveTodo = (text) => {
    
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement ("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);
    
    todoInput.value = "";
    todoInput.focus();
    tarefa = document.querySelectorAll('.todo');
    
}
//editar as tarefas
const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")
        if (todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
        const inputValue = todoInput.value;
        
        if (inputValue){
            saveTodo(inputValue);
        }
});
//criação de uma nova tarefa a lista
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;


    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }
    if (targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle
        oldInputValue = todoTitle
        console.log(oldInputValue);
    }
});
//Botões de concluir edição ou cancelar edição
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value
    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms();
})
// Sistema de pesquisa pela barra de pesquisa
searchInput.addEventListener('input', filterForms);

function filterForms() {

    if(searchInput.value !==''){
    const searchTerm = searchInput.value.toLowerCase();

    for (let task of tarefa) {
        let titleElement = task.querySelector('h3'); 
        let title = titleElement.textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            task.style.display = 'flex'; 
        } else {
            task.style.display = 'none';
        }
    }}else{
        for(let task of tarefa){
            task.style.display = 'flex';
        }
    }
}
//Botão para apagar o que está escrito na barra de pesquisa
eraseButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.value = ""; 
    filterForms();
});
//Filter select para a seção filtro, mostrando todas as tarefas, tarefas concluidas ou tarefas a concluir
filterSelect.addEventListener("change", filterTasks);

function filterTasks() {
    const selectedValue = filterSelect.value;

    if (selectedValue === "all") {
        showAllTasks();
    } else if (selectedValue === "done") {
        showDoneTasks();
    } else if (selectedValue === "todo") {
        showToDoTasks();
    }
}

function showAllTasks() {
    for (let task of tarefa) {
        task.style.display = 'flex';
    }
}

function showDoneTasks() {
    for (let task of tarefa) {
        if (task.classList.contains("done")) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}

function showToDoTasks() {
    for (let task of tarefa) {
        if (!task.classList.contains("done")) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    }
}
