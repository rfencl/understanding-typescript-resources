// // see the class-validators package for more information and examples

function logger<T extends new (...args: any[]) => any>(  // Class decorator
  // This decorator logs the class and its context when the class is defined
  // and wraps the class constructor to log when an instance is created
  // It can be used to add logging functionality to any class
  // It can also be used to modify the class behavior
  // e.g., adding properties or methods
  // but it is not recommended to modify the class prototype directly
  // as it can lead to unexpected behavior
  // and it is not type-safe
  // so it is better to use class decorators

  target: T,
  ctx: ClassDecoratorContext
) {
  console.log('logger decorator');
  console.log(target);
  console.log(ctx);

  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log('class constructor');
      console.log(this);
    }
  };
}

function autobind(
  target: (...args: any[]) => any,
  ctx: ClassMethodDecoratorContext
) {
  ctx.addInitializer(function (this: any) {
    this[ctx.name] = this[ctx.name].bind(this);
  });
  console.log(`target:${target}`);
  console.log('ctx:', ctx);
  console.log(`Hey Man! ${JSON.stringify(ctx)}`);
  return function (this: any) {
    console.log('Executing original function');
    target.apply(this);
  };
}

function replacer<T>(initValue: T) {
  return function replacerDecorator(
    target: undefined,
    ctx: ClassFieldDecoratorContext
  ) {
    console.log(target);
    console.log(ctx);

    return (initialValue: any) => {
      console.log(initialValue);
      return initValue;
    };
  };
}

@logger
class Person {
  @replacer('')
  name = 'Max';

  @autobind
  greet() {
    console.log('Hi, I am ' + this.name);
  }
}

const max = new Person();
const greet = max.greet;
greet();

