
// entrypoint for data-capture
// this is where modules should be `require(...)`'d

require('babel-polyfill/dist/polyfill');

require('../common/dap-hacks');
require('./upload');
require('./ajaxform');
require('./alerts');
require('./expandable-area');
require('./date');
require('./smooth-scroll');
require('./modal-dialogs');
require('./edit-details-form-enhance');
