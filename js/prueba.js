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
let cols = 3;
let rows = 3;
let diameter = 70;
let spacing = 50;
let gridSize;
let centers = [];
let greenCircles = [];
let redCircle;
let dragging = false;
let redSound, greenSound;
//mediación
let speed = [];
let positions = [];
let targets = [];
let centersMediacion;
let middleCol = 1; // Columna del medio
let verdesSound, rojosSound;
//empatia
let circles = [];
let draggingCircle = null;
let sound;
//desinteres
let maxDiameter = 120;
let desinteresSonido;
//discriminacion
let grid = [];
let circleSize = 70;
let soundDiscriminacion;

function preload(){
  protector = loadSound("sonido/proteccion.mp3");
  acosadores = loadSound("sonido/acoso.mp3");
  ambienteAcoso = loadSound("sonido/ambienteAcoso.mp3");
  soberbio = loadSound("sonido/soberbio.mp3");
  redSound = loadSound('sonido/timido.mp3');
  greenSound = loadSound('sonido/timidez.mp3');
  verdesSound = loadSound('sonido/mediacion.mp3');
  rojosSound = loadSound('sonido/empatia3.mp3');
  ambienteEmp = loadSound("sonido/empatiaAmbiente.mp3");
  sound = loadSound('sonido/empatia2.mp3');
  desinteresSonido = loadSound('sonido/inflacion.mp3');
  AmbienteDesinteres = loadSound('sonido/desinteres-luz.mp3');
  ambienteTimidez = loadSound("sonido/timidezAmbiente.mp3");
  soundDiscriminacion = loadSound('sonido/denied.mp3');
  AmbienteDiscriminacion = loadSound('sonido/discriminacionfondo2.mp3');
  ambienteDes = loadSound("sonido/desamparoAmbiente.mp3");
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
  pxmenu = width / 2;
  pymenu = height/ 2;
  tamIcono = 80;
  //tamGrillaBtn;
  gridSize = diameter + spacing;
  let startX = (width - gridSize * (cols - 1)) / 2;
  let startY = (height - gridSize * (rows - 1)) / 2;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * gridSize;
      let y = startY + j * gridSize;
      if (i === 1 && j === 1) {
        redCircle = { x: width / 2, y: height / 2, color: color(255, 0, 0) };
      } else {
        greenCircles.push({ x, y, color: color(0, 255, 0) });
      }
    }
  }
  //mediación
  centersMediacion = [width / 3, width / 2, width * 2 / 3];
  
  for (let i = 0; i < cols; i++) {
    positions[i] = centersMediacion[i];
    targets[i] = centersMediacion[i];
    if (i != middleCol) {
      speed[i] = random(5,10);
    }
  }
  if (estado == "mediacion"){
    verdesSound.play();
    
  } else{
    verdesSound.stop();
  }
  
  //empatia
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = startX + i * gridSize;
      let y = startY + j * gridSize;
      if (i === 1 && j === 1) {
        redCircle = { x, y, diameter, originalX: x, originalY: y, color: color(255, 0, 0) };
      } else {
        circles.push({ x, y, diameter, originalX: x, originalY: y, color: color(0, 255, 0) });
      }
    }
  }
  //desinteres
  // Tamaño de la grilla y posiciones centrales
  centers = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = (width - gridSize * (cols - 1)) / 2 + gridSize * i;
      let y = (height - gridSize * (rows - 1)) / 2 + gridSize * j;
      centers.push({ x, y });
    }
  }
  
  // Crear círculos
  for (let i = 0; i < centers.length; i++) {
    if (i === 4) { // Círculo rojo en el centro
      redCircle = {
        x: centers[i].x,
        y: centers[i].y,
        diameter: diameter,
        color: color(255, 0, 0)
      };
    } else {
      circles.push({
        x: centers[i].x,
        y: centers[i].y,
        diameter: diameter,
        color: color(0, 255, 0)
      });
    }
  }
  //discriminacion
  let offsetX = (width - (cols * circleSize + (cols - 1) * spacing)) / 2;
  let offsetY = (height - (rows * circleSize + (rows - 1) * spacing)) / 2;

  // Crear la grilla de círculos
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let xpos = offsetX + x * (circleSize + spacing);
      let ypos = offsetY + y * (circleSize + spacing);
      let c = { x: xpos, y: ypos, size: circleSize, isRed: false };
      grid.push(c);
    }
  }

  grid[0].isRed = true;  // Primer círculo en rojo
}

