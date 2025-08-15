"use strict";
// // see the class-validators package for more information and examples
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
function logger(// Class decorator
// This decorator logs the class and its context when the class is defined
// and wraps the class constructor to log when an instance is created
// It can be used to add logging functionality to any class
// It can also be used to modify the class behavior
// e.g., adding properties or methods
// but it is not recommended to modify the class prototype directly
// as it can lead to unexpected behavior
// and it is not type-safe
// so it is better to use class decorators
target, ctx) {
    console.log('logger decorator');
    console.log(target);
    console.log(ctx);
    return class extends target {
        constructor(...args) {
            super(...args);
            console.log('class constructor');
            console.log(this);
        }
    };
}
function autobind(target, ctx) {
    ctx.addInitializer(function () {
        this[ctx.name] = this[ctx.name].bind(this);
    });
    console.log(`target:${target}`);
    console.log('ctx:', ctx);
    console.log(`Hey Man! ${JSON.stringify(ctx)}`);
    return function () {
        console.log('Executing original function');
        target.apply(this);
    };
}
function replacer(initValue) {
    return function replacerDecorator(target, ctx) {
        console.log(target);
        console.log(ctx);
        return (initialValue) => {
            console.log(initialValue);
            return initValue;
        };
    };
}
let Person = (() => {
    let _classDecorators = [logger];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _greet_decorators;
    var Person = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [replacer('')];
            _greet_decorators = [autobind];
            __esDecorate(this, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: obj => "greet" in obj, get: obj => obj.greet }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            Person = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, 'Max'));
        greet() {
            console.log('Hi, I am ' + this.name);
        }
        constructor() {
            __runInitializers(this, _name_extraInitializers);
        }
    };
    return Person = _classThis;
})();
const max = new Person();
const greet = max.greet;
greet();
