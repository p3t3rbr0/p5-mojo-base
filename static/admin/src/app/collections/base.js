import m from 'mithril';


class Base {
    constructor(url, model, models) {
        this.url = url || '';
        this.model = model || null;
        this.models = models || [];
    }

    fetch() {
        return m.request({
            method: 'GET',
            url: this.url,
            withCredentials: true,
        }).then(res => {
            this.models = res.map(_ => new this.model(_));
            return this.models;
        }).catch(err => {
            console.log(`Collection error: ${JSON.stringify(err)}`);
        });
    }

    destroy() {
        return 1;
    }
}

export { Base };
