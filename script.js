let taskBoxes = JSON.parse(localStorage.getItem('taskBoxes')) || [];
let addTask = document.getElementById("to-do");

let taskBox;
function displayCard(cardData){

    taskBox = document.createElement("div");
    taskBox.className = "task-box-shell";
    taskBox.innerHTML = `
        <h1 contenteditable="true" class="card-title" oninput="saveAllToStorage()">${cardData.title}</h1>
        <div class="checklist-container">
            <input type="checkbox" class="item-checkbox" ${cardData.checkbox ? 'checked' : ''} oninput="saveAllToStorage()">
            <input type="text" class="item-text" value="${cardData.task}" oninput="saveAllToStorage()">
            <button onclick="saveAllToStorage()">+</button>
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