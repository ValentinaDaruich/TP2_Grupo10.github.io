agarre = 0;
boton = false;

estado = "proteccion";

//let escudo = 100;
//let tam = 70;
//let tamProtagonista = 70;

function preload(){
  protector = loadSound("sonido/proteccion.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(CENTER);
  escudo = 100;
  tam = 70;
  tamProtagonista = 70;
}

function draw() {
  background(255);
  if (agarre > 0) {
      this.agarrar = true;
    }

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


//FUNCION PARA DEFINIR EL ÁREA INTERACTIVA
function Objeto(objX_, objY_, tamX_, tamY_, agarrado_) { 

  objX = objX_;
  objY = objY_;
  tamX = tamX_;
  tamY = tamY_;

  if (
    mouseX > objX - tamX / 2 &&
    mouseX < objX + tamX / 2 &&
    mouseY > objY - tamY / 2 &&
    mouseY < objY + tamY / 2
  ) {
    boton = true;
    agarre = agarrado_;
  }
}

function touchStarted() {
  if (estado == "proteccion") {
    //protagonista
    Objeto(width/2 ,height/2 , tamProtagonista, tamProtagonista, 1);
    print (agarre)
  if (agarre == 1 && escudo == 100) {
    //desplazamos los circulos verdes
    escudo = 70;
    protector.play();
  } 
  }
}

//Reiniciamos la grilla
function touchEnded(){
  if (estado == "proteccion") {
  escudo = 100;
    agarre = 0;
  }
}