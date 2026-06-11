//Never
let taskBoxes = JSON.parse(localStorage.getItem('taskBoxes')) || [];
let addTask = document.getElementById("to-do");

let taskBox;

//gonna
function displayCard(cardData){

    taskBox = document.createElement("div");
    taskBox.className = "task-box-shell";//give
    taskBox.innerHTML = `
        <div class="card-controls">
            <button onclick="deleteCard(this)" class="delete-btn">Delete Card</button>
            <button onclick="moveCard(this)" class="move-btn">Move Card</button>
        </div>
        <h1 contenteditable="true" class="card-title" oninput="saveAllToStorage()">${cardData.title}</h1>
        <div class="checklist-container">
            <input type="checkbox" id="item-checkbox" ${cardData.checkbox ? 'checked' : ''} oninput="saveAllToStorage()">
            <input type="text" id="item-text" value="${cardData.task}" oninput="saveAllToStorage()" placeholder="Write something here...">
            <button onclick="saveTask(this)">+</button>

            <div class="list-container"></div>
        </div>
    `;
    //you
    addTask.appendChild(taskBox);
}

//THE CREATE PART OF THE CRUD OPERATIONS!

function createCard() {
    const newCardData = {
        title: "Title",
        checkbox: false,
        task: ""
    };
    
    taskBoxes.push(newCardData);
    
    localStorage.setItem('taskBoxes', JSON.stringify(taskBoxes));
    
    displayCard(newCardData);//up
}

//THE READ PART OF THE CRUD THINGY
function loadSavedTasks() {
    addTask.innerHTML = ""; 
    
    taskBoxes.forEach(card => {
        displayCard(card);
    });
}

loadSavedTasks();

//ALSO THE CREATE PART OF THE CRUD OPERATIONS!!
function saveTask(theclickedbutton) {
    let card = theclickedbutton.closest('.task-box-shell');
    
    let inputSpace = card.querySelector('#item-text');
    let checkboxSpace = card.querySelector('#item-checkbox');
    let listContainer = card.querySelector('.list-container');
    //never
    if (inputSpace.value.trim() === "") return;
    
    let newItem = document.createElement("p");
    
    if (checkboxSpace.checked) {
        newItem.style.textDecoration = "line-through";
    }
    
    newItem.innerText = "- " + inputSpace.value;
    
    listContainer.appendChild(newItem);
    
    inputSpace.value = "";//gonna
    checkboxSpace.checked = false;
}

//THE UPDATE PART OF THE CRUD OPERATIONSSS
function saveAllToStorage() {
    const cardsOnScreen = document.querySelectorAll('.task-box-shell');
    let updatedList = [];

    cardsOnScreen.forEach(card => {
        updatedList.push({
            title: card.querySelector('.card-title').innerText,
            checkbox: card.querySelector('.item-checkbox').checked,
            task: card.querySelector('.item-text').value
        });
    });//let

    taskBoxes = updatedList;
    localStorage.setItem('taskBoxes', JSON.stringify(taskBoxes));
}

//THIS IS THE DELETE PART OF THE CRUD OPERATIONS MISS MA'AMS
function deleteCard(buttonClicked) {
    let card = buttonClicked.closest('.task-box-shell');
    card.remove();
}//you down


function moveCard(buttonClicked) {
    let card = buttonClicked.closest('.task-box-shell');
    
    let currentColumnId = card.parentElement.id;
    
    let doingColumn = document.getElementById('doing');
    let doneColumn = document.getElementById('done');
    let toDoColumn = document.getElementById('to-do');
    
    if (currentColumnId === "to-do") {
        doingColumn.appendChild(card);
    } else if (currentColumnId === "doing") {
        doneColumn.appendChild(card); 
    } else if (currentColumnId === "done") {
        toDoColumn.appendChild(card);  
    }
}











//never gonna turn around and forget you~