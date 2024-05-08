// 1. APPLICATION STATE
let state = {
    todos: [
        {
            text: 'Banane',
            completed: false,
            id: 0
        }
    ],
    filteredWord: "",
    idCounter: 1
}

function getTodos() {
    return state.todos;
}


// 2. STATE ACCESSORS/MUTATORS FUNCTIONS

function addTodo(text)
{
    state.todos.push({text: text, completed: false, id: state.idCounter});
    state.idCounter++;
}


// 3. DOM NODE REFERENCES

const shoppingInput$ = document.querySelector("#shopping-input");
const shoppingButton$ = document.querySelector("#shopping-add");
const shoppingList$ = document.querySelector("#shopping-list");
const hideButton$ = document.querySelector('#shopping-hide');
const showButton$ = document.querySelector('#shopping-show');
const emptyCartButton$ = document.querySelector('#empty-cart');



// 4. DOM NODE CREATION FUNCTIONS


// 5. RENDER FUNCTION

function render()
{
    shoppingList$.innerHTML = '';
    getTodos().forEach((todo, index) =>
    {
        shoppingList$.innerHTML += `
            <li>${todo.text}
                <button onclick="onEditButtonClick(event, ${todo.id})">✏️</button>
                <button onclick="removeItem(event, ${todo.id})">✖</button
                <button id="complete-button">◻</button>
            </li>`;
    })
}


// 6. EVENT HANDLERS
function onAddButtonClick() {
    const text = shoppingInput$.value;

    if (text.trim() !== '')
    {
        addTodo(text);
        shoppingInput$.value = '';
    }
    render();
}

function enterKey(event)
{
    if (event.key === 'Enter')
    {
        onAddButtonClick();
    }
}

function removeItem(event, id)
{
    console.log(event, id);
    state.todos = state.todos.filter(todo => todo.id !== id);
    // event.target.parentElement.delete();
    render();
}
function onEditButtonClick(event, id) {
    const todoIndex = state.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        console.log('Todo not found');
        return;
    }
    console.log(event, id);
    const inputField = document.createElement('input');
    const todoText = state.todos[id].text; // Get the current text of the todo item
    inputField.value = todoText; // Set the initial value of the input field
    event.target.parentElement.appendChild(inputField);

    // Focus on input field and select its text
    inputField.focus();
    inputField.select();

    inputField.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            // Update the text of the todo item in the state
            state.todos[todoIndex].text = inputField.value;
            render(); // Re-render the list after editing
        }
    });
}



// 7. INIT BINDINGS
shoppingButton$.addEventListener('click', onAddButtonClick);
shoppingInput$.addEventListener('keyup', enterKey);



// 8. INITIAL SETUP
render();