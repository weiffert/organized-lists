let model = [];
const buttonTypes = {
    // 'star': handleStar,
    // 'up': handleUp,
    // 'down': handleDown,
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
    li.appendChild(renderPElement(data));``
    li.appendChild(renderButtonList());
    return li;
}

function renderPElement(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

function renderButtonList() {
    const element = document.createElement('div');
    element.classList.add('buttonList');

    Object.keys(buttonTypes).forEach(function(key) {
        element.appendChild(renderButton(key, buttonTypes[key]));
    });

    return element;
}

function renderButton(type, event) {
    const button = document.createElement('button');
    button.classList.add('button');
    button.classList.add(type);
    button.addEventListener('click', event);
    return button;
}

function handleStar(event) {
    const li = event.target.parentElement.parentElement;
    li.classList.toggle('starred');
}

function handleDown(event) {
    console.log('down');

}

function handleUp(event) {
    console.log('up');

}

function handleDelete(event) {
    const li = event.target.parentElement.parentElement;
    const p = li.children[0];
    const parent = li.parentElement;
    parent.removeChild(li);

    const index = model.indexOf(p.textContent);
    model.splice(index, 1);
}