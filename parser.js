const through = require('through2');
const ext = require('gulp-util').replaceExtension;
const cheerio = require('cheerio');
const fs = require('fs');

const NODE_TYPE_ATTR = 'data-node-type';
const NODE_EDITOR = 'data-editor';
const ELEMENT_NODE  = 1;
const TEXT_NODE  = 3;

let uniqueId = 0;

let $;

function parseItem(item) {
    let parsedItem = {};
    parsedItem.id = uniqueId++;
    parsedItem.tag = item.name;
    parsedItem.attrs = item.attribs;
    let className = parsedItem.attrs.class || '';
    parsedItem.cls = className.split(' ');
    if (parsedItem.attrs.class) delete parsedItem.attrs.class;
    parsedItem.editor = parsedItem.attrs[NODE_EDITOR] || null;
    if (parsedItem.attrs[NODE_EDITOR]) delete parsedItem.attrs[NODE_EDITOR];
    if (parsedItem.editor == 'text') {
        parsedItem.children = $(item).html();
    } else {
        if (item.children.length == 0 || item.name == 'input') return parsedItem;
        parsedItem.children = [];
        for (let i = 0, len = item.children.length; i < len; i++) {
            if (item.children[i].type === 'text') {
                if (item.children[i].data.trim()) {
                    parsedItem.children = item.children[i].data.trim();
                }
                continue;
            }
            parsedItem.children.push(parseItem(item.children[i]));
        }

    }
    return parsedItem;
}

function toJSON(content) {
    let page = {
        PageSettings: {
            links: [],
            metas: [],
            scripts: [],
            customScripts: []
        },
        Nodes: {}
    };
    $ = cheerio.load(content);
    let $title = $('title');
    let $links = $('link');
    let $meta = $('meta');
    let $scripts = $('script');
    let customMeta = ['keywords', 'description'];

    page.PageSettings.title = $title.text();
    $links.each(function (index, item) {
        let link = item.attribs;
        page.PageSettings.links.push(link);
    });
    $meta.each(function (index, item) {
        let meta = item.attribs;
        if (customMeta.indexOf(meta.name) !== -1) {
            page.PageSettings[meta.name] = meta;
        } else {
            page.PageSettings.metas.push(meta);
        }
    });
    $scripts.each(function (index, item) {
        let script = {};
        if (item.attribs.src) {
            script.type = 'url';
            script.content = item.attribs.src;
        } else {
            script.type = 'code';
            script.content = item.children[0].data.trim();
        }
        if (item.attribs['data-custom']){
            page.PageSettings.customScripts.push(script);
        } else {
            page.PageSettings.scripts.push(script);
        }
    });
    let $body = $('body');
    $body.children().each(function (index, item) {
        page.Nodes = parseItem(item);
    });
    return JSON.stringify(page);
}

function ToJSON(file, enc, cb) {
    file.path = ext(file.path, '.json');
    if(file.isBuffer()){
        try {
            var contents = String(file.contents);
            var compiled = toJSON(contents);
            file.contents = new Buffer(compiled);
        } catch(e) {
            return cb(new PluginError('parser', e));
        }
    }
    cb(null, file);
};

module.exports = function() {
    return through.obj(ToJSON);
};