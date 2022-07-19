
//Srore les liste dans le tableau
let todoItems = [];

//Il y aura 3 proprietés
//Une TEXT pourt le text recu
//Une CHECKED un boolean qui regardes si la tache est accomplit ou pas
//Une ID un identifiant unique pour chaque list
//Lorsque une TACHE est ajouté, CREER un nouvel objet où on va PUSH dans le tableau et afficher text
//LORSQUE le todo est ACCOMPLI, on va TOGGLE le CHECKED(BOOLEAN) à TRUE
//LORSQUE le todo est supprimé, LOCALISER le ID et REMOVE

//CREATION d'un objet todo, celui se referera à la valeur de input
//ET va le PUSH dans notre todoItems

function renderTodo(todo) {
    //PRENDRE UL
    const list = document.querySelector('.my-ul');
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        // remove the item from the DOM
        item.remove();
        return
      }

    //On utilise operateur ternaire pour voir si todo.cheked est true
    //Si c'est true on mets la class checked
    const isChecked = todo.checked ? 'done' : '';
    //Creer un élément 'li' et le mettre dans notre node
    var r = () => Math.random() * 256 >> 0;
const color = `rgba(${r()}, ${r()}, ${r()}, ${(0.4)})`;

    const node = document.createElement('li');
    //Insérer La classe à la li grace à setAttribute
    node.setAttribute('class', `todo-item ${isChecked}`);
    //Inséer l'ID qu'on a créé
    node.setAttribute('data-key', todo.id);
    
    //Mettre les propriétés de li dans l'élément créer
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox" title="Click to check"/>
    <label Afor="${todo.id}" class="tick js-tick"></label>
    <span class="block-right"> ${todo.txt} </span>
    <button class="close">
    ${'X'}
    </button>
    `;
    node.style.backgroundColor = color
    list.append(node);
}

function addTodo(txt) {
    const todo = {
        txt, //La valeur qu'on va ajouter dans l'input
        checked: false, //Le checked est false par défault
        id: Date.now() //Manière de le localiser chaque miliseconde correspond à un id
        };

        todoItems.push(todo)
        renderTodo(todo)
        console.log(todoItems)
}

//Prendre le formulaire du DOM
const form = document.querySelector('.form')
//On met un ADDEVENTLISTENER a SUBMIT
form.addEventListener('submit', e =>{
    e.preventDefault();
    // on prends l'input
    const input = document.querySelector('.form .my-input');

    //Prendre la valeur de l'input et enlever l'espace avec TRIM

    const text = input.value.trim();

    //Si la valeur n'est pas égale à rien on mets le text de todo
    if(text !== '') {
        addTodo(text);
        input.value = '';
        input.focus(); //Ca reste focus sur l'input pour pas avoir à tout le temps refaire le focus
    }
})

// Tracer la tâche

const list = document.querySelector('.my-ul') 

list.addEventListener('click', event => {

    if(event.target.tagName === 'LI'){
        event.target.classList.toggle('done');
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('close')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
      }
}, false)

// Fermer une tache
const deleteTodo = (key) => {
    const index = todoItems.findIndex(item => item.id === Number(key));
  // Create a new object with properties of the current todo item
  // and a `deleted` property which is set to true
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  // remove the todo item from the array by filtering it out
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}



function toggleDone(key) {
    //findIndex est une méthode pour retourner la position d'un objet en nombre
    const index = todoItems.findIndex(item => item.id === Number(key));
    //On localise le todo dans le tableau todoItems et mettre son checked
    //Ca signifie que true va devenir false et vice versa
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}
