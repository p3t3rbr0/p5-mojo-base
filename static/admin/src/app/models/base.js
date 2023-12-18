import m from 'mithril';


class Base {
    static resourceUrl;
    static baseUrl = '/admin/api/v1';

    static fetch(userId) {
        return m.request({
            method: 'GET',
            url: this.baseUrl + this.resourceUrl + userId,
            withCredentials: true,
        }).then(_ => new this(_));
    }

    static create(data) {
        return m.request({
            method: 'POST',
            url: this.baseUrl + this.resourceUrl,
            body: data,
            withCredentials: true,
        }).then(_ => new this(_));
    }

    update(data) {
        return m.request({
            method: 'PATCH',
            url: this.baseUrl + this.resourceUrl,
            body: data,
            withCredentials: true,
        }).then(() => {
            Object.keys(data).forEach(field => {
                if (this.field)
                    this.set(this.field, data.field);
            });
        });
    }

    destroy() {
        return m.request({
            method: 'DELETE',
            url: this.baseUrl + this.resourceUrl + userId,
            withCredentials: true,
        }).then(res => {
            return new this(res);
        }).catch(err => {
            console.log(`Model error: ${JSON.stringify(err)}`);
        });
    }

    get(pk) {
        if (pk)
            return this[Object.keys(this).find(_ => _ === pk)];

        return undefined;
    }

    set(field, data) {
        if (field && data && this.field)
            this.field = data;

        return false;
    }
}

export { Base };
