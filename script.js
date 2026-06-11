let taskBoxes = JSON.parse(localStorage.getItem('taskBoxes')) || []
let addTask = document.getElementById("to-do");

let taskBox;
function createCard(title = "Title", date ="", time = "", status = "No tasks yet"){

    taskBox = document.createElement("div");
    taskBox.className = "task-box-shell";
    taskBox.setAttribute("onclick", "openCard()")
    taskBox.innerHTML = `
        <h1> ${title} </h1>
        <article> Due <input type="date" class="editable-date" value="${date}" disabled> at <input type="time" class="editable-time" value="${time}" disabled> </article>
        <input type="checkbox" id="task-box-total"> <article> ${status} </article>
    `

    addTask.appendChild(taskBox);
    
    const newCard = {
        title,
        date,
        time,
        status
    };
   
    taskBoxes.push(newCard);
    localStorage.setItem('taskBoxes', JSON.stringify(taskBoxes));
}

function loadSavedTasks(){
    taskBoxes.forEach(card => createCard(card.title, card.date, card.status));
}

loadSavedTasks();