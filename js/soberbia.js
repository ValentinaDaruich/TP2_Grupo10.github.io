// Definimos una variable para posicionar las elipses

let value = 0;
let tam = 70;
let tamProtagonista = 70;

function preload(){
  soberbio = loadSound("sonido/soberbio.mp3");
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
  ellipse((width/2)-100 , height/2, tam);
  ellipse((width/2)+100 ,height/2 , tam);
  ellipse((width/2)-100 ,height/2-100 , tam);
  ellipse((width/2) , height/2 - 100 , tam);
  ellipse((width/2)+ 100 , height/2 - 100 , tam);
  ellipse((width/2) - 100 , height/2 + 100 , tam);
  ellipse((width/2) , height/2 + 100 , tam);
  ellipse((width/2) + 100 , height/2 + 100 , tam);
}


function touchStarted() {
  if (tamProtagonista <= 120) {
    //Aumentamos el tamaño 10 pixeles con cada tap
    tamProtagonista +=10;
    soberbio.play();
  } else if (tamProtagonista >=120){
    tamProtagonista = 70;
  }
}