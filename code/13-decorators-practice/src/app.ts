/// <reference path="./interfaces/drag-drop.ts" />
/// <reference path="./model/project.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./state/project-state.ts" />
/// <reference path="./validation/input-validation.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />


namespace App {

    new ProjectInput();
    new ProjectList('active');
    new ProjectList('finished');
}