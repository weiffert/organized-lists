const app = {
    init(selectors) {
        this.max = 0;
        this.hikes = [];
        this.list = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector);

        this.myAddEventListener(selectors.formSelector, 'submit', this.handleSubmit);

        // this.myAddEventListener('button.star', 'click', this.handleStar);
        // this.myAddEventListener('button.rename', 'click', this.handleRename);
        // this.myAddEventListener('button.up', 'click', this.handleUp);
        // this.myAddEventListener('button.down', 'click', this.handleDown);
        // this.myAddEventListener('button.delete', 'click', this.handleDelete);
        
        // document
        //     .querySelector(selectors.formSelector)
        //     .addEventListener('submit', event => {
        //         event.preventDefault();
        //         this.handleSubmit(event);
        // //     });
        // this.template
        //     .querySelector('button.star')
        //     .addEventListener('click', event => {
        //         this.handleStar(event);
        //     });
        // this.template
        //     .querySelector('button.rename')
        //     .addEventListener('click', event => {
        //         this.handleRename(event);
        //     });
        // this.template
        //     .querySelector('button.up')
        //     .addEventListener('click', event => {
        //         this.handleUp(event);
        //     });
        // this.template
        //     .querySelector('button.down')
        //     .addEventListener('click', event => {
        //         this.handleDown(event);
        //     });
        // this.template
        //     .querySelector('button.delete')
        //     .addEventListener('click', event => {
        //         this.handleDelete(event);
        //     });
    },

    myAddEventListener(selector, type, callback) {
        document
            .querySelector(selector)
            .addEventListener(type, e => {
                debugger;
                e.preventDefault();
               callback(e);
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
        // debugger;
        this.list.insertBefore(
            this.renderListItem(hike),
            this.list.firstElementChild
        );
        this.hikes.unshift(hike);

        form.reset();
    },

    handleRename(event) {
        console.log('rename');
        debugger;
    },

    handleStar(event) {
        console.log('star');
        debugger;
        const li = event.target.parentElement.parentElement;
        li.classList.toggle('starred');
    },

    handleDown(event) {
        console.log('down');
        debugger;

    },

    handleUp(event) {
        console.log('up');
        debugger;
    },

    handleDelete(event) {
        console.log('delete');
        debugger;
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

