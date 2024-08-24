agarre = 0;
boton = false;

let drag = false;      //acoso

let salida = 0;        //desamparo
let sonidoSalida = []; //desamparo
let pop = 0;           //desamparo

estado = "menu";
let tamGrillaBtn;
let menu = [];
/* let columnas = 3;
let filas = 3;
let tamXbtn = 100;
let tamYbtn = 100;
let calle = 100;
 */
//let escudo = 100;
//let tam = 70;
//let tamProtagonista = 70;

function preload(){
  protector = loadSound("sonido/proteccion.mp3");
  acosadores = loadSound("sonido/acoso.mp3");
  soberbio = loadSound("sonido/soberbio.mp3");
  //Usamos un arreglo para cargar los sonidos de desamparo
  for(let i = 0; i< 5; i++){
    sonidoSalida[i] = loadSound("sonido/desamparo0" + i + ".mp3");
}
  for(let i = 0; i< 9; i++){
    menu[i] = loadImage("img/btn-menu" + i + ".png");
  }
  inicio = loadImage("img/inicio.png");
  siguiente = loadImage("img/flecha.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(CENTER);
  imageMode (CENTER);
  escudo = 100;
  tam = 70;
  tamProtagonista = 70;
  pxProtagonista = width / 2;
  pyProtagonista = height/ 2;
  pxAcosador = width / 2;
  pyAcosador = height/ 2;
  columnas = 3;
  filas = 3;
  tamXbtn = 150;
  tamYbtn = 150;
  calle = 200;
  tamIcono = 80;
  //tamGrillaBtn;
}

function draw() {
  background(255);
  if (agarre > 0) {
      this.agarrar = true;
    } 
    if (estado == "menu") {
      image(menu[0],pxAcosador - calle , pyAcosador - calle , tamXbtn, tamYbtn); //arriba izquierda
      image(menu[1],pxAcosador , pyAcosador - calle , tamXbtn, tamYbtn);//centro arriba
      image(menu[2],pxAcosador + calle , pyAcosador - calle , tamXbtn, tamYbtn);//arriba derecha
      image(menu[3],pxAcosador + calle , pyAcosador , tamXbtn, tamYbtn);//segunda fila der
      image(menu[4],pxProtagonista ,pyProtagonista , tamXbtn, tamYbtn);// segunda fila centro
      image(menu[5],pxAcosador - calle , pyAcosador , tamXbtn, tamYbtn);//segunda fila iz
      image(menu[6],pxAcosador - calle , pyAcosador + calle  , tamXbtn, tamYbtn);//abajo iz
      image(menu[7],pxAcosador , pyAcosador + calle , tamXbtn, tamYbtn);//centro abajo
      image(menu[8],pxAcosador + calle  , pyAcosador + calle , tamXbtn, tamYbtn);//abajo der
   /*   tamGrillaBtn = tamXbtn + calle;
      let startX = (width - tamGrillaBtn * (columnas - 1)) / 2;
      let startY = (height - tamGrillaBtn * (filas - 1)) / 2; 
  
   for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let x = startX + i * tamGrillaBtn;
      let y = startY + j * tamGrillaBtn;
      image(menu[i], x , y, tamXbtn, tamYbtn);
    }
  } */
}
if (estado == "empatia" || estado == "acoso" || estado == "desamparo" || estado == "soberbia" ||
estado == "proteccion" || estado == "discriminación"|| estado == "desinteres" || estado == "desamparo" || estado == "mediacion") {
  image(inicio,width - 100 , 100 , tamIcono, tamIcono); //btn para volver al menú
}
  if (estado == "proteccion" || estado == "acoso" || estado == "soberbia") {
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
  if (estado == "desamparo") {
    // Protagonista rojo
  fill(255,0,0);

  ellipse(pxProtagonista ,pyProtagonista , tamProtagonista);
  
  //Entorno verde
  fill(0,255,0);
  ellipse(pxAcosador -100 - salida , pyAcosador + salida , tam);
  ellipse(pxAcosador +100 + salida , pyAcosador + salida , tam);
  ellipse(pxAcosador -100 - salida , pyAcosador-100 - salida , tam);
  ellipse(pxAcosador + salida , pyAcosador - 100 - salida , tam);
  ellipse(pxAcosador + 100 + salida , pyAcosador - 100 - salida , tam);
  ellipse(pxAcosador - 100 - salida , pyAcosador + 100 + salida  , tam);
  ellipse(pxAcosador + salida  , pyAcosador + 100 + salida , tam);
  ellipse(pxAcosador + 100 + salida  , pyAcosador + 100 + salida , tam);
  }

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
  print (estado)
  if (estado == "menu") {
    //empatia
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
    //acoso
    Objeto(pxAcosador , pyAcosador - calle , tamXbtn, tamYbtn, 2);
    //desamparo
    Objeto(pxAcosador + calle , pyAcosador - calle , tamXbtn, tamYbtn, 3);
    //soberbia
    Objeto(pxAcosador - calle , pyAcosador , tamXbtn, tamYbtn, 4);
    //proteccion
    Objeto(pxProtagonista ,pyProtagonista , tamXbtn, tamYbtn, 5);
    //discriminacion
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 6);
    //desinteres
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 7);
    //desamparo
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 8);
    //mediacion
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 9);

  if (agarre == 1 ) {
    //cargamos el estado
    estado = "empatia";
  } 
  if (agarre == 2 ) {
    estado = "acoso";
  }
  if (agarre == 3 ) {
    estado = "desamparo";
  }  
  if (agarre == 4 ) {
    estado = "soberbia";
  } 
  if (agarre == 5 ) {
    estado = "proteccion";
  } 
  }
  //Botones o áreas interactivas en el estado de cada concepto
  if (estado == "acoso") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 3);
    if (agarre == 3 ) {
      estado = "menu"
    }
  }
  if (estado == "proteccion") {
    //protagonista
     Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
     Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
    print (agarre)
  if (agarre == 1 ){
    if (escudo == 100) { 
      //desplazamos los circulos verdes
      this.escudo = 70;
      protector.play();
      print (escudo)
  } else{
    escudo = 100;
  }
  } if (agarre == 2 ) {
    estado = "menu"
  }
  } if (estado == "desamparo") {
    //protagonista
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
  if (agarre == 1 ) {
    if (tamProtagonista >= 30) {
      //Reducimos el tamaño del protagonista 10 pixeles con cada tap
      tamProtagonista -=10;
      tam +=25;//Aumentamos el tamaño del entorno
      salida += 50;
      sonidoSalida[pop].play();
    } else if (salida <= 350){
      salida += 50;
      sonidoSalida[pop].play();
    } if (salida >=350) {
      salida = 0;
      tam = 70;
      tamProtagonista = 70;
    }
  } if (agarre == 2 ) {
    estado = "menu"
  }
  } if (estado == "soberbia") {
    //protagonista
    Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
  if (agarre == 1 ) {
    if (tamProtagonista <= 120) {
      //Aumentamos el tamaño 10 pixeles con cada tap
      tamProtagonista +=10;
      soberbio.play();
    } else if (tamProtagonista >=120){
      tamProtagonista = 70;
    }
  } if (agarre == 2 ) {
    estado = "menu"
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
      }
	} 
}
}

//Reiniciamos la grilla
function touchEnded(){
  //drag = false;
  agarre = 0;
  if (estado == "proteccion") {
    escudo = 100;
    print (escudo)
  } if (estado == "acoso" ){
    pxAcosador = this.pxProtagonista;
    pyAcosador = this.pyProtagonista;
    acosadores.play();
  }
  if (estado == "desamparo"){
    if (pop <=4){
      pop +=1;
    } else if (pop >=5){
      pop = 0;
    }
  }
}