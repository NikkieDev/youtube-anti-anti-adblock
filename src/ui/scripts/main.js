const listeners = require('./listeners');
const userdata = require('./data');

(function() {
    'use strict'
    
    userdata.update();
    listeners.set();
})();