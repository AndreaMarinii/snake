var canvas = document.getElementById("game");
var punteggio = document.getElementById("punteggio");
var context = canvas.getContext("2d");
var counter = 0;

var grid = 16;
var fps = 0;

// valori della variabile serpente per creare l'immagine su html
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4,
};
// valori delle coordinate della mela
var apple = {
  x: 320,
  y: 320,
};
// valori della grandezza dei blocchi
var block = {
  posizione: []
};
function Getparam() {
  var url = document.URL.indexOf("?")
  var rosso = ""
  var verde = ""
  var blu = ""
  var difficolta = 0
  for (var i = url; i < document.URL.length; i++) {
    if (document.URL[i] === "r") {
      var j = i + 2
      for (var h = 0; h < 3; h++) {
        
        try {
          parseInt(document.URL[j])
          rosso += document.URL[j]
          j++
        } catch (e) {
          break
        }
      }
    }
    if (document.URL[i] === "v") {
      var j = i + 2
      for (var h = 0; h < 3; h++) {
        
        try {
          parseInt(document.URL[j])
          verde += document.URL[j]
          j++
        } catch (e) {
          break
        }
      }
    }
    if (document.URL[i] === "b") {
      var j = i + 2
      for (var h = 0; h < 3; h++) {
        
        try {
          parseInt(document.URL[j])
          blu += document.URL[j]
          j++
        } catch (e) {
          break
        }
      }
    }
    if (document.URL[i] === "f") {
      difficolta = 5
    }
    else if (document.URL[i] === "n") {
      difficolta = 10
    }
    else if (document.URL[i] === "d") {
      difficolta = 15
    }
  }
  return {
    r: rosso,
    v: verde,
    b: blu,
    d: difficolta
  }
}


var parametri = Getparam()




for (var i = 0; i < parametri.d; i++) {
  var x_pos = getRandomInt(0, 25) * grid
  var y_pos = getRandomInt(0, 25) * grid
  if (x_pos != snake.x || y_pos != snake.y) {
    block.posizione.push({ x: x_pos, y: y_pos })
  }
  else {
    while (x_pos == snake.x && y_pos == snake.y) {
      x_pos = getRandomInt(0, 25) * grid
      y_pos = getRandomInt(0, 25) * grid
    }
    block.posizione.push({ x: x_pos, y: y_pos })
  }

}

// genera numeri casuali per la posizione della mela
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Ferma il gioco dopo la morte per far vedere il punteggio
// resetta le variabili iniziali in modo da ricominciare
function resetGame(counter) {
  alert("Sei Morto\nPunteggio: " + counter);
  punteggio.innerText = "Punteggio: ";
  snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
  };
  block = {
    posizione: []
  };
  for (var i = 0; i < parametri.d; i++) {
    var x_pos = getRandomInt(0, 25) * grid
    var y_pos = getRandomInt(0, 25) * grid
    if (x_pos != snake.x && y_pos != snake.y) {
      block.posizione.push({ x: x_pos, y: y_pos })
    }
    else {
      while (x_pos == snake.x && y_pos == snake.y) {
        x_pos = getRandomInt(0, 25) * grid
        y_pos = getRandomInt(0, 25) * grid
      }
      block.posizione.push({ x: x_pos, y: y_pos })
    }
  }
  var fs = require("fs")
  if (parametri.d === 5) {
    var json = JSON.stringify({f : counter})
    fs.readFile('../json/punteggio.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        punteggio_max = JSON.parse(data);
        if (counter > punteggio_max) {
          fs.writeFile("../json/punteggio.json", json, "utf8")
        }
      }
    });
  }
  else if (parametri.d === 10) {
    var json = JSON.stringify({n : counter})
    fs.readFile('../json/punteggio.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        punteggio_max = JSON.parse(data);
        if (counter > punteggio_max) {
          fs.writeFile("../json/punteggio.json", json, "utf8")
        }
      }
    });
  }
  else if (parametri.d === 15) {
    var json = JSON.stringify({d : counter})
    fs.readFile('../json/punteggio.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        punteggio_max = JSON.parse(data);
        if (counter > punteggio_max) {
          fs.writeFile("../json/punteggio.json", json, "utf8")
        }
      }
    });
  }
}


// loop del gioco
function loop() {
  requestAnimationFrame(loop);
  if (++fps < 4) {
    return;
  }

  fps = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  //Capisce quando il serperte tocca uno dei muri a destra o sinistra
  // e se lo fa il serpente muore e il gioco rinizia
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
    resetGame(counter);
    counter = 0;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
    resetGame(counter);
    counter = 0;
  }

  // Capisce quando il serpente tocca uno dei muri sopra o sotto
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
    resetGame(counter);
    counter = 0;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
    resetGame(counter);
    counter = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // disegna la mela
  context.fillStyle = "red";
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  // disegna i blocchi
  context.fillStyle = "blue";
  for (var i = 0; i < parametri.d; i++) {
    context.fillRect(block.posizione[i].x, block.posizione[i].y, grid - 1, grid - 1)
  }

  context.fillStyle = "rgb(" + parametri.r + " " + parametri.v + " " + parametri.b + " / 100%)";
  snake.cells.forEach(function (cell, index) {
    // disegna il corpo del serpente 1 pixel più corto, in modo da vedere quanto è lungo
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // condizione per capire se il serpente mangia la mela
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      counter++;
      punteggio.innerText = "Punteggio: " + counter;
      // genera delle nuove coordinate casuali per la mela
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    for (var i = 0; i < parametri.d; i++) {
      if (cell.x === block.posizione[i].x && cell.y === block.posizione[i].y) {
        resetGame(counter);
        counter = 0
      }
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      // condizione per capire se il serpente si è mangiato da solo
      // nel caso resetta il gioco
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
        resetGame(counter);
        counter = 0;
      }
    }
  });
}


document.addEventListener("keydown", function (e) {
  // queste condizioni capiscono quando un tasto viene premuto, in questo caso le freccette
  // e muove il serpente nella direzione premuta
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// funzione che fa iniziare il gioco
requestAnimationFrame(loop);
