// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId:any, label:any) {
        alert(label);
      if (label === "json") {
        return "../node_modules/monaco-editor/esm/vs/language/json/json.worker.js";
      }
      if (label === "css") {
        return "./css.worker.bundle.js";
      }
      if (label === "html") {
        return "./html.worker.bundle.js";
      }
      if (label === "typescript" || label === "javascript") {
        return "./ts.worker.bundle.js";
      }
      return "./editor.worker.bundle.js";
    }
  };


var editor = monaco.editor.create(document.getElementById('container'), {
    value: [
      'function x() {',
      '\tconsole.log("Hello world!");',
      '}'
    ].join('\n'),
    language: 'json'
  });