// breakable.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013-2014 Olov Lassus <olov.lassus@gmail.com>

var breakable = (function() {
    "use strict";

    function Val(val, id) {
        this.val = val;
        this.id = id;
    }

    function make_brk(id) {
        return function brk(val) {
            throw new Val(val, id);
        };
    }

    function breakable(fn) {
        var id = {};
        try {
            return fn(make_brk(id));
        } catch (e) {
            if (e instanceof Val && e.id === id) {
                return e.val;
            }
            throw e;
        }
    }

    return breakable;
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = breakable;
}
