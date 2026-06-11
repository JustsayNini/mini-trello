let taskBoxes = JSON.parse(localStorage.getItem('taskBoxes')) || [];
let addTask = document.getElementById("to-do");

let taskBox;
function displayCard(cardData){

    taskBox = document.createElement("div");
    taskBox.className = "task-box-shell";
    taskBox.innerHTML = `
        <h1 contenteditable="true" class="card-title" oninput="saveAllToStorage()">${cardData.title}</h1>
        <div class="checklist-container">
            <input type="checkbox" id="item-checkbox" ${cardData.checkbox ? 'checked' : ''} oninput="saveAllToStorage()">
            <input type="text" id="item-text" value="${cardData.task}" oninput="saveAllToStorage()" placeholder="Write something here...">
            <button onclick="saveTask(this)">+</button>

            <div class="list-container"></div>
        </div>
    `;
    
    addTask.appendChild(taskBox);
}

function createCard() {
    const newCardData = {
        title: "Title",
        checkbox: false,
        task: ""
    };
    
    taskBoxes.push(newCardData);
    
    localStorage.setItem('taskBoxes', JSON.stringify(taskBoxes));
    
    displayCard(newCardData);
}

function loadSavedTasks() {
    addTask.innerHTML = ""; 
    
    taskBoxes.forEach(card => {
        displayCard(card);
    });
}

loadSavedTasks();

function saveTask(theclickedbutton) {
    let card = theclickedbutton.closest('.task-box-shell');
    
    let inputSpace = card.querySelector('#item-text');
    let checkboxSpace = card.querySelector('#item-checkbox');
    let listContainer = card.querySelector('.list-container');
    
    if (inputSpace.value.trim() === "") return;
    
    let newItem = document.createElement("p");
    
    if (checkboxSpace.checked) {
        newItem.style.textDecoration = "line-through";
    }
    
    newItem.innerText = "- " + inputSpace.value;
    
    listContainer.appendChild(newItem);
    
    inputSpace.value = "";
    checkboxSpace.checked = false;
}

function saveAllToStorage() {
    const cardsOnScreen = document.querySelectorAll('.task-box-shell');
    let updatedList = [];

    cardsOnScreen.forEach(card => {
        updatedList.push({
            title: card.querySelector('.card-title').innerText,
            checkbox: card.querySelector('.item-checkbox').checked,
            task: card.querySelector('.item-text').value
        });
    });

    taskBoxes = updatedList;
    localStorage.setItem('taskBoxes', JSON.stringify(taskBoxes));
}