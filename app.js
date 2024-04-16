// 2. STATE ACCESSORS/MUTATORS FN'S

function addTodo(newTodo) {
    const todoItem = createTodoItem(newTodo);
    shoppingList$.appendChild(todoItem);

}

// 3. DOM NODE REFERENCES
const shoppingInput$ = document.querySelector("#shopping-input");
const shoppingButton$ = document.querySelector("#shopping-add");
const shoppingList$ = document.querySelector("#shopping-list");
const hideButton$ = document.querySelector('#shopping-hide');
const showButton$ = document.querySelector('#shopping-show');
const emptyCartButton$ = document.querySelector('#empty-cart');


// 4. DOM NODE CREATION FN'S
function createTodoItem(text) {
    const todoItem = document.createElement('li');
    todoItem.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '✖';
    deleteButton.addEventListener('click', function () {
        return function () {
            console.log(this.parentElement);
            this.parentElement.remove();
        };
    }());

    const editButton = document.createElement('button');
    editButton.textContent = '✏️';
    editButton.addEventListener('click', function () {
        const inputField = document.createElement('input');
        inputField.value = text;

        // Replace text with input field
        todoItem.innerHTML = '';
        todoItem.appendChild(inputField);

        // Focus on input field and select its text
        inputField.focus();
        inputField.select();

        // Update todo item on input blur or Enter key press
        inputField.addEventListener('blur', function () {
            todoItem.textContent = inputField.value;
            todoItem.appendChild(deleteButton);
            todoItem.appendChild(editButton);
            todoItem.appendChild(checkbox);
        });

        inputField.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                todoItem.textContent = inputField.value;
                todoItem.appendChild(deleteButton);
                todoItem.appendChild(editButton);
                todoItem.appendChild(checkbox);
            }
        });
    });

    const checkbox = document.createElement('button');
    checkbox.textContent = '◻'
    checkbox.addEventListener('click', () => {
        if (checkbox.textContent === '◻') {
            checkbox.textContent = '☑';
            todoItem.classList.toggle("completed");
        } else {
            checkbox.textContent = '◻';
            todoItem.classList.toggle('completed');
        }
    });

    todoItem.appendChild(deleteButton);
    todoItem.appendChild(editButton);
    todoItem.appendChild(checkbox);

    return todoItem;
}


// 5. RENDER FN'S
// - These functions will render the application state to the DOM
// - Here we will use a very naive but simple approach to re-render the list
function render() {
    // Clear the list
    shoppingList$.innerHTML = '';
}


// 6. EVENT HANDLERS
// - These functions handle user interaction e.g. button clicks, key presses etc.
// - These functions will call the state mutators and then call the render function
// - The naming convention for the event handlers is `on<DOM NODE><Event>`
// - Here we will create a function that will handle the add button click

shoppingInput$.addEventListener('keyup', event => filterProducts(event));

function filterProducts(){
    console.log("hello");
    const filterContent = shoppingInput$.textContent;
    const childs= document.querySelectorAll('li');
    const filteredArray = [];

    childs.forEach(child => {
        if (!child.textContent.includes(filterContent)) {
            child.classList.add('filtered');
        }
        if (!child.textContent.)
        if (child.textContent.includes(filterContent)){
            child.classList.add('highlighted');
        }
    }
    )
}


function onAddButtonClick() {
    const text = shoppingInput$.value;
    if (text.trim() !== '') {
        shoppingInput$.value = '';
        addTodo(text);
    }
}

function onHideButtonClick() {
    const completedItems = shoppingList$.querySelectorAll('.completed');
    completedItems.forEach(function (child) {
        child.classList.toggle('hidden');
    })
    hideButton$.classList.toggle('hidden');
    showButton$.classList.toggle('hidden');
}

function onShowButtonClick() {
    const completedItems = shoppingList$.querySelectorAll('.completed');
    completedItems.forEach(function (child) {
        child.classList.toggle('hidden');

    })
    showButton$.classList.toggle('hidden');
    hideButton$.classList.toggle('hidden');
}

emptyCartButton$.addEventListener('click', function () {
    render();
});

shoppingButton$.addEventListener('click', onAddButtonClick);

shoppingInput$.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        onAddButtonClick();
    }
});

hideButton$.addEventListener('click', onHideButtonClick);
showButton$.addEventListener('click', onShowButtonClick);


// 8. INITIAL RENDER
// - Here will call the render function to render the initial state of the application
render();

