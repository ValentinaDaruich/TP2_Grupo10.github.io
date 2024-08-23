agarre = 0;
boton = false;

let drag = false;

estado = "acoso";

//let escudo = 100;
//let tam = 70;
//let tamProtagonista = 70;

function preload(){
  protector = loadSound("sonido/proteccion.mp3");
  acosadores = loadSound("sonido/acoso.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(CENTER);
  escudo = 100;
  tam = 70;
  tamProtagonista = 70;
  pxProtagonista = width / 2;
  pyProtagonista = height/ 2;
  pxAcosador = width / 2;
  pyAcosador = height/ 2;
}

function draw() {
  background(255);
  if (agarre > 0) {
      this.agarrar = true;
    }

  // Protagonista rojo
  fill(255,0,0);

  ellipse(pxProtagonista ,pyProtagonista , tamProtagonista);
  
  //Entorno verde
  fill(0,255,0);
  ellipse(pxAcosador - escudo , pyAcosador - escudo , tam); //arriba izquierda
  ellipse(pxAcosador , pyAcosador - escudo , tam);//centro arriba
  ellipse(pxAcosador + escudo , pyAcosador - escudo , tam);//arriba derecha
  ellipse(pxAcosador + escudo , pyAcosador , tam);//segunda fila der
  ellipse(pxAcosador - escudo , pyAcosador , tam);//segunda fila iz
  ellipse(pxAcosador - escudo , pyAcosador + escudo  , tam);//abajo iz
  ellipse(pxAcosador , pyAcosador + escudo , tam);//centro abajo
  ellipse(pxAcosador + escudo  , pyAcosador + escudo , tam);//abajo der
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
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
    print (agarre)
  if (agarre == 1 && escudo == 100) {
    //desplazamos los circulos verdes
    escudo = 70;
    protector.play();
  } 
  }
}

function touchMoved () {
  drag = true;
  if (touches.length ===1) {
    if (estado == "acoso") {
      Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
      if (agarre == 1 ) {
        pxProtagonista = mouseX;
        pyProtagonista = mouseY;
      } else{
        setup();
    }
	} 
}
}

//Reiniciamos la grilla
function touchEnded(){
  drag = true;
  if (estado == "proteccion") {
  escudo = 100;
    agarre = 0;
  } if (estado == "acoso"){
    pxAcosador = this.pxProtagonista;
    pyAcosador = this.pyProtagonista;
    acosadores.play();
  }
}