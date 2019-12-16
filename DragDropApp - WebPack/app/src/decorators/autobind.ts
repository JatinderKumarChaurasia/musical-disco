/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file autobind.ts
 * @description Drag and Drop
 * @license none
 * 
 */


// ------------------------------- Decorators Start -----------------------------------------------
// AutoBind Decorator
export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjacentDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjacentDescriptor;
}

    // --------------------------------- Decorators End -----------------------------------------------
