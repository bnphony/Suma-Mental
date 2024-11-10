// * Generate a Message
function notificacion_simple(obj) {
  Swal.fire({
    title: obj["title"],
    text: obj["text"],
    icon: obj["icon"],
    timer: 2000,
  });
}

// * Confirm Dialog
function alert_action(title, content, callback, cancel) {
  $.confirm({
    theme: "material",
    title: title,
    icon: "fas fa-exclamation-triangle",
    content: content,
    columnclass: "small",
    typeAnimated: true,
    cancelButtonClass: "btn-primary",
    draggable: true,
    dragWindowBorder: false,
    buttons: {
      info: {
        text: "Si",
        btnClass: "btn-primary",
        action: function () {
          this.close();
          callback();
        },
      },
      danger: {
        text: "No",
        btnClass: "btn-red",
        action: function () {
          this.close();
          cancel();
        },
      },
    },
  });
}


function generateNumbers(numNumbers, numDigits, operacion, digitsRandom, operacionRandom) {
  let data = {};
  let lowerBound = Math.pow(10, numDigits - 1);
  let upperBound = Math.pow(10, numDigits) - 1;

  // Generate random numbers
  if (digitsRandom === 'on') {
      data.numbers = Array.from({ length: numNumbers }, () => {
          return getRandomInRange(...randomDigits(numDigits));
      });
  } else {
      data.numbers = Array.from({ length: numNumbers }, () => {
          return getRandomInRange(lowerBound, upperBound);
      });
  }

  // Apply random operation
  if (operacionRandom === 'on') {
      data.numbers = data.numbers.map(num => Math.random() < 0.5 ? -Math.abs(num) : Math.abs(num));
  } else if (operacion === 'resta') {
      data.numbers = data.numbers.map((num, index) => index === 0 ? num : -num);
  }

  // Sum and set the sign
  data.answer = data.numbers.reduce((acc, val) => acc + val, 0);
  data.signo = operacion === 'suma' ? '+ ' : '- ';

  return data;
}

function randomDigits(maxDigits) {
  const numDigits = Math.floor(Math.random() * maxDigits) + 1;
  const lowerBound = Math.pow(10, numDigits - 1);
  const upperBound = Math.pow(10, numDigits) - 1;
  return [lowerBound, upperBound];
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePayment(numDigits) {
  numDigits = Math.min(numDigits, 4);
  const DOLLARS = { 1000: 10, 500: 20, 100: 20, 50: 20, 20: 20, 10: 20, 5: 20, 1: 20 };
  const CENTS = { 50: 20, 25: 20, 10: 20, 5: 20, 1: 100 };
  let data = {};
  const lowerBound = Math.pow(10, numDigits - 1);
  const upperBound = Math.pow(10, numDigits) - 1;

  // Generate random payment amount
  const numberPayment = parseFloat((Math.random() * (upperBound - lowerBound) + lowerBound).toFixed(2));
  const dollars = Math.floor(numberPayment);
  const cents = Math.round((numberPayment - dollars) * 100);
  data.total = numberPayment;

  // Generate cost
  const cost = parseFloat((Math.random() * (numberPayment - 1) + 1).toFixed(2));
  data.cost = cost;
  data.answer = parseFloat((numberPayment - cost).toFixed(2));
  data.numbers = [numberPayment, -cost];

  const payment = { DOLLARS: {}, CENTS: {} };

  // Helper function to calculate payment part
  function calculatePayment(value, availableFunds, paymentPart) {
      for (const denom of Object.keys(availableFunds).sort((a, b) => b - a)) {
          const denomValue = parseInt(denom);
          const maxUse = Math.min(Math.floor(value / denomValue), availableFunds[denom]);
          if (maxUse > 0) {
              paymentPart[denom] = maxUse;
              value -= denomValue * maxUse;
              availableFunds[denom] -= maxUse;
          }
          if (value === 0) break;
      }
      return value;
  }

  // Calculate dollar part
  const remainingDollars = calculatePayment(dollars, DOLLARS, payment.DOLLARS);

  // Calculate cents part
  const remainingCents = calculatePayment(cents, CENTS, payment.CENTS);

  // Check if the exact amount could be constructed
  if (remainingDollars > 0 || remainingCents > 0) {
      return "Exact amount cannot be constructed with available denominations.";
  }

  data.payment = payment;
  return data;
}


$(document).ready(function() {
  function loadPage(page) {
    const isResultado = page === '2';
    localStorage.setItem('pagina-actual', page);
    try {
      $('.container-fluid').load(isResultado ? '/templates/resultado.html' : '/templates/inicio.html');
    } catch(ex) {
      alert('Un error ocurrio: ', ex);
    }
    updateBreadcrumb(isResultado);
  }

  function updateBreadcrumb(isResultado) {
    $('.breadcrumb').html(`
      <li class="breadcrumb-item breadcrumb-home">Home</li>
      ${isResultado ? '<li class="breadcrumb-item">Resultado</li>' : ''}
    `);
    if (isResultado) $('.breadcrumb li:nth-child(1)').addClass('active-link');
  }

  let currentPage = localStorage.getItem('pagina-actual') || '1';
  loadPage(currentPage);

  $('.container-fluid').on('click', '.btnNext', function(e) {
    if ($(this).val() === 'finalizar') {
      localStorage.setItem('pagina-actual', '2');
      location.reload();
    }
  });

  $('.container-fluid').on('click', '.btnTryAgain', function(e) {
    localStorage.setItem('pagina-actual', '1');
    location.reload();
  });
  
  
  // Event for clicking the "Home" breadcrumb link
  $('.breadcrumb').on('click', '.breadcrumb-home', function(e) {
    let page = localStorage.getItem('pagina-actual');
    if (page === '2') {
      localStorage.setItem('pagina-actual', '1');
      location.reload();
    }
  });
});
