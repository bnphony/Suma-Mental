var hours = 0, minutes = 0, seconds = 0;
let internal;
var statusButton = false;
var generateAgain = false;
var time = 0;
var count = 0;
let DATOSGENERALES = [];
const USER_ANSWER = 'user_answer', TIME = 'time', RESULT = 'result';

var exercises = {
  items: [],
  get_sums: function() {
    let sums = [];
    $.each(this.items, function(key, item) {
      sums.push(item);
    });
    return sums;
  },
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
  $(".timer").text(`${hours}:${minutes}:${seconds}`);
}

// Generate all the exercises
function generateData(cData) {
  if (cData.get("inputNumbers") !== "" && cData.get("inputDigits") !== "") {
    count = 0;
    $(".btnStart").prop("disabled", false);
    $(".btnNext").prop("disabled", false);
    $.ajax({
      url: window.location.pathname,
      type: "POST",
      data: cData,
      processData: false,
      contentType: false,
    })
      .done((data) => {
        console.log("DATA: ", data);
        $(".numeros").empty();
        if (!data.hasOwnProperty("error")) {
          if (!$.isEmptyObject(data)) {
              exercises.items = data;
              $(".navigate-sum").text(`${count+1}/${data.length}`);
          } else {
            alert("No se pudo generar la suma!");
          }
        }
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        alert(`${textStatus}: ${errorThrown}`);
      })
      .always((data) => {});
  }   
}



// Show the exercise in the screen
function showSum(data) {
  
  let operacion = data[count];
  $('.container_sum').attr("data-id", count);
  let html = "";
  $.each(operacion["numbers"], (index, item) => {
    html += `<p>${item}</p>`;
  });
  $(".response").text(`${operacion["answer"]}`);
  $(".numeros").html(html);
}


/* -------------------
  * FUNCTION MAIN()
----------------------- */
$(function () {
  // generateData();
  resetSum();
  $(".btnStart").prop('disabled', true);


  // * Button COMENZAR
  $(".btnStart").on("click", function () {
    let self = $(this);
    // Start
    $('input[name="txt-answer"]').prop("disabled", false)
    .val("");
    $('input[name="txt-answer"]').focus();
    showSum(exercises.items);
    resetChronometer();
    updateTimer();
    $(".response").addClass("item-invisible");
    $(".resultado").addClass("item-invisible");
    startChronometer();
    $(".timer").removeClass("item-invisible");
    $(this).html('Comenzar de Nuevo <i class="fas fa-redo"></i>');
   
  });

  // * Next Button
  $(".btnNext").on("click", function() {
    if (count < exercises.items.length - 1) {
      resetSum();
      if(!DATOSGENERALES[count]) {
        let auxData = exercises.items[count];
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
      console.log(`count: ${count}, items: ${exercises.items.length}`);
      if (count === exercises.items.length - 1) {
        $(this).text('Finalizar');
        $(this).addClass('btn-danger');
      }
    } else {
      if(!DATOSGENERALES[count]) {
        let auxData = exercises.items[count];
        auxData[USER_ANSWER] = '';
        auxData[TIME] = `${hours}:${minutes}:${seconds}`;
        auxData[RESULT] = 0;
        DATOSGENERALES.push(auxData);
        localStorage.setItem('resultados', JSON.stringify(DATOSGENERALES));
      }
      location.href = '/resultado/';

      // let notification = { title: "Ups!", text: "No hay mas ejercicios.", icon: "error",}
      // notificacion_simple(notification)
    }
  });

  // * Button CREATE: Generate exercises
  $("#formConfiguration").on("submit", function (e) {
    e.preventDefault();
    let parameters = new FormData(this);
    parameters.append('action', "generate_sums");
    resetSum();
    generateData(parameters);
  });


  // * INPUT answer: Check the response
  $('input[name="txt-answer"]').on("keydown", function (event) {
    // Check if the Enter key is pressed
    let charCode = event.which ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) ||(charCode >= 96 && charCode <= 105)) {
      return true;
    }

    // Backspace(8), tab(9), delete(46), left arrow(37), right arrow(39)
    if (charCode === 8 || charCode === 46 || charCode === 37 || charCode === 39 || charCode === 9) {
      return true;
    }
    if (event.key === "Enter" || event.keyCode == 13) {
      event.preventDefault();
      reviewResponse($(this).val());
    }
    event.preventDefault();
  });

  $('input[name="inputNumbers"], input[name="inputDigits"]').on("keydown", function(event) {
    // Check if the Enter key is pressed
    let charCode = event.which ? event.which : event.keyCode;
    if ((charCode >= 48 && charCode <= 57) ||(charCode >= 96 && charCode <= 105)) {
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
});
/* -------------------
  ? FIN: FUNCION MAIN()
----------------------- */

function resetSum() {
  $(".btnStart").html('Comenzar');
  $(".timer").addClass("item-invisible");
  $(".numeros").empty();
  resetChronometer();
  $(".response").addClass("item-invisible");
  $(".resultado").addClass("item-invisible");
  $('input[name="txt-answer"]').prop("disabled", true)
      .val("");
}


// Review the User Response
function reviewResponse(response) {
  let idExercise = $('.container_sum').attr("data-id");
  let correctResponse = exercises.items[idExercise].answer;
  let auxData = exercises.items[idExercise]
  let obj =
    parseInt(response, 10) === correctResponse
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
  $(".response").text(`Tu respuesta: ${response}, Respuesta Correcta: ${correctResponse}`);
  $(".response").removeClass("item-invisible");
  stopChronometer();
  updateTimer();
  auxData[USER_ANSWER] = response;
  auxData[TIME] = `${hours}:${minutes}:${seconds}`;
  if(DATOSGENERALES[count]) {
    DATOSGENERALES[count][USER_ANSWER] = auxData[USER_ANSWER];
    DATOSGENERALES[count][TIME] = auxData[TIME];
    DATOSGENERALES[count][RESULT] = auxData[RESULT];
  } else {
    DATOSGENERALES.push(auxData);
  }
  localStorage.setItem('resultados', JSON.stringify(DATOSGENERALES));
  console.log(JSON.parse(localStorage.getItem('resultados')) || []);
}

function createSums() {}
