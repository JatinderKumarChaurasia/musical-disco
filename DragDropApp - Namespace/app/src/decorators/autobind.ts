/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file autobind.ts
 * @description Drag and Drop
 * @license none
 * 
 */

namespace App {
    // ------------------------------- Decorators Start -----------------------------------------------
    // AutoBind Decorator
    export function AutoBind(_target: any, _methodName: string | Symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjacentDescriptor: PropertyDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                const boundFunction = originalMethod.bind(this);
                return boundFunction;
            }
        };
        return adjacentDescriptor;
    }

    // --------------------------------- Decorators End -----------------------------------------------
}