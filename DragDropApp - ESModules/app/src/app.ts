/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file app.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// '///' is a special syntax or special comment to get namespaces contents

/// <reference path='models/drag-drop.ts' />
/// <reference path='models/project.ts' />
/// <reference path='state/project-state.ts' />
/// <reference path='utils/validation.ts' />
/// <reference path='decorators/autobind.ts' />
/// <reference path='components/base-component.ts' />
/// <reference path='components/project-item.ts' /> 
/// <reference path='components/project-list.ts' />
/// <reference path='components/project-input.ts' />

namespace App {

    // ------------------------ Object Execution ------------------------------------------------------

    new ProjectInput();
    new ProjectList('active');
    new ProjectList('completed');
}
