import { mainPayment, showPayment } from '/Suma-Menta/static/js/cambioTienda.js';
/*
  * Pagina Inicial
*/

// ? COMPONENTS
const $highlight1 = $('<span>').addClass('highlight');
$('body').append($highlight1);


// ? GLOBAL VARIABLES
var hours = 0, minutes = 0, seconds = 0;
let internal;
var statusButton = false;
var generateAgain = false;
var time = 0;
var count = 0;
let DATOSGENERALES = [];
const USER_ANSWER = 'user_answer', TIME = 'time', RESULT = 'result', MODO = 'modo';
let countdown;
// Allowerd Numbers for Inputs
const numbersA = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
var exercises = {
  items: [],
  modo: '',
  get_sums: function() {
    let sums = [];
    $.each(this.items, function(key, item) {
      sums.push(item);
    });
    return sums;
  },
  items_vuelto: [],
}


/* 
  * TIMER FUNCTIONS
*/
// Function to start the chronometer
function startChronometer() {
  internal = setInterval(() => {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
    updateTimer();
  }, 1000);
}
// Function to stop the chronometer
function stopChronometer() {
  clearInterval(internal);
}
// Function to reset the chronometer
function resetChronometer() {
  clearInterval(internal);
  hours = 0;
  minutes = 0;
  seconds = 0;
}
function updateTimer() {
  $(".timer").text(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
}

// Generate all the exercises
function generateData(cData) {
  if (cData.get("inputNumbers") !== "" && cData.get("inputDigits") !== "") {
    count = 0;
    $(".btnStart").prop("disabled", false);
    $(".btnNext").prop("disabled", false);
    const newData = {};
    const modo = cData.get('modos');
    const numbers = parseInt(cData.get('inputNumbers'));
    const rondas = parseInt(cData.get('selectRounds'));
    const digits = parseInt(cData.get('inputDigits'));
    const operacion = cData.get('operaciones');
    const operacion_random = cData.has('chkOperacionRandom') ? cData.get('chkOperacionRandom') : 0;
    const digits_random = cData.has('chkDigitsRandom') ? cData.get('chkDigitsRandom') : 0;
    newData['modo'] = modo
    const operaciones_creadas = [];
    if (modo === 'cobro') {
      for (let i=0; i < rondas; i++) {
        operaciones_creadas.push(generatePayment(digits));
      }
    } else {
      for (let i=0; i < rondas; i++) {
        operaciones_creadas.push(generateNumbers(numbers, digits, operacion, digits_random, operacion_random));
      }
    }
    newData['info'] = operaciones_creadas;

    
   
    // console.log("DATA: ", data);
    $(".numeros").empty();
    if (!newData.hasOwnProperty("error")) {
      if (!$.isEmptyObject(newData)) {
          exercises.items = newData.info;
          exercises.modo = newData.modo;
          if (exercises.modo === 'cobro') $('.numeros').addClass('numeros-cobro');
          $('.divisor').css('display', exercises.modo === 'completa' ? 'block' : 'none');
          $('.numeros').css('margin-bottom', exercises.modo === 'completa' ? '0px' : '10px');
          $(".navigate-sum").text(`${count+1}/${newData.info.length}`);
          $(".modo-juego").text(`${exercises.modo === 'completa' 
            ? 'Operacion Completa' 
            : exercises.modo === 'secuencial' ? 'Numeros Secuenciales' 
            : 'Calcular Vuelto'}`);
      } else {
        alert("No se pudo generar la suma!");
      }
    }
     
  }   
}





// Show the exercise in the screen
function showSum(data) {
  
  let operacion = data[count];
  let signo = operacion["signo"];
  $('.container_sum').attr("data-id", count);
  if (exercises.modo === 'completa') { // Modo Operacion Completa
    let html = "";
    $.each(operacion["numbers"], (index, item) => {
      html += `<p>${item > 0 ? '+ ' : '- '}${Math.abs(item)}</p>`;
    });
    $(".response").text(`${operacion["answer"]}`);
    $(".numeros").html(html);
  } else {  // Modo Numeros Secuenciales
    clearInterval(countdown);
    $(".numeros").html('<p class="empty-p"></p>');
    setTimeout(() => {
        let i = 0;
      $(".numeros").html(`<p class="secuencial">${operacion["numbers"][i] > 0 ? '+ ' : '- '}${Math.abs(operacion["numbers"][i])}</p>`);
      countdown = setInterval(() => {
        i++;
        if (i >= operacion["numbers"].length) { 
          clearInterval(countdown);
          return;
        }
        $(".numeros").html(`<p class="secuencial">${operacion["numbers"][i] > 0 ? '+ ' : '- '}${Math.abs(operacion["numbers"][i])}</p>`);
      }, 1000);
    }, 1000);
    

    
  }
}


export function highlightOption($label, $light) {
  const labelCoords = $label.getBoundingClientRect();
  const coords = {
    width: labelCoords.width + 10,
    height: labelCoords.height,
    top: labelCoords.top + window.scrollY,
    left: labelCoords.left + window.scrollX
  }
  $light.css('width', `${coords.width}px`);
  $light.css('height', `${coords.height}px`);
  $light.css('transform', `translate(${coords.left}px, ${coords.top}px)`);
}


/* -------------------
  * FUNCTION MAIN()
----------------------- */
$(function () {

  // * [MODULO]: Cobro Tienda
  mainPayment();

  // * Configuration Input:Radio Highlight
  
  $('input[name="operaciones"]').on('change', function(e) {
    if ($(this).prop('checked')) {
      const $targetLabel = e.target.closest('Label');
      highlightOption.call(this, $targetLabel, $highlight1);
    } 
  });
  $('input[name="operaciones"]').trigger('change');
  


  resetSum();
  $(".btnStart").prop('disabled', true);
  $('input[name="txt-answer"]').addClass("item-invisible");

  configurationButtons();

  // * [BUTTON]: COMENZAR
  $(".btnStart").on("click", function () {
    let self = $(this);
    // Start
    resetChronometer();
    updateTimer();
    $(".response").addClass("item-invisible");
    $(".resultado").addClass("item-invisible");
    startChronometer();
    $(".timer").removeClass("item-invisible");
    $(this).html('Comenzar de Nuevo <i class="fas fa-redo"></i>');
    $('input[name="txt-answer"]').prop("disabled", false).val("");
    $('input[name="txt-answer"]').focus();
    if (exercises.modo === 'cobro') {
      showPayment(exercises.items, count);
    } else {
      $('input[name="txt-answer"]').removeClass("item-invisible");
      showSum(exercises.items);
    }
   
  });

  

  // * [BUTTON]: Next
  $(".btnNext").on("click", function() {
    if (count < exercises.items.length - 1) {
      resetSum();
      if(!DATOSGENERALES[count]) {
        let auxData = exercises.items[count];
        auxData[MODO] = exercises.modo;
        auxData[USER_ANSWER] = '';
        auxData[TIME] = `${hours}:${minutes}:${seconds}`;
        auxData[RESULT] = 0;
        DATOSGENERALES.push(auxData);
        localStorage.setItem('resultados', JSON.stringify(DATOSGENERALES));
      }
      count++;
      $('.container_sum').attr("data-id", count);
      $(".navigate-sum").text(`${count+1}/${exercises.items.length}`);
      $('.btnStart').focus();
      if (count === exercises.items.length - 1) {
        $(this).text('Finalizar');
        $(this).addClass('btn-danger');
      }
      $(this).val('continuar');
    } else {
      if(!DATOSGENERALES[count]) {
        let auxData = exercises.items[count];
        auxData[MODO] = exercises.modo;
        auxData[USER_ANSWER] = '';
        auxData[TIME] = `${hours}:${minutes}:${seconds}`;
        auxData[RESULT] = 0;
        DATOSGENERALES.push(auxData);
        localStorage.setItem('resultados', JSON.stringify(DATOSGENERALES));
      }
      $(this).val('finalizar');

      // let notification = { title: "Ups!", text: "No hay mas ejercicios.", icon: "error",}
      // notificacion_simple(notification)
    }
  });

  
  // * [INPUT]: Answer -> Check the response
  $('input[name="txt-answer"]').on("keydown", function (event) {
    // Check if the Enter key is pressed
    let charCode = event.which ? event.which : event.keyCode;
    if (numbersA.includes(event.key)) {
      return true;
    }

    // Backspace(8), tab(9), delete(46), left arrow(37), right arrow(39), +(61), -(173) 
    let codes = [8, 46, 37, 39, 9, 107, 109, '+', '-'];
    if (codes.includes(charCode) || codes.includes(event.key)) {
      return true;
    }
    if (event.key === "Enter" || event.keyCode == 13) {
      event.preventDefault();
      reviewResponse($(this).val());
    }
    event.preventDefault();
  });

  


});
/* -------------------
  ? FIN: FUNCION MAIN()
----------------------- */


// Events: configuration buttons
function configurationButtons() {
  // * [BUTTON]: RANDOM OPERATION
  $('input[name="chkOperacionRandom"]').on('change', function() {
    const tachar = this.checked ? 'line-through' : '';
    $('label[for="idSuma"], label[for="idResta"]').css('text-decoration', tachar);
  });

   // * [BUTTON]: CREATE -> Generate exercises
   $("#formConfiguration").on("submit", function (e) {
     e.preventDefault();
     let parameters = new FormData(this);
     parameters.append('action', "generate_sums");
     resetSum();
     generateData(parameters);
     $('.numeros').removeClass('.numeros-cobro');
  });

  // * [INPUT]: #Numbers, #Digits -> Only Numbers
  $('input[name="inputNumbers"], input[name="inputDigits"]').on("keydown", function(event) {
    // Check if the Enter key is pressed
    let charCode = event.which ? event.which : event.keyCode;
    if (numbersA.includes(event.key)) {
      return true;
    }

    // Backspace(8), tab(9), delete(46), left arrow(37), right arrow(39)
    if (charCode === 8 || charCode === 46 || charCode === 37 || charCode === 39 || charCode === 9) {
      return true;
    }
    
    if (event.key === "Enter" || event.keyCode == 13) {
      return true;
     
    }
    event.preventDefault();
  });
}

// Clean and prepare to next exercise
function resetSum() {
  $(".btnStart").html('Comenzar');
  $(".timer").addClass("item-invisible");
  $(".numeros").empty();
  resetChronometer();
  $(".response").addClass("item-invisible");
  $(".resultado").addClass("item-invisible");

  $('input[name="txt-answer"]').prop("disabled", true)
      .addClass('item-invisible')
      .val("");
}


// * Review the User Response
export function reviewResponse(response) {
  let idExercise = $('.container_sum').attr("data-id");
  let correctResponse = exercises.items[idExercise].answer;
  let auxData = exercises.items[idExercise]
  let checkResponse;
  if (['completa', 'secuencial'].includes(exercises.modo)) {
    checkResponse = parseInt(response, 10) === correctResponse;
  } else {
    checkResponse = parseFloat(response) === correctResponse;
    response = parseFloat(response);
  }
  let obj =
    checkResponse
      ? {
          title: "FELICIDADES!",
          text: "Tu respuesta es Correcta!",
          icon: "success",
        }
      : {
          title: "SIGUE INTENTANTO!",
          text: "Tu respuesta es Incorrecta!",
          icon: "error",
        };
  notificacion_simple(obj);
  $(".resultado").removeClass("item-invisible");
  if (obj["icon"] === "success") {
    $(".resultado").addClass("correcto");
    $(".resultado").removeClass("incorrecto");
    auxData[RESULT] = 1;
  } else {
    $(".resultado").addClass("incorrecto");
    $(".resultado").removeClass("correcto");
    auxData[RESULT] = 0;
  }
  $(".response").text(`Tu respuesta: ${(isNaN(response) || response == '') ? 'Sin Respuesta' : response}, Respuesta Correcta: ${correctResponse}`);
  $(".response").removeClass("item-invisible");
  stopChronometer();
  updateTimer();
  auxData[MODO] = exercises.modo;
  auxData[USER_ANSWER] = response;
  auxData[TIME] = `${hours}:${minutes}:${seconds}`;
  if(DATOSGENERALES[count]) { // Update data
    DATOSGENERALES[count][USER_ANSWER] = auxData[USER_ANSWER];
    DATOSGENERALES[count][TIME] = auxData[TIME];
    DATOSGENERALES[count][RESULT] = auxData[RESULT];
  } else {  // New data
    DATOSGENERALES.push(auxData);
  }
  localStorage.setItem('resultados', JSON.stringify(DATOSGENERALES));
}

