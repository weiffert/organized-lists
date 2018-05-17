const app = {
    init(selectors) {
        this.max = 0;
        this.hikes = [];
        this.list = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector);

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', event => {
                event.preventDefault();
                this.handleSubmit(event);
            });
    },

    renderListItem(data) {
        const li = this.template.cloneNode(true);
        li.classList.remove('template');
        li.dataset.id = data.id;
        li
            .querySelector('span.hikeName')
            .textContent = data.name;

        return li;
    },

    handleSubmit(event) {
        const form = event.target;

        const hike = {
            id: ++this.max,
            name: form.hike.value,
        };

        this.list.insertBefore(
            this.renderListItem(hike),
            this.list.firstElementChild
        );
        this.hikes.unshift(hike);

        form.reset();
    },


};

app.init({
    formSelector: 'form#hikeForm',
    listSelector: 'ul#hikeList',
    templateSelector: 'li.hike.template',
});


const buttonTypes = {
    // 'star': handleStar,
    // 'up': handleUp,
    // 'down': handleDown,
    'delete': handleDelete,
};

function renderPElement(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

function renderButtonList() {
    const element = document.createElement('div');
    element.classList.add('buttonList');

    Object.keys(buttonTypes).forEach(function (key) {
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

    const index = app.hikes.indexOf(p.textContent);
    app.hikes.splice(index, 1);
}