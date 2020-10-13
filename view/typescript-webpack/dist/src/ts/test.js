"use strict";
//import {jQuery as $} from '@types/jquery'
Object.defineProperty(exports, "__esModule", { value: true });
exports.jq2 = exports.jq = void 0;
function jq(selector) {
    console.log($(selector));
}
exports.jq = jq;
exports.jq2 = function (callback) {
    $(function () {
        console.log('a', this);
        console.log('b', window);
        callback && callback();
    });
};
//# sourceMappingURL=test.js.map