function draw() {
  background(255);
  if (agarre > 0) {
      this.agarrar = true;
    } 
    if (estado == "menu") {
      image(menu[0],pxmenu - calle , pymenu - calle , tamXbtn, tamYbtn); //arriba izquierda
      image(menu[1],pxmenu , pymenu - calle , tamXbtn, tamYbtn);//centro arriba
      image(menu[2],pxmenu + calle , pymenu - calle , tamXbtn, tamYbtn);//arriba derecha
      image(menu[3],pxmenu + calle , pymenu , tamXbtn, tamYbtn);//segunda fila der
      image(menu[4],pxmenu ,pymenu , tamXbtn, tamYbtn);// segunda fila centro
      image(menu[5],pxmenu - calle , pymenu , tamXbtn, tamYbtn);//segunda fila iz
      image(menu[6],pxmenu - calle , pymenu + calle  , tamXbtn, tamYbtn);//abajo iz
      image(menu[7],pxmenu , pymenu + calle , tamXbtn, tamYbtn);//centro abajo
      image(menu[8],pxmenu + calle  , pymenu + calle , tamXbtn, tamYbtn);//abajo der
}
if (estado == "empatia" || 
  estado == "acoso" || 
  estado == "desamparo" || 
  estado == "soberbia" ||
  estado == "proteccion" || 
  estado == "discriminacion"|| 
  estado == "desinteres" || 
  estado == "timidez" || 
  estado == "mediacion") {
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
   if (estado =="timidez") {
    fill(0, 255, 0);
  for (let circle of greenCircles) {
    ellipse(circle.x, circle.y, diameter);
  }
  
  fill(redCircle.color);
  ellipse(redCircle.x, redCircle.y, diameter);
  }
  if (estado == "mediacion") {
    // Dibujar los círculos
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = positions[i] + (i - middleCol) * ( diameter);
      let y = (height / 3) * j + (height / 6);
      
      if (i == middleCol) {
        fill(255,0,0);
      } else {
        fill(0,255,0);
      }
      
      ellipse(x, y, diameter);
  
    }
  } 
  // Mover las columnas de los extremos
  for (let i = 0; i < cols; i++) {
    if (i != middleCol) {
      positions[i] += speed[i];
      if (positions[i] > this.centersMediacion[i] + (width / 6 - this.diameter / 2) || positions[i] < this.centersMediacion[i] - (width / 6 - this.diameter / 2)) {
        speed[i] *= -1;
      }
    }
  }
  }
  if (estado == "empatia") {
    for (let c of circles) {
      fill(c.color);
      ellipse(c.x, c.y, c.diameter);
    }
  
    fill(redCircle.color);
    ellipse(redCircle.x, redCircle.y, redCircle.diameter);
  }
  if (estado == "desinteres") {
    // Dibujar los círculos verdes
   for (let c of circles) {
    fill(c.color);
    ellipse(c.x, c.y, c.diameter);
  }
  
  // Dibujar el círculo rojo
  fill(redCircle.color);
  ellipse(redCircle.x, redCircle.y, redCircle.diameter);
  }
  if (estado == "discriminacion") {
    for (let c of grid) {
      fill(c.isRed ? color(255, 0, 0) : color(0, 255, 0));
      ellipse(c.x, c.y, c.size);
    }
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
  print (agarre)
  if (estado == "menu") {
    //empatia
    Objeto(this.pxmenu - this.calle , this.pymenu - this.calle , this.tamXbtn, this.tamYbtn, 1);
    //acoso
    Objeto(this.pxmenu , this.pymenu - this.calle , this.tamXbtn, this.tamYbtn, 2);
    //desamparo
    Objeto(this.pxmenu + this.calle , this.pymenu - this.calle , this.tamXbtn, this.tamYbtn, 3);
    //soberbia
    Objeto(this.pxmenu - this.calle , this.pymenu , this.tamXbtn, this.tamYbtn, 4);
    //proteccion
    Objeto(this.pxmenu , this.pymenu , this.tamXbtn, this.tamYbtn, 5);
    //discriminacion
    Objeto(this.pxmenu + this.calle , this.pymenu , this.tamXbtn, this.tamYbtn, 6);
    //desinteres
    Objeto(pxmenu - calle , pymenu + calle, this.tamXbtn, this.tamYbtn , 7);
    //timidez
    Objeto(this.pxmenu , this.pymenu + this.calle , this.tamXbtn, this.tamYbtn, 8);
    //mediacion
    Objeto(this.pxmenu + this.calle  , this.pymenu + this.calle , this.tamXbtn, this.tamYbtn, 9);

  if (agarre == 1 ) {
    //cargamos el estado
    estado = "empatia";
    ambienteEmp.loop();
  } 
  if (agarre == 2 ) {
    estado = "acoso";
    ambienteAcoso.loop();
  }
  if (agarre == 3 ) {
    estado = "desamparo";
    ambienteDes.loop();
  }  
  if (agarre == 4 ) {
    estado = "soberbia";
  } 
  if (agarre == 5 ) {
    estado = "proteccion";
  } 
  if (agarre == 6 ) {
    estado = "discriminacion";
    AmbienteDiscriminacion.loop();
  } 
  if (agarre == 7 ) {
    estado = "desinteres";
    AmbienteDesinteres.loop();
  } 
  if (agarre == 8 ) {
    estado = "timidez";
    ambienteTimidez.loop();
  } 
  if (agarre == 9 ) {
    estado = "mediacion";
  } 
  }
  //Botones o áreas interactivas en el estado de cada concepto
  if (estado == "acoso") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 3);
    if (agarre == 3 ) {
      estado = "menu"
      ambienteAcoso.stop();
    }
  }
  if (estado == "proteccion") {
    //protagonista
     Objeto(pxProtagonista ,pyProtagonista , tamProtagonista, tamProtagonista, 1);
     Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
  if (agarre == 1 ){
    if (escudo == 100) { 
      //desplazamos los circulos verdes
      this.escudo = 70;
      protector.play();
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
    } else if (salida <= 330){
      salida += 50;
      sonidoSalida[pop].play();
    } if (salida >=330) {
      salida = 0;
      tam = 70;
      tamProtagonista = 70;
    }
  } if (agarre == 2 ) {
    estado = "menu" 
    ambienteDes.stop();
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
  } if (estado == "timidez") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
    if (agarre == 2 ) {
      estado = "menu"
      ambienteTimidez.stop();
    }
    for (let circle of greenCircles) {
      if (dist(touches[0].x, touches[0].y, circle.x, circle.y) < diameter / 2) {
        dragging = circle;
        break;
      }
    }
    
    if (dist(touches[0].x, touches[0].y, redCircle.x, redCircle.y) < diameter / 2) {
      let angle = random(TWO_PI);
      redCircle.x = width / 2 + cos(angle) * 70;
      redCircle.y = height / 2 + sin(angle) * 70;
      redCircle.color = color(255, 0, 0);
      redSound.play();
    }
    return false;  // Prevenir el comportamiento predeterminado
  } if (estado == "mediacion") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 3);
    if (agarre == 3 ) {
      estado = "menu"
    }
    if (mouseX > width / 3 && mouseX < width * 2 / 3) {
          rojosSound.loop();
          verdesSound.stop();
        }
  } if (estado == "empatia") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 6);
    if (agarre == 6 ) {
      estado = "menu";
      ambienteEmp.stop();
      //setup();
    } 
    if (dist(touches[0].x, touches[0].y, redCircle.x, redCircle.y) < redCircle.diameter / 2) {
      draggingCircle = redCircle;
    } else {
      for (let c of circles) {
        if (dist(touches[0].x, touches[0].y, c.x, c.y) < c.diameter / 2) {
          draggingCircle = c;
          break;
        }
      }
    }
    return false;
  } if (estado == "desinteres") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 3);
    if (agarre == 3 ) {
      estado = "menu";
    } 
    for (let c of circles) {
      if (dist(mouseX, mouseY, c.x, c.y) < c.diameter / 2) {
        // Incrementar el diámetro del círculo verde
        if (c.diameter < maxDiameter) {
          c.diameter += 10;
          desinteresSonido.play();
        }
      }
    }
  } if (estado == "discriminacion") {
    Objeto(width - 100 , 100 , tamIcono, tamIcono, 2);
    if (agarre == 2 ) {
      estado = "menu"
    }
    let target = grid[8];  // Círculo en la posición (3,3)
  let moveStep = 5;      // Paso de movimiento
soundDiscriminacion.play();
  for (let i = 1; i < grid.length - 1; i++) {
    let c = grid[i];
    let angle = atan2(target.y - c.y, target.x - c.x);
    let newX = c.x + cos(angle) * moveStep;
    let newY = c.y + sin(angle) * moveStep;

    // Calcular la distancia entre el círculo actual y el objetivo
    let distTarget = dist(newX, newY, target.x, target.y);
    
    // Si no colisionan, actualizar la posición
    if (distTarget > circleSize) {
      c.x = newX;
      c.y = newY;
    }
  }

  // Detener el programa si los círculos están cerca de colisionar
  let minDistance = Infinity;
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = i + 1; j < grid.length; j++) {
      let d = dist(grid[i].x, grid[i].y, grid[j].x, grid[j].y);
      minDistance = min(minDistance, d);
    }
  }
  if (minDistance <= circleSize) {
    noLoop();
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
	} if (estado == "timidez") {
    if (dragging) {
      dragging.x = touches[0].x;
      dragging.y = touches[0].y;
      greenSound.play();
    }
    return false;
  } if (estado == "mediacion") {
    for (let i = 0; i < cols; i++) {
      if (i != middleCol) {
        positions[i] = centersMediacion[i];
        speed[i] = 0;
      }
  }
 } if (estado == "empatia") {
    if (draggingCircle) {
      let newX = touches[0].x;
      let newY = touches[0].y;
  
      if (draggingCircle === redCircle) {
        for (let c of circles) {
          let distance = dist(newX, newY, c.x, c.y);
          if (distance < redCircle.diameter) {
            let angle = atan2(newY - c.y, newX - c.x);
            newX = c.x + cos(angle) * (redCircle.diameter / 2 + c.diameter / 2);
            newY = c.y + sin(angle) * (redCircle.diameter / 2 + c.diameter / 2);
            redCircle.color = color(0, 255, 0);  // Cambiar el color del rojo al verde
            sound.play();
            break;
          } else {
            redCircle.color = color(255, 0, 0);  // Mantener rojo si no está colisionando
          }
        }
      } else {
        let distance = dist(newX, newY, redCircle.x, redCircle.y);
        if (distance < redCircle.diameter) {
          let angle = atan2(newY - redCircle.y, newX - redCircle.x);
          newX = redCircle.x + cos(angle) * (redCircle.diameter / 2 + draggingCircle.diameter / 2);
          newY = redCircle.y + sin(angle) * (redCircle.diameter / 2 + draggingCircle.diameter / 2);
          draggingCircle.color = color(255, 0, 0);  // Cambiar el color a rojo
          sound.play();
        }
      }
  
      draggingCircle.x = newX;
      draggingCircle.y = newY;
    }
    return false;
  }
}
}

//Reiniciamos la grilla
function touchEnded(){
  //drag = false;
  agarre = 0;
  if (estado == "proteccion") {
    escudo = 100;
    //print (escudo)
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
  } if (estado == "timidez") {
    dragging = false;
    return false;
    
  } if (estado == "mediacion") {
    rojosSound.stop();
    setup();
  } if (estado == "empatia") {
    if (draggingCircle) {
      setTimeout(() => {
        draggingCircle.x = draggingCircle.originalX;
        draggingCircle.y = draggingCircle.originalY;
        draggingCircle.color = (draggingCircle === redCircle) ? color(255, 0, 0) : color(0, 255, 0);
        draggingCircle = null;
      }, 300);
    }
    return false;
  }
}
