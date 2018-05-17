const app = {
    init: function (selectors) {
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector);

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', event => {
                event.preventDefault();
                this.handleSubmit(event);
            });
    },
    renderListItem: function (data) {
        const li = document.createElement('li');
        li.appendChild(renderPElement(data.name)); 
        li.appendChild(renderButtonList());
        return li;
    },

    handleSubmit: function (event) {
        const form = event.target;

        const hike = {
            id: ++this.max,
            name: form.hike.value,
        };

        this.list.appendChild(this.renderListItem(hike));
        model.push(hike);

        form.reset();
    },


};

app.init({
    formSelector: 'form#hikeForm',
    listSelector: 'ul#hikeList',
});


let model = [];

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

    const index = model.indexOf(p.textContent);
    model.splice(index, 1);
}