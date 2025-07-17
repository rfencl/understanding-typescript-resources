function process(val: unknown) {
  if (
    typeof val === 'object' &&
    !!val &&
    'log' in val &&
    typeof val.log === 'function'
  ) {
    val.log();
  }
}

class MyClass {
  log(): void {
    console.log('Logging from MyClass');
  }
}

const myInstance = new MyClass();
process(myInstance); // This will log: Logging from MyClass 

type AnotherType = {
  log(): void;
}

const anotherInstance: AnotherType = {
  log: () => {
    console.log('Logging from AnotherType');
  }
};

process(anotherInstance); // This will log: Logging from AnotherType

