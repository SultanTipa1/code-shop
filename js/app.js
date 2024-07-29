document.addEventListener('DOMContentLoaded', (event) => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const listContainer = document.getElementById('listContainer');
    const clearButton = document.getElementById('clearButton');

    // Load saved items from local storage if available
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Function to render the list
    const renderList = () => {
        listContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.text;
            listItem.className = item.purchased ? 'purchased' : '';
            listItem.dataset.index = index;
            listContainer.appendChild(listItem);
        });
    };

    // Function to add an item
    const addItem = () => {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            shoppingList.push({ text: itemText, purchased: false });
            itemInput.value = '';
            saveList();
            renderList();
        }
    };

    // Function to save the list to local storage
    const saveList = () => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    };

    // Function to clear the list
    const clearList = () => {
        shoppingList = [];
        saveList();
        renderList();
    };

    // Event listener for adding items
    addButton.addEventListener('click', addItem);

    // Event listener for marking items as purchased
    listContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const index = event.target.dataset.index;
            shoppingList[index].purchased = !shoppingList[index].purchased;
            saveList();
            renderList();
        }
    });

    // Event listener for clearing the list
    clearButton.addEventListener('click', clearList);

    // Initial render
    renderList();
});
// Function to enable editing of items
const editItem = (index) => {
    const newItemText = prompt('Edit item:', shoppingList[index].text);
    if (newItemText !== null && newItemText.trim() !== '') {
        shoppingList[index].text = newItemText.trim();
        saveList();
        renderList();
    }
};

// Event listener for double-click to edit items
listContainer.addEventListener('dblclick', (event) => {
    if (event.target.tagName === 'LI') {
        const index = event.target.dataset.index;
        editItem(index);
    }
});
