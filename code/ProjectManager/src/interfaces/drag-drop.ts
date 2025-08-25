// Drag & Drop Interfaces
// These interfaces define the methods required for drag-and-drop functionality.
// Draggable interface is for elements that can be dragged,
// while DragTarget interface is for elements that can accept dropped items.
// They ensure that classes implementing these interfaces provide the necessary methods for handling drag events.
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
