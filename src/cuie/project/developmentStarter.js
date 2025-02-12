import {SimpleInputController}                    from "../../kolibri/projector/simpleForm/simpleInputController.js";
import {InputProjector}                           from "../../kolibri/projector/simpleForm/simpleInputProjector.js";
import {dom}                                      from "../../kolibri/util/dom.js";
import {LOGGING_CHOICE_CSS, projectLoggingChoice} from "./loggingLevelProjector.js";

const loggingLevelController = SimpleInputController({
    value:  "INFO",
    label:  "Logging Level",
    name:   "loggingLevel",
    type:   "text",
  });

const container   = document.getElementById("loggingLevelContainer");
container.append(...projectLoggingChoice(loggingLevelController));

// allow some specific styling of the logging Choice
const [styleElement] = dom(`
      <style data-note="Dynamically inserted by loggingControl.js." >
      ${LOGGING_CHOICE_CSS}
       </style>
`);
document.head.append(styleElement);

// just for the fun of it: make a second view that synchronizes on the same controller
const { projectChangeInput } = InputProjector;
container.append(...projectChangeInput(loggingLevelController, ""));
