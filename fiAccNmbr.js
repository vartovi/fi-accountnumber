function FinnishBankAccountNumber(userInput) {
    this.accNumber = userInput;
}

FinnishBankAccountNumber.prototype.toLong = function() {
    if (this.accNumber.indexOf('-') != 6 || this.accNumber.length > 15 || this.accNumber.length < 9) {

        var error = "Invalid account number. Proper account number is 8-14 numbers long and contains dash after first 6 numbers";
        console.log(error);
    } else {

        var accNumberMachineForm = this.accNumber.replace('-', '');
        var accNumberLength = this.accNumber.length;

        if (this.accNumber.substr(0, 1) == '4' || this.accNumber.substr(0, 1) == '5') {
            accNumberMachineForm = accNumberMachineForm.substr(0, 7) + addZeros(accNumberLength) + accNumberMachineForm.substr(7);
        } else {
            accNumberMachineForm = accNumberMachineForm.substr(0, 6) + addZeros(accNumberLength) + accNumberMachineForm.substr(6);
        }

        if (calculateChecksum(accNumberMachineForm) == accNumberMachineForm.substr(accNumberMachineForm.length - 1)) {
            console.log("Account number " + this.accNumber + " is valid");
            console.log("In machine form " + accNumberMachineForm + " checksum: " + calculateChecksum(accNumberMachineForm) + " matches the last digit");
            return "In machine form " + accNumberMachineForm + " checksum: " + calculateChecksum(accNumberMachineForm) + " matches the last digit";
        } else {
            console.log("Invalid account number " + this.accNumber);
            console.log("Checksum: " + calculateChecksum(accNumberMachineForm) + " does not match the last digit");
        }

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
    total = 10 - total % 10;
    return total;
}

function displayMessage() {
    var numberToConvert = new FinnishBankAccountNumber(document.getElementById('userInput').value);
    document.getElementById('message').innerHTML = numberToConvert.toLong();

}