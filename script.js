let model = [];
const buttonTypes = {
    'star': handleStar,
    'up': handleUp,
    'down': handleDown,
    'delete': handleDelete,
};

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const list = document.querySelector('ul');

    list.appendChild(renderListElement(form.movie.value));

    form.reset();
}

function renderListElement(data) {
    model.push(data);
    const li = document.createElement('li');
    li.textContent = data;
    Object.keys(buttonTypes).forEach(function(key) {
        li.appendChild(renderButton(key, buttonTypes[key]));
    });
    return li;
}

function renderButton(type, event) {
    const div = document.createElement('div');
    div.classList.add('button');
    div.classList.add(type);
    div.addEventListener('click', event);
    return div;
}

function handleStar() {
    console.log('starred');

}

function handleDown() {
    console.log('down');

}

function handleUp() {
    console.log('up');

}

function handleDelete() {
    console.log('delete');

}