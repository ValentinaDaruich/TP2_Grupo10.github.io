class Proteccion{
    constructor(){
        this.escudo = 100;
        this.tam = 70;
        this.tamProtagonista = 70;
    }
    dibujar() {
        background(255);
      
        // Protagonista rojo
        fill(255,0,0);
      
        ellipse(width/2 ,height/2 , this.tamProtagonista);
        
        //Entorno verde
        fill(0,255,0);
        ellipse((width/2) - this.escudo , height/2 - this.escudo , this.tam); //arriba izquierda
        ellipse((width/2) , height/2 - this.escudo , this.tam);//centro arriba
        ellipse((width/2) + this.escudo , height/2 - this.escudo , this.tam);//arriba derecha
        ellipse((width/2) + this.escudo , height/2 , this.tam);//segunda fila der
        ellipse((width/2) - this.escudo , height/2 , this.tam);//segunda fila iz
        ellipse((width/2) - this.escudo , height/2 + this.escudo  , this.tam);//abajo iz
        ellipse((width/2) , height/2 + this.escudo , this.tam);//centro abajo
        ellipse((width/2) + this.escudo  , height/2 + this.escudo , this.tam);//abajo der
      }

    interactua(){
        if (escudo == 100) {
            //desplazamos los circulos verdes
            escudo = 70;
            protector.play();
    }
}
    noInteractua(){
        escudo = 100;
    }

}
// function preload(){
//   protector = loadSound("sonido/proteccion.mp3");
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   noStroke();
//   ellipseMode(CENTER);
// }



// Toggle colors with each touch.
/* function touchStarted() {
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
} */