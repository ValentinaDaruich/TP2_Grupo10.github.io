let escudo = 100;
let tam = 70;
let tamProtagonista = 70;

function preload(){
  protector = loadSound("sonido/proteccion.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(CENTER);
}

function draw() {
  background(255);

  // Protagonista rojo
  fill(255,0,0);

  ellipse(width/2 ,height/2 , tamProtagonista);
  
  //Entorno verde
  fill(0,255,0);
  ellipse((width/2) - escudo , height/2 - escudo , tam); //arriba izquierda
  ellipse((width/2) , height/2 - escudo , tam);//centro arriba
  ellipse((width/2) + escudo , height/2 - escudo , tam);//arriba derecha
  ellipse((width/2) + escudo , height/2 , tam);//segunda fila der
  ellipse((width/2) - escudo , height/2 , tam);//segunda fila iz
  ellipse((width/2) - escudo , height/2 + escudo  , tam);//abajo iz
  ellipse((width/2) , height/2 + escudo , tam);//centro abajo
  ellipse((width/2) + escudo  , height/2 + escudo , tam);//abajo der
}

// Toggle colors with each touch.
function touchStarted() {
  if (escudo == 100) {
    //desplazamos los circulos verdes
    escudo = 70;
    protector.play();
  } else {
    //escudo = 100;
  }
}

//Reiniciamos la grilla
function touchEnded(){
  escudo = 100;
}