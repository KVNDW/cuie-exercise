import {dom} from "../../kolibri/util/dom.js"
import {
    LOG_TRACE, LOG_DEBUG, LOG_INFO, LOG_WARN,
    LOG_ERROR, LOG_FATAL, LOG_NOTHING,
    toString,
} from "../../kolibri/logger/logLevel.js";

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
    const logLevels = [
        LOG_NOTHING, LOG_FATAL, LOG_ERROR, LOG_WARN, LOG_INFO, LOG_DEBUG, LOG_TRACE
    ];
    const [label, wrapper] = dom(`
  <label for="${id}"></label>
          
  <div class="grid-container">
  
    <div class="spacertop"></div>
    <div class="spacerleft"></div>
   

        
          <output id="textID-${id}" class="text-logLevel"></output>
        
        <div class="slider-container">
          <input type="range" id="sliderID-${id}" class="slider" min="0" max="6">
        </div>
        
       <div class="slider-lines">
        <div class="slider-line"></div>
        <div class="slider-line"></div>
        <div class="slider-line"></div>
        <div class="slider-line"></div>
        <div class="slider-line"></div>
        <div class="slider-line"></div>
        <div class="slider-line"></div>
      </div>
 
      
      <img class="img" id="imageID-${id}" src="images/${id}.png" class="image" alt="Image description" width="100" height="100">
     
      <div class="led-container">

        <div class="current-level">
            <div class="led" id="led6"></div>
            <div><span class="led-label">Trace</span></div>
        </div>
        <div class="current-level">
            <div class="led" id="led5"></div>
             <span class="led-label">Debug</span>
        </div>
        <div class="current-level">
            <div class="led" id="led4"></div>
             <span class="led-label">Info</span>
        </div>
        <div class="current-level">
            <div class="led" id="led3"></div>
             <span class="led-label">Warn</span>
        </div>
        <div class="current-level">
            <div class="led" id="led2"></div>
             <span class="led-label">Error</span>
            
        </div>

        <div class="current-level">
            <div class="led" id="led1"></div>
            <span class="led-label">Fatal</span>
        </div>
        
        <div class="current-level">
            <div class="led" id="led0"></div>
            <span class="led-label">Nothing</span>
        </div>

      </div>
           
  </div> 
  `);

    //
    const slider = wrapper.querySelector(`#sliderID-${id}`);
    const output = wrapper.querySelector(`#textID-${id}`);
    const image = wrapper.querySelector(`#imageID-${id}`);
    const led0 = wrapper.querySelector(`#led0`);
    const led1 = wrapper.querySelector(`#led1`);
    const led2 = wrapper.querySelector(`#led2`);
    const led3 = wrapper.querySelector(`#led3`);
    const led4 = wrapper.querySelector(`#led4`);
    const led5 = wrapper.querySelector(`#led5`);
    const led6 = wrapper.querySelector(`#led6`);


    console.log("loggingLevelProjector.js loaded successfully");
    // data binding

    //dk: wrapper is your div that contains the control.
    // .. It has no value property that you could use for the data binding.
    // .. Here is the point where the binding falls short because the initial value as well as any external
    // .. changes to the log level are not reflected in the view.
    loggingLevelController.onValueChanged(levelStr => wrapper.value = levelStr);
    loggingLevelController.onLabelChanged(labelStr => label.textContent = /** @type { String } */ labelStr);

    // view binding

    slider.oninput = _event => {
        loggingLevelController.setValue(toString(logLevels[slider.value]));
        output.value = toString(logLevels[slider.value]);
        image.src = `images/${slider.value}.png`;
        callLed()

    };


    const callLed = () => {
        if (slider.value === 0) {                   // better put magic values into constants
            changeDesign(led0, "#2D009B", false);   // better put static color values into constants


        } else {
            changeDesign(led0, "grey", true);
        }

        if (slider.value >= 1) {
            changeDesign(led1, "red", false);

        } else {
            changeDesign(led1, "grey", true);
        }

        if (slider.value >= 2) {
            changeDesign(led2, "#FF9E13", false);

        } else {
            changeDesign(led2, "grey", true);
        }


        if (slider.value >= 3) {
            changeDesign(led3, "yellow", false);

        } else {
            changeDesign(led3, "grey", true);
        }

        if (slider.value >= 4) {
            changeDesign(led4, "#26FF2C", false);

        } else {
            changeDesign(led4, "grey", true);
        }

        if (slider.value >= 5) {
            changeDesign(led5, "#0E11FF", false);


        } else {
            changeDesign(led5, "grey", true);
        }

        if (slider.value >= 6) {
            changeDesign(led6, "#FA1BFE", false);
        } else {
            changeDesign(led6, "grey", true);
        }

    };

    const changeDesign = (currentLed, colorValue, off) => {
        currentLed.style.backgroundColor = colorValue;
        currentLed.style.boxShadow = "0 0 10px 2px " + colorValue;
        if (off) {
            currentLed.style.boxShadow = "0 0 10px 2px " + "transparent";
        }
    };

    return [label, wrapper];
};

const LOGGING_CHOICE_CSS = `

.grid-container {
  font-family: Verdana;
  display: grid;
  grid-template-columns:  35px auto auto 2px; 
  grid-template-rows: auto auto auto auto auto auto auto auto auto;

  padding: 0.5em;
  background-color: #030303;
  background-image: radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.8));
  grid-column: 0/12;
  grid-row: 0/12;
  width: 502px;
  height: 575px;
}


.text-logLevel{
  color: white;
  grid-column: 2/3;
  grid-row: 1/2;
  margin: 20px;
  margin-left: 6em;
  
  width: 2em;
  }


.slider-container {
    display:flex;
    align-items: start;
    justify-content:start;
    transform: rotate(-90deg);
    grid-column: 1/2;
    grid-row: 2/ 9;
    height: 40px;
    width: 355px;
    margin-top: 9.7em;
}

.slider {
  -webkit-appearance: none;
  background: linear-gradient(to bottom, #000000 1%, #353535 100%);
  border-radius: 8px;
  width: 355px;
  height: 10px;
}


/* Webkit (Chrome, Safari) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 2.5em;
  height: 5em;
  background: linear-gradient(to right, #000000, #777777, #82827E, #000010);
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
}

/* Firefox */
.slider::-moz-range-thumb {
  -moz-appearance: none;
  width: 2.5em;
  height: 5em;
  background: linear-gradient(to right, #000000, #777777, #82827E, #000010);
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
}

/* IE */
.slider::-ms-thumb {
  -ms-appearance: none;
  width: 2.5em;
  height: 5em;
  background: linear-gradient(to right, #000000, #777777, #82827E, #000010);
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
}

.slider-lines {
  grid-column: 2/3;
  grid-row: 2/9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 12em;
  margin-right: 3em;
  margin-bottom:1.5em;
}

.slider-line {
  width: 20px;
  height: 1px;
  border-radius:1px;
  background-color: #8C91A1;
  margin-bottom: 3.25em;
}

.slider-line:first-child {
  margin-top: auto;
}

.slider-line:last-child {
  margin-bottom: auto;
}



.grid-container .img {
  grid-column: 3/4;
  grid-row: 1/2;
  margin: 20px;
  width: 150px;
  height: 150px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2) !important;
}


.led-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 20px;
  grid-column: 3/4;
  grid-row: 2/9;
}


.led {
  width: 3em;
  height: 1.8em;;
  margin-bottom: 1em;
  background-color:gray;
  border: 0.05em solid rgb(120, 120, 120);
}


.current-level {
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
}

#led1{
    background-color:#2D009B;
    box-shadow: 0 0 10px 2px#2D009B;
}

.led-label {
  margin-left: 0.5em;
  color: #DDE1EF;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7) inset;
}
`;



