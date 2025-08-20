// Decorator Function
// The autobind decorator is used to automatically bind methods to the class instance.
// It ensures that the method retains the correct context (this) when called, even if it is passed as a callback.
// This is particularly useful in event handlers where the context may change.
// The decorator modifies the method descriptor to return a bound version of the original method,
// allowing it to be called with the correct context without needing to explicitly bind it in each method
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
