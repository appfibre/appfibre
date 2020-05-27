require('systemjs/dist/s.js');
require('systemjs/dist/extras/named-exports.js');
require('systemjs/dist/extras/named-register.js');
require('systemjs/dist/extras/amd.js');

window.customElements.define('layout-tabcontainer', require('../../components').layout.TabContainer.control)
window.customElements.define('layout-tab', require('../../components').layout.Tab.control)


const value = [
    'define([], function() {',
    '\treturn ({p1, p2}) => {',
    '\t\treturn Promise.resolve("Hello, World");',
    '\t};',
    '});'
].join('\n');

const editor = monaco.editor.create(document.getElementById('container'), {
    value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
    ].join('\n'),
    language: 'javascript'
});

editor.focus();
editor.setPosition({ lineNumber: 2, column: 30 });

const initialVersion = editor.getModel().getAlternativeVersionId();
let currentVersion = initialVersion;
let lastVersion = initialVersion;

editor.onDidChangeModelContent(e => {
    const versionId = editor.getModel().getAlternativeVersionId();
    // undoing
    if (versionId < currentVersion) {
        enableRedoButton();
        // no more undo possible
        if (versionId === initialVersion) {
            disableUndoButton();
        }
    } else {
        // redoing
        if (versionId <= lastVersion) {
            // redoing the last change
            if (versionId == lastVersion) {
                disableRedoButton();
            }
        } else { // adding new change, disable redo when adding new changes
            disableRedoButton();
            if (currentVersion > lastVersion) {
                lastVersion = currentVersion;
            }
        }
        enableUndoButton();
    }
    currentVersion = versionId;
});

function undo() {
    editor.trigger('aaaa', 'undo', 'aaaa');
    editor.focus();
}

function redo() {
    editor.trigger('aaaa', 'redo', 'aaaa');
    editor.focus();
}

function enableUndoButton() {
    document.getElementById("undoButton").disabled = false;
}

function disableUndoButton() {
    document.getElementById("undoButton").disabled = true;
}

function enableRedoButton() {
    document.getElementById("redoButton").disabled = false;
}

function disableRedoButton() {
    document.getElementById("redoButton").disabled = true;
}