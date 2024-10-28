const DOLLARS = {'1000': 0, '500': 0, '100': 0, '50': 0, '20': 0, '10': 0, '5': 0, '1': 0 }
const CENTS = {'50': 0, '25': 0, '10': 0, '5': 0, '1': 0}
const iconDollars = '💸';
const iconCents = '💿';
const VUELTO = {
    calcTotal: () => {
        let total = 0;
        $.each(DOLLARS, (key, value) => total += parseInt(key) * value);
        $.each(CENTS, (key, value) => total += (parseFloat(key)/100) * value);
        return total;
    }

}

export function mainPayment() {
    // Disable the not necessary inputs of the form
    $('input[name="modos"]').on('change', function() {
       isCobroChecked();
    });

    // when do simple reload
    if ($('#idCobro').prop('checked')) {
        isCobroChecked();
    }
}

function addValue() {
    const id = this.dataset.id;
    const type = this.dataset.type;
    let count = 0;
    let total = 0;
    const $elementoExiste = document.querySelector(`.vuelto-basket > div[data-id="${id}"].${type}`);
    if (type === 'DOLLARS') {
        DOLLARS[id] = (DOLLARS[id] || 0) + 1;
        count = DOLLARS[id];
    } else {
        CENTS[id] = (CENTS[id] || 0) + 1;
        count = CENTS[id];
    }
    
    if (!$elementoExiste) {
        $('.vuelto-basket').append(`
            <div class="${type}" data-id="${id}" data-type="${type}">
                <div>${type === "DOLLARS" ? iconDollars : iconCents}${id}</div><div>X${count}</div>
            </div>`);
    } else {
        $(`.vuelto-basket > div[data-id="${id}"].${type} > div:nth-child(2)`).text(`X${count}`);
    }
   
    total = VUELTO.calcTotal();
    // Fixed 2 decimal digits
    $('input[name="txt-answer"]').val(Math.round(total * 100) / 100);

}

function substractCobroClicked(e) {
    // The event must added to father, not in the dinamically children
    const targetDiv = e.target.closest('[data-id]');
    if (!targetDiv) return;
    const { type, id } = targetDiv.dataset;
    const currency = type === "DOLLARS" ? DOLLARS : CENTS;

    // Decrement amount only if greater than 0
    if (currency[id] > 0) {
        currency[id]--;
        targetDiv.querySelector('div:nth-child(2)').textContent = `x ${currency[id]}`;
    }

    let total = VUELTO.calcTotal();
    // Fixed 2 decimal digits
    $('input[name="txt-answer"]').val(Math.round(total * 100) / 100);
    if (currency[id] == 0) {
        targetDiv.remove();
    }

}

export function showPayment(data, count) {
    console.log('paymet: ', data);
    $('.container_sum').attr("data-id", count);
    let html = `
        <div class="total-cobrar">Pago: ${data[count].total} , Total a pagar: $ ${data[count].cost}</div>
        <div class="tablet">
            <div class="client-basket">
                ${drawCurrentPayment(data[count].payment)}
            </div>
            <div class="vuelto-basket"></div>
            <div class="current-options"></div>
        </div>
    
    `;
    $('.numeros').html(html);
    addCurrentOptions();
    // Add Event Clicked to each current
    document.querySelector('.vuelto-basket').addEventListener('click', substractCobroClicked);
}

function addCurrentOptions() {
    let html = '';
    html += `<div class="container-dollars"><p>${iconDollars} DOLARES</p>`;
    $.each(DOLLARS, (key, value) => {
        DOLLARS[key] = 0;
        html += `<button type="button" class="btnAddCent" data-id="${key}" data-type="DOLLARS">${key}</button>`
    });
    html += `</div>
            <hr class="hr-divider"/>
            <div class="container-cents"><p>${iconCents}CENTAVOS</p>
        `;
    $.each(CENTS, (key, value) => {
        CENTS[key] = 0;
        html += `<button type="button" class="btnAddCent" data-id="${key}" data-type="CENTS">${key}</button>`
    });
    html += '</div>';
    $('.current-options').append(html);
    $('.current-options button').on('click', addValue);
}



function drawCurrentPayment(currentPayment) {
    const aux = Object.entries(currentPayment).reduce((acc, [outerKey, innerObj]) => {
        const innerHTML = Object.entries(innerObj)
            .map(([innerKey, value]) => `
                    <div class="${outerKey}" data-id="${innerKey}">
                        <div>${outerKey === "DOLLARS" ? iconDollars : iconCents}${innerKey}</div>
                        <div>X ${value}</div>
                    </div>`)
            .join('');
        return acc + innerHTML;
    }, '');
    return aux;
}

// Diable the not necessary inputs of the form
function isCobroChecked() {
    const isDisabled = $('#idCobro').prop('checked');
    $('input[name="inputNumbers"], input[name="chkDigitsRandom"], .container-operation input')
        .prop('disabled', isDisabled);
}