const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");
let todoList = [];

if(localStorage.getItem('todoList')){
    todoList = JSON.parse(localStorage.getItem('todoList'));
}

todoList.forEach(function(item){
    renderTasks(item);
})


form.addEventListener('submit', addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

function renderTasks(taskText){
    
    const newElement = document.createElement('li');
    newElement.className = "list-group-item";
    const newTextNode = document.createTextNode(taskText);
    newElement.appendChild(newTextNode);

    const deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode("Удалить"));
    deleteBtn.className = "btn btn-light btn-sm float-right";
    deleteBtn.dataset.action = "delete";
    
    newElement.appendChild(deleteBtn);
    
    itemsList.prepend(newElement);
}

function addItem(e) {
e.preventDefault();

const newItemInput = document.getElementById('newItemText');
const newItemText = newItemInput.value;

renderTasks(newItemText);

todoList.push(newItemText);
localStorage.setItem("todoList", JSON.stringify(todoList));
newItemInput.value = "";
}

function removeItem(e) {

    if(e.target.hasAttribute('data-action') && 
    e.target.getAttribute('data-action') == 'delete'
    ){
        if(confirm('Удалить задачу?')) {
            e.target.parentNode.remove();
            const taskText = e.target.closest('.list-group-item').firstChild.textContent;
        

            const index = todoList.findIndex(function(item){
                if(taskText === item){
                    return true;
                }
            })
            if(index !== -1){
                todoList.splice(index, 1);
            }
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
    }
}

function filterItems(e){
    const searchedText = e.target.value.toLowerCase();
    const items = itemsList.querySelectorAll("li");
    
    items.forEach(function(item){
        const itemText = item.firstChild.textContent.toLowerCase();
       
        if(itemText.indexOf(searchedText) != -1 ){
            item.style.display = "block";
           
        } else {
            item.style.display = "none";
        }
    })
    
}