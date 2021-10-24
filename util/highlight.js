const hljs = require('../node_modules/highlight.js/lib/highlight');
hljs.registerLanguage('typescript', require('../node_modules/highlight.js/lib/languages/typescript'));
hljs.registerLanguage('json', require('../node_modules/highlight.js/lib/languages/json'));
module.exports = hljs;