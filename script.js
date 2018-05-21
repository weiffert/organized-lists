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
            favorite: false,
        };
        this.list.insertBefore(
            this.renderListItem(hike),
            this.list.firstElementChild
        );
        this.hikes.unshift(hike);

        form.reset();
    },

    handleRename(event) {
        const li = event.target.closest('li');
        const span = li.querySelector('span.hikeName');
        span.contentEditable = span.contentEditable === 'false';
        span.focus();

        span.addEventListener('keyup', event => {
            this.handleRenamedData(event);
        });
    },

    handleRenamedData(event) {
        const span = event.target;
        const li = span.parentElement;

        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));
        this.hikes[index].name = span.textContent;
    },

    handleStar(event) {
        const li = event.target.closest('li');
        li.classList.toggle('favorite');

        this.hikes.forEach(hike => {
            if (hike.id === parseInt(li.dataset.id))
                hike.favorite = !hike.favorite;
        });
    },

    handleDown(event) {
        const li = event.target.closest('li');
        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));

        if (index < this.hikes.length - 1) {
            this.list.insertBefore(li, li.nextSibling.nextSibling);

            const value = this.hikes.splice(index, 1);
            this.hikes.splice(index + 1, 0, value[0]);
        }
    },

    handleUp(event) {
        const li = event.target.closest('li');
        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));

        if (index > 0) {
            this.list.insertBefore(li, li.previousSibling);

            const value = this.hikes.splice(index, 1);
            this.hikes.splice(index - 1, 0, value[0]);
        }
    },

    handleDelete(event) {
        const li = event.target.closest('li');
        const parent = li.parentElement;
        parent.removeChild(li);

        this.hikes = this.hikes.filter(hike => hike.id !== parseInt(li.dataset.id));
    },

};

app.init({
    formSelector: 'form#hikeForm',
    listSelector: 'ul#hikeList',
    templateSelector: 'li.hike.template',
});

