let tasksData = {}


const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector('#done');
const columns = [todo, progress, done];
let dragElement = null;

function addTask(title, desc, column){
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("drag", (e) =>{
        dragElement = div;
    });

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", ()=>{
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount(){
    columns.forEach(col =>{   // col = columns
    
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        tasksData[ col.id ] = Array.from(tasks).map(t=>{
            return{
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText 
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData)); //this is stored the data in local storage... in string formate
        count.innerText = tasks.length;
    })
}


if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks")); // using this we convert the data that stored in string formate we convert it in obbject formate.
    
    console.log(data);
    for(const col in data){
        console.log(col, data[col]);
    }

    for(const col in data){ 
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task=>{
           addTask(task.title, task.desc, column);
        })

    }

    updateTaskCount();
}

const tasks = document.querySelectorAll('.task');

tasks.forEach(task =>{
    task.addEventListener("drag", (e) =>{
        // console.log("dragging", e); 
        dragElement = task;
    });
})

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });
    
    column.addEventListener("dragover",(e) =>{
        e.preventDefault();
    });
    column.addEventListener("drop", (e) => {

        e.preventDefault();


        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();

    });
}
 
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

// column.addEventListener("dragenter", (e) => {
// //         e.prevntDefault();
//         column.classList.add("hover-over");
// })

/* Modal Related logic...*/
const toggleModelButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const addTaskButton = document.querySelector(".modal .add-new-task")

toggleModelButton.addEventListener("click",()=>{
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", ()=>{
    modal.classList.remove("active");
});


addTaskButton.addEventListener("click",()=>{
    const taskTitle = document.querySelector("#task-title-input").value
    const taskDesc = document.querySelector("#task-desc-input").value

    addTask(taskTitle, taskDesc, todo);
    updateTaskCount();
    modal.classList.remove("active");

        document.querySelector("#task-title-input").value = "";
        document.querySelector("#task-desc-input").value = "";
});


/* Modal Related logic....*/

 