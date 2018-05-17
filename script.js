const app = {
    init(selectors) {
        this.max = 0;
        this.hikes = [];
        this.list = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector);

        this.myAddEventListener(document, selectors.formSelector, 'submit', 'handleSubmit');
    },

    myAddEventListener(parent, selector, type, callback) {
        parent
            .querySelector(selector)
            .addEventListener(type, e => {
                e.preventDefault();
                this[callback](e);
            });
    },

    renderListItem(data) {
        const li = this.template.cloneNode(true);
        
        this.myAddEventListener(li, 'button.star', 'click', 'handleStar');
        this.myAddEventListener(li, 'button.rename', 'click', 'handleRename');
        this.myAddEventListener(li, 'button.up', 'click', 'handleUp');
        this.myAddEventListener(li, 'button.down', 'click', 'handleDown');
        this.myAddEventListener(li, 'button.delete', 'click', 'handleDelete');
        
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

    handleRename(event) {
        console.log('rename');
    },

    handleStar(event) {
        console.log('star');
        const li = event.target.parentElement.parentElement;
        li.classList.toggle('starred');
    },

    handleDown(event) {
        console.log('down');

    },

    handleUp(event) {
        console.log('up');
    },

    handleDelete(event) {
        console.log('delete');
        const li = event.target.parentElement.parentElement;
        const p = li.children[0];
        const parent = li.parentElement;
        parent.removeChild(li);

        const index = app.hikes.indexOf(p.textContent);
        app.hikes.splice(index, 1);
    },

};

app.init({
    formSelector: 'form#hikeForm',
    listSelector: 'ul#hikeList',
    templateSelector: 'li.hike.template',
});

