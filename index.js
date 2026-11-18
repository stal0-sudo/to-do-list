const form = document.getElementById("form")
const input = document.getElementById("input")
const list = document.getElementById("list")

let tasks = []

form.addEventListener("submit", event => {
    event.preventDefault()
    const title = input.value.trim()

    if (!title) return;
    tasks.push({ id: Date.now(), title: title, done: false });
    render();
    input.value = ''
})

list.addEventListener("click", event => {
    const li = event.target.closest("li")
    if (!li) return; 

    const id = Number(li.dataset.id)

    // 1. Логика удаления
    if (event.target.classList.contains("delete")) {
        tasks = tasks.filter(task => task.id !== id);
        render();
        return;
    }

    // 2. Логика переключения статуса (чекбокс)
    if (event.target.classList.contains("toggle")) {
        const task = tasks.find(task => task.id === id);
        task.done = event.target.checked;
        render();
    }
})

я
function startEditing(li, task, span) {
    
    const editInput = document.createElement("input")
    editInput.type = "text"
    editInput.value = task.title
    editInput.className = "edit-input"

   
    li.replaceChild(editInput, span)
    editInput.focus() 

   
    const save = () => {
        const newTitle = editInput.value.trim()
        if (newTitle !== "") {
            task.title = newTitle 
        }
        render() 
    }

    editInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            save()
        }
        // Опционально: отмена по Esc
        if (event.key === "Escape") {
            render()
        }
    })

    editInput.addEventListener("blur", save)
}

function render() {
    list.innerHTML = ""

    tasks.forEach(task => {
        const li = document.createElement("li")
        li.dataset.id = task.id

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.done
        checkbox.className = "toggle"

        const span = document.createElement("span")
        span.textContent = task.title

        span.addEventListener("click", () => {
            startEditing(li, task, span)
        })

        if (task.done) li.classList.add("done")

        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Удалить"
        deleteBtn.className = "delete"

        li.append(checkbox, span, deleteBtn)
        list.append(li)
    })
}

render()