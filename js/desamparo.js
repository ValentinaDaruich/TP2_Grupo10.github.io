let salida = 0;
let tam = 70;
let tamProtagonista = 70;
let sonidoSalida = [];
let pop = 0;

function preload(){
  //sonidoSalida = loadSound("sonido/desamparo.mp3");

  //Usamos un arreglo para cargar los sonidos
  for(let i = 0; i< 5; i++){
    sonidoSalida[i] = loadSound("sonido/desamparo0" + i + ".mp3");
  }
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
  ellipse((width/2) -100 - salida , height/2 + salida , tam);
  ellipse((width/2) +100 + salida , height/2 + salida , tam);
  ellipse((width/2) -100 - salida , height/2-100 - salida , tam);
  ellipse((width/2) + salida , height/2 - 100 - salida , tam);
  ellipse((width/2) + 100 + salida , height/2 - 100 - salida , tam);
  ellipse((width/2) - 100 - salida , height/2 + 100 + salida  , tam);
  ellipse((width/2) + salida  , height/2 + 100 + salida , tam);
  ellipse((width/2) + 100 + salida  , height/2 + 100 + salida , tam);

}


function touchStarted() {
  if (tamProtagonista >= 30) {
    //Reducimos el tamaño del protagonista 10 pixeles con cada tap
    tamProtagonista -=10;
    tam +=25;//Aumentamos el tamaño del entorno
    salida += 50;
    //sonidoSalida[0].play();
    sonidoSalida[pop].play();
    //for(let i = 0; i< 5; i++){
      //sonidoSalida[pop].play();
    //}
    
  } else if (salida <= 400){
    salida += 50;
    sonidoSalida[pop].play();
  } else {
    salida = 0;
    tam = 70;
    tamProtagonista = 70;
  }
  
}
//La variable pop define que sonido suena con cada tap
function touchEnded(){
  if (pop <=4){
    pop +=1;
  } else if (pop >=5){
    pop = 0;
  }
}