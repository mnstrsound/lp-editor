let containers = ['container', 'row'];
let notPairTags = ['img', 'input', 'hr'];

export function isServer() {
    return !!window;
}

export function isPairTag(tagName) {
    return notPairTags.indexOf(tagName) == -1;
}

export function isColumn(className) {
    return className.indexOf('col-') !== -1;
}

export function isContainer(className) {
    return containers.indexOf(className) !== -1;
}

export function isGridClass(className) {
    return isContainer(className) || isColumn(className);
}

export function immutableChanges(modelPath, value) {
    var path = modelPath.split('.');
}