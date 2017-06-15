var message = "";

function FinnishBankAccountNumber(userInput) {
    this.accNumber = userInput;
}

// Function to convert traditional Finnish bank account number to machine form.
// Function first checks if number is in proper form (no letters, dash in right place, correct length).
// If number is correct, dash is removed and zeros added after 6th or 7th number depending on first digit.
// Function also checks if numbers checksum is correct using calculateChecksum-function and writes a message depending on result.
FinnishBankAccountNumber.prototype.toLong = function() {
    if (!this.accNumber.replace('-', '').match(/^\d+$/)) {

        message = "Invalid account number. No letters allowed.";
        return false;

    } else if (this.accNumber.indexOf('-') != 6 || this.accNumber.length > 15 || this.accNumber.length < 9) {

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
            message = "<br>Account number is <b>valid</b>. Checksum <b>" + checksum + "</b> is equal to the last digit.";
        } else {
            message = "<br>Account number is <b>invalid</b>. Checksum <b>" + checksum + "</b> is not equal to the last digit.";
        }

        return accNumberMachineForm;
    }
}

// Function gets account number length as parameter and substracts it from 14 to get target number of zeros needed.
// For loop then adds the zeros to a string variable and returns it.
function addZeros(len) {

    var target = 14 - len;
    var zeros = "";

    for (var i = 0; i <= target; i++) {
        zeros = zeros + "0"
    }
    return zeros;
}

// Function to calculate checksum using Luhn-algorithm.
// Function splits machineform account numbers into array, then starting from second rightmost number doubles every other value and adds numbers of those values together
// Total is then substracted from next even ten.
function calculateChecksum(numberToCheck) {

    var numArray = numberToCheck.split("");
    var total = 0;

    for (var i = 12; i >= 0; i--) {
        // If position in array is even, then double the number else add it to the total
        if (i % 2 == 0) {
            // If the number doubled is 10 or greater add the digits together
            if ((numArray[i] * 2) > 9) {
                total = total + 1 + Number(numArray[i] * 2) % 10;
            } else {
                total = total + Number(numArray[i]) * 2;
            }
        } else {
            total = total + Number(numArray[i]);
        }
    }
    // If the result from substracting from next even ten would be 10 (ie. 40-30) then set checksum to 0
    if (total % 10 == 0) {
        total = 0;
    } else {
        total = 10 - total % 10;
    }
    return total;
}

// This function is called from the button in index.html page.
// Function creates new FinnishBankAccountNumber-object from number written in input field and assigns it to numberToConvert-variable.
// If number passes the initial validation it is then converted to machine form using toLong()-function and results and validity are displayed in message field.
function convertToMachineForm() {
    var numberToConvert = new FinnishBankAccountNumber(document.getElementById('userInput').value);
    if (numberToConvert.toLong()) {
        document.getElementById('message').innerHTML = "Account number <b>" + numberToConvert.accNumber + "</b> in machine form is: <b>" + numberToConvert.toLong() + "</b>" + message;
    } else {
        document.getElementById('message').innerHTML = message;
    }

}