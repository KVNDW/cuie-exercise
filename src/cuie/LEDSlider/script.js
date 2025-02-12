const slider = document.getElementById("mySlider");
const led1 = document.getElementById("led1");
const led2 = document.getElementById("led2");
const led3 = document.getElementById("led3");
const led4 = document.getElementById("led4");
const led5 = document.getElementById("led5");
const led6 = document.getElementById("led6");
const led7 = document.getElementById("led7");
const catImage = document.getElementById("catImage");
const levelTextShow = document.getElementById("level-text-show");


const ledChange = () => {

  if (slider.value == 0) {
    changeDesign(led1,"#2D009B",false);
    changeImage(slider.value);
    changeLevelTextShow("Nothing");

  } else {
    changeDesign(led1,"grey",true);
  }

  if (slider.value >= 1) {
    changeDesign(led2,"red",false);
    changeImage(slider.value);
    changeLevelTextShow("Fatal");
  } else {
    changeDesign(led2,"grey",true);
  }

  if (slider.value >= 2) {
    changeDesign(led3,"#FF9E13",false);
    changeImage(slider.value);
    changeLevelTextShow("Error");
  } else {
    changeDesign(led3,"grey",true);
  }


  if (slider.value >= 3) {
    changeDesign(led4,"yellow",false);
    changeImage(slider.value);
    changeLevelTextShow("Warning");
  } else {
    changeDesign(led4,"grey",true);
  }

  if (slider.value >= 4) {
    changeDesign(led5,"#26FF2C",false);
    changeImage(slider.value);
    changeLevelTextShow("Info");
  } else {
    changeDesign(led5,"grey",true);
  }

  if (slider.value >= 5) {
    changeDesign(led6,"#0E11FF",false);
    changeImage(slider.value);
    changeLevelTextShow("Debug");

  } else {
    changeDesign(led6,"grey",true);
  }

  if (slider.value >= 6) {
    changeDesign(led7,"#FA1BFE",false);
    changeImage(slider.value);
    changeLevelTextShow("Trace");
  } else {
    changeDesign(led7,"grey",true);
  }

}

const changeDesign = (currentLed, colorValue,off) => {
  currentLed.style.backgroundColor = colorValue;
  currentLed.style.boxShadow = "0 0 10px 2px " +colorValue;
  if(off){
    currentLed.style.boxShadow = "0 0 10px 2px " +"transparent";
  }
}

const changeImage=(imageid) =>{
  catImage.src = "images/"+imageid+".png";
}

const changeLevelTextShow=(currentlevel)=>{
  levelTextShow.textContent = currentlevel;
}
slider.addEventListener("input", ledChange );

