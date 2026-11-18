// "use strict";
// const links = document.querySelector("header")



// for (let index = 0; index < links.length; index++) {
//     links[index].addEventListener("click",() =>{console.log("Clicker");
//     })
// }

// function element(tag){
//     const element = document.createElement(tag);
//     element.append("Hello");
//     return element;
// }

// const root = document.getElementById("root");
// root.append(element("h1"));
// root.append(element("h2"));
// root.append(element("h3"));
// root.append(element("h4"));

const form = document.getElementById("form")
const input = document.getElementById("input")
const list = document.getElementById("list")

let tasks = [

]



form.addEventListener("submit",event =>{
    event.preventDefault()
    const title = input.value.trim()

    if (!title) return;
    tasks.push({id:Date.now(),title: title,done:false});
    render();
    input.value = ''
})

list.addEventListener("click",event => {
    const li = event.target.closest("li")
    if (li) return;

    const id = Number(li.dataset)

    if(!event.target.className.contains("toggle")){
        const task = tasks.find(task => task.id == id)
        task.done = true
    };

    render()
})

function render(){
    list.innerHTML = ""

    tasks.map(task => {
        const li = document.createElement("li")

        li.dataset.id = task.id

        const span = document.createElement("span")
        span.textContent = task.title

        if(task.done) li.classList.add("done")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.done
        checkbox.className = "toggle"

        li.append(checkbox,span)
        list.append(li)

        console.log(task);
    })
}
render()