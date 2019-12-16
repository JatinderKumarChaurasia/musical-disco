/**
 * 
 * @author Jatinder Kumar Chaurasia
 * @file app.ts
 * @description Drag and Drop
 * @license none
 * 
 */

// '///' is a special syntax or special comment to get namespaces contents

import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';



// ------------------------ Object Execution ------------------------------------------------------

new ProjectInput();
new ProjectList('active');
new ProjectList('completed');


