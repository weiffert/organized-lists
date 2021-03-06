class App {
    constructor(selectors) {
        this.max = 0;
        this.hikes = [];
        this.list = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector);

        this.myAddEventListener(document, selectors.formSelector, 'submit', 'handleSubmit', true);
    }

    myAddEventListener(parent, selector, type, callback, preventDefault) {
        parent
            .querySelector(selector)
            .addEventListener(type, e => {
                if(preventDefault)
                    e.preventDefault();
                this[callback](e);
            });
    }

    renderListItem(data) {
        const li = this.template.cloneNode(true);

        this.myAddEventListener(li, 'button.star', 'click', 'handleStar');
        this.myAddEventListener(li, 'button.rename', 'click', 'handleRename');
        this.myAddEventListener(li, 'button.up', 'click', 'handleUp');
        this.myAddEventListener(li, 'button.down', 'click', 'handleDown');
        this.myAddEventListener(li, 'button.delete', 'click', 'handleDelete');
        this.myAddEventListener(li, 'span.hikeName', 'keypress', 'handleEnter');

        li.classList.remove('template');
        li.dataset.id = data.id;
        li
            .querySelector('span.hikeName')
            .textContent = data.name;

        return li;
    }

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
    }

    handleRename(event) {
        const li = event.target.closest('li');
        const span = li.querySelector('span.hikeName');
        const button = li.querySelector('.button.rename');

        span.contentEditable = !span.isContentEditable;
        span.focus();

        button.classList.toggle('save');
        button.classList.toggle('success');
        button.classList.toggle('alert');


        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));
        this.hikes[index].name = span.textContent;
    }

    handleEnter(event) {
        if(event.key === 'Enter')
            this.handleRename(event);
    }

    handleStar(event) {
        const li = event.target.closest('li');
        li.classList.toggle('favorite');

        this.hikes.forEach(hike => {
            if (hike.id === parseInt(li.dataset.id))
                hike.favorite = !hike.favorite;
        });
    }

    handleDown(event) {
        const li = event.target.closest('li');
        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));

        if (index < this.hikes.length - 1) {
            this.list.insertBefore(li, li.nextSibling.nextSibling);

            const value = this.hikes.splice(index, 1);
            this.hikes.splice(index + 1, 0, value[0]);
        }
    }

    handleUp(event) {
        const li = event.target.closest('li');
        const index = this.hikes.findIndex(hike => hike.id === parseInt(li.dataset.id));

        if (index > 0) {
            this.list.insertBefore(li, li.previousSibling);

            const value = this.hikes.splice(index, 1);
            this.hikes.splice(index - 1, 0, value[0]);
        }
    }

    handleDelete(event) {
        const li = event.target.closest('li');
        li.remove();

        this.hikes = this.hikes.filter(hike => hike.id !== parseInt(li.dataset.id));
    }

};

const app = new App({
    formSelector: 'form#hikeForm',
    listSelector: 'ul#hikeList',
    templateSelector: 'li.hike.template',
});