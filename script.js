let model = [];
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    const form = event.target;
    const list = document.querySelector('ul');

    list.appendChild(renderListElement(form.movie.value));
    event.preventDefault();
    form.reset();
}

function renderListElement(data) {
    model.push(data);
    const li = document.createElement('li');
    li.textContent = data;
    return li;
}