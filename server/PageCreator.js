class PageCreator {
    constructor(page) {
        this.page = page;
    }

    createNode(item) {
        let cls = item.cls.join(' ');
        let attrs = this.getAttrs(item.attrs);
        let node = `<${item.tag} class="${cls}"${attrs}>`;

        if (item.children && Array.isArray(item.children)) {
            item.children.forEach(item => {
                node += this.createNode(item);
            })
        }

        if (item.children && typeof item.children === 'string') {
            node += item.children;
        }

        node += `</${item.tag}>`;

        return node;
    }

    getAttrs(attrs) {
        let attributes = '';

        for (let prop in attrs) {
            attributes += ` ${prop}="${attrs[prop]}"`;
        }

        return attributes;
    }

    makeMarkup() {
        let PageSettings = this.page['PageSettings']['settings'];
        let Markup = this.page['Markup']['nodes'];
        let keywords = PageSettings['keywords']['content'];
        let description = PageSettings['description']['content'];
        let title = PageSettings['title'];
        let output = `<html><head>
            <title>${title}</title>
            <meta name="keywords" content="${keywords}" />
            <meta name="description" content="${description}" />
        `;

        PageSettings['metas'].forEach(item => {
            let attrs = this.getAttrs(item);

            output += `<meta${attrs}>`;
        });

        PageSettings['links'].forEach(item => {
            let attrs = this.getAttrs(item);

            output += `<link${attrs}>`;
        });

        PageSettings['scripts'].forEach(item => {
            let attrs = this.getAttrs(item);

            output += `<script${attrs}></script>`;
        });

        output += `</head><body>`;
        output += this.createNode(Markup);

        PageSettings['customScripts'].forEach(item => {
            let src = item.type === 'url' ? ` src="${item.content}"` : "";
            let content = item.type === 'code' ? item.content : "";

            output += `<script${src}>${content}</script>`;
        });

        output += `</body></html>`;

        return output;
    }
}

export default PageCreator;