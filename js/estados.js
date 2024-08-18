let estado = "proteccion";
let proteccion;

function preload(){
    protector = loadSound("sonido/proteccion.mp3");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    noStroke();
    ellipseMode(CENTER);

    proteccion = new Proteccion();
}

function draw(){
    proteccion.dibujar();
}
function touchStarted() {
    if (estado == proteccion){
        /* if (proteccion.escudo == 100) {
            //desplazamos los circulos verdes
            proteccion.escudo = 70;
            protector.play(); */
            proteccion.interactua();
          } else {
            //escudo = 100;
          }
    } 
   
  //Reiniciamos la grilla
  function touchEnded(){
    if (estado == proteccion){
        //proteccion.escudo = 100;
        proteccion.noInteractua();
    }
    
  }