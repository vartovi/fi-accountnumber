var message = "";

function FinnishBankAccountNumber(userInput) {
    this.accNumber = userInput;
}

FinnishBankAccountNumber.prototype.toLong = function() {
    if (this.accNumber.indexOf('-') != 6 || this.accNumber.length > 15 || this.accNumber.length < 9) {

        message = "Invalid account number. Proper account number is 8-14 numbers long and contains dash after first 6 numbers";
        return false;

    } else {

        var accNumberMachineForm = this.accNumber.replace('-', '');
        var accNumberLength = this.accNumber.length;

        if (this.accNumber.substr(0, 1) == '4' || this.accNumber.substr(0, 1) == '5') {
            accNumberMachineForm = accNumberMachineForm.substr(0, 7) + addZeros(accNumberLength) + accNumberMachineForm.substr(7);
        } else {
            accNumberMachineForm = accNumberMachineForm.substr(0, 6) + addZeros(accNumberLength) + accNumberMachineForm.substr(6);
        }

        var checksum = calculateChecksum(accNumberMachineForm);

        if (checksum == accNumberMachineForm.substr(accNumberMachineForm.length - 1)) {
            message = "<br>Account number is <b>valid</b>. Checksum <b>" + checksum + "</b> matches the last digit.";
        } else {
            message = "<br>Account number is <b>invalid</b>. Checksum <b>" + checksum + "</b> does not match the last digit.";
        }

        return accNumberMachineForm;
    }
}


function addZeros(len) {

    var target = 14 - len;
    var zeros = "";

    for (var i = 0; i <= target; i++) {
        zeros = zeros + "0"
    }
    return zeros;
}

function calculateChecksum(numberToCheck) {

    var numArray = numberToCheck.split("");
    var total = 0;

    for (var i = 12; i >= 0; i--) {
        if (i % 2 == 0) {
            if ((numArray[i] * 2) > 9) {
                total = total + 1 + Number(numArray[i] * 2) % 10;

            } else {
                total = total + Number(numArray[i]) * 2;

            }
        } else {
            total = total + Number(numArray[i]);
        }
    }
    if (total % 10 == 0) {
        total = 0;
    } else {
        total = 10 - total % 10;
    }
    return total;
}

function convertToMachineForm() {
    var numberToConvert = new FinnishBankAccountNumber(document.getElementById('userInput').value);
    if (numberToConvert.toLong()) {
        document.getElementById('message').innerHTML = "Account number <b>" + numberToConvert.accNumber + "</b> in machine form is: <b>" + numberToConvert.toLong() + "</b>" + message;
    } else {
        document.getElementById('message').innerHTML = message;
    }

}