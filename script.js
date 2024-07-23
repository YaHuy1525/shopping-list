const itemForm = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list');
const itemInput = document.querySelector('#item-input');
const submitButton = document.querySelector('.btn');

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;

    const li = createItem(itemInput.value);
    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
    if (newItem == ''){
        alert('Please input an item');
    }   
}

function createItem(text) {
    const item = document.createElement('li');
    item.innerText = text;
    return item;
}
function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className =  classes;
    return icon;
}
submitButton.addEventListener('click', addItem);