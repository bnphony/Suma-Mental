export function mainPayment() {
    $('input[name="modos"]').on('change', function() {
        const isDisabled = $('#idCobro').prop('checked');
        $('input[name="inputNumbers"], input[name="chkDigitsRandom"], .container-operation input')
            .prop('disabled', isDisabled);
    });
}