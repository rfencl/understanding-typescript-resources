"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
console.log(node_fs_1.default.readFileSync('./package.json', 'utf-8'));
let userName;
userName = 'Max';
console.log(userName);
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
//# sourceMappingURL=app.js.map