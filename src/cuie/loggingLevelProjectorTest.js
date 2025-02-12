import {TestSuite}              from "../kolibri/util/test.js";
import {SimpleInputController}  from "../kolibri/projector/simpleForm/simpleInputController.js";
import {projectLoggingChoice}   from "./loggingLevelProjector.js";
import {fireChangeEvent}        from "../kolibri/util/dom.js";

const loggingLevelProjectorSuite = TestSuite("cuie/loggingLevelProjector");

/**
 * The purpose of this binding spike is not to test all possible user interactions and their outcome but rather
 * making sure that the view construction and the binding is properly set up.
 * Complex logic is to be tested against the controller (incl. model).
 */
loggingLevelProjectorSuite.add("binding", assert => {
    const controller = SimpleInputController({
        value:  "INFO",
        label:  "Text",
        name:   "text",
        type:   "text",
    });
    const [_labelElement, selectElement] = projectLoggingChoice(controller);

    assert.is(selectElement["value"], "INFO");

    // view binding
    selectElement.children[0].selected = true;
    assert.is(selectElement["value"], "TRACE");
    fireChangeEvent(selectElement);
    assert.is(controller.getValue(), "TRACE");

    // controller binding
    controller.setValue("DEBUG");
    assert.is(selectElement["value"], "DEBUG");

});


loggingLevelProjectorSuite.run();
