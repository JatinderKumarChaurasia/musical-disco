/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file drag-drop.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// --------------------------------- DragDrop -----------------------------------------------------

namespace App {
    // interfaces

    export interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }

}
