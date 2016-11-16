const getAsUriParameters = data => {
    let url = '';
    for (let prop in data) {
        url += encodeURIComponent(prop) + '=' +
            encodeURIComponent(data[prop]) + '&';
    }
    return url.substring(0, url.length - 1);
};

const _get = (data) => {
    let params = getAsUriParameters(data);
    return fetch(`api/${params ? '?' + params : ''}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(res => res.json());
};

const _post = (params) => {
    return fetch('api/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
    }).then(res => res.json());
};

const API = {
    get: () => {
        return _get({method: 'get.template', id: 5, string: '555'});
    },
    saveState: (data) => {
        return _post({method: 'save.state', data});
    },
    getStatus: () => {
        return _get({method: 'get.status'})
    },
    createTemplatePage: (templatePath) => {
        return _post({method: 'create.template.page', templatePath});
    },
    getAllBackups: () => {
        return _get({method: 'get.all.backups'})
    },
    getAllTemplates: () => {
        return _get({method: 'get.all.templates'})
    },
    getMedia: () => {
        return _get({method: 'get.media'})
    },
    uploadMedia: (file) => {
        let media = new FormData();
        media.append('file', file);
        return fetch('api/', {
            method: 'POST',
            body: media
        }).then(res => res.json());
    }
};

export default API;