import {TestSuite}              from "../../kolibri/util/test.js";
import {SimpleInputController}  from "../../kolibri/projector/simpleForm/simpleInputController.js";
import {projectLoggingChoice}   from "./loggingLevelProjector.js";
import {fireChangeEvent}        from "../../kolibri/util/dom.js";

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
    const [_labelElement, divElement] = projectLoggingChoice(controller);

    assert.is(divElement.querySelector("#sliderID-loggingLevels-0")["value"], "3"); // dk: would be nice to have constants for these values

    // view binding
    divElement.querySelector("#sliderID-loggingLevels-0")["value"] = 0;
    fireChangeEvent(divElement);
    assert.is(divElement.querySelector("#sliderID-loggingLevels-0")["value"], "0");

    // controller binding
    controller.setValue("DEBUG");
    assert.is(divElement["value"], "DEBUG"); // dk: this does not assert a proper display of the log level

});


loggingLevelProjectorSuite.run();
