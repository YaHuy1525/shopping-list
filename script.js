const itemForm = document.querySelector('#item-form');
const itemList = document.querySelector('#item-list');
const itemInput = document.querySelector('#item-input');
const submitButton = document.querySelector('.btn');
const deleteButtons = document.querySelectorAll('button');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear');
let editMode = false;


function displayItems(){
  const itemFromStorage  = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function addItem(e){
    e.preventDefault();
    const newItem = itemInput.value;
    
    if(editMode){
      const itemToEdit = itemList.querySelector('.edit-mode');
      removeItemFromStorage(itemToEdit.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      editMode = false;
    }
    else{
      if(checkDuplicate(newItem)){
        alert('Item already exists');
      }
    }

    if (newItem == ''){
        alert('Please input an item');
    }
    else{
      addItemToDOM(newItem);
      addItemToStorage(newItem);
      checkUI();
      itemInput.value = '';  
    } 
}

// function updateItem(item){
//   if(submitButton.c)
// }

function addItemToDOM(item){
    const li = createItem(item);
    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItemToStorage(item){
    let itemFromStorage = getItemFromStorage();
    //set item to array
    itemFromStorage.push(item);

    //convert to JSON string and set local storage
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
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

function getItemFromStorage(){
    let itemFromStorage;
    if(localStorage.getItem('items') === null){
      itemFromStorage = [];
    }
    else{
      itemFromStorage = JSON.parse(localStorage.getItem('items')); 
    }
    return itemFromStorage;
}

function onClickItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem( e.target.parentElement.parentElement);
    console.log(e.target.parentElement, e.target);
  } 
  else{
    if(e.target.tagName === 'LI'){
      setItemToEdit(e.target);
    };
  }

}

function checkDuplicate(item){
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item)
}

function setItemToEdit(item){
  editMode = true;
  itemList.querySelectorAll('li').forEach((li) => {
    li.classList.remove('edit-mode');
  })
  item.classList.add('edit-mode');
  submitButton.innerHTML = '<i class ="fa-solid fa-pen"></i> Update item';
  itemInput.value = item.textContent;
  submitButton.style.backgroundColor = '#22BB22';
}

function removeItemFromStorage(item){
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) =>
    i !== item)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}
function removeItem(item){
    if (confirm("Are you sure?")){
      item.remove();

      removeItemFromStorage(item.textContent);

      checkUI();
    }
}

function checkUI(){
  const items = document.querySelectorAll('li');
  if (items.length === 0){
    clearButton.style.display = 'none';
    filter.style.display = 'none';
  }
  else{
    clearButton.style.display = 'block';
    filter.style.display = 'block';
  }
  itemInput.value = '';
  submitButton.style.backgroundColor = '#333';
  submitButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  
  editMode = false;
}

function filterItem(e){
  const items = document.querySelectorAll('li');
  const text = filter.value.toLowerCase();
  console.log(text);
  for (const item of items){
    if (item.firstChild.textContent.toLowerCase().indexOf(text) != -1){
      item.style.display = 'flex';
    }
    else{
      item.style.display = 'none';
    }
  }
}

function clearItem(){
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
  
}

submitButton.addEventListener('click', addItem);
itemList.addEventListener('click', onClickItem);
clearButton.addEventListener('click', clearItem);
filter.addEventListener('input', filterItem);
document.addEventListener('DOMContentLoaded', displayItems);


localStorage.clear();
addItemToStorage('milk');
addItemToStorage('snack');
checkUI();
