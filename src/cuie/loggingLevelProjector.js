import { dom }   from "../kolibri/util/dom.js"
import {
  LOG_TRACE, LOG_DEBUG, LOG_INFO, LOG_WARN,
  LOG_ERROR, LOG_FATAL, LOG_NOTHING,
  toString,
}                             from "../kolibri/logger/logLevel.js";
import { shadowColor }        from "../kolibri/style/kolibriStyle.js";

export {
  projectLoggingChoice, LOGGING_CHOICE_CSS
}

let idPostfix = 0; // makes sure we have unique ids in case of many such controls

/**
 * Example Projector for a logging choice.
 *
 * @param   { SimpleInputControllerType<String> }  loggingLevelController
 * @return  { Array<Element> }
 */
const projectLoggingChoice = loggingLevelController => {
  const id = `loggingLevels-${idPostfix++}`;
  const [label, select] = dom(`
          <label for="${id}"></label>
          <select name="levels" id="${id}" class="my-cuie-special">
            <option value="${toString(LOG_TRACE)}"  > ${toString(LOG_TRACE)}  </option>
            <option value="${toString(LOG_DEBUG)}"  > ${toString(LOG_DEBUG)}  </option>
            <option value="${toString(LOG_INFO)}"   > ${toString(LOG_INFO)}   </option>
            <option value="${toString(LOG_WARN)}"   > ${toString(LOG_WARN)}   </option>
            <option value="${toString(LOG_ERROR)}"  > ${toString(LOG_ERROR)}  </option>
            <option value="${toString(LOG_FATAL)}"  > ${toString(LOG_FATAL)}  </option>
            <option value="${toString(LOG_NOTHING)}"> ${toString(LOG_NOTHING)}</option>
          </select> 
          
         
  `);

  console.log("loggingLevelProjector.js loaded successfully");
  // data binding
  loggingLevelController.onValueChanged(levelStr => select.value = levelStr);
  loggingLevelController.onLabelChanged(labelStr => label.textContent = /** @type { String } */ labelStr);

  // view binding
  select.onchange = _event => loggingLevelController.setValue(select.value);

  return [label, select];
};

const LOGGING_CHOICE_CSS = `
  select.my-cuie-special {
    filter: drop-shadow(.2em .2em 0.3em ${shadowColor});
  };
`;
