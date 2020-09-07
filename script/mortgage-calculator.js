"use strict";

/*
 * 1) This is the transpiled version of the following JavaScript files
 *	- util.js
 *	- calculator.js
 *	- main.js
 * 2) The files are laid in the same order as above
 * 3) The transpulation was done with the 2015 preset
 * 4) This is NOT a working file. Please change the originals and transple again
 */


function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description Shortcut for the querySelector
 */
var $query = document.querySelector.bind(document);

/**
 * @description Shortcut for the querySelectorAll
 */
var $queryAll = document.querySelectorAll.bind(document);

/**
 * @description Adds a mask that converts a plain number to Dollar
 * @param {number} value The value to received the Dollar Mask
 * @returns {string} a string representation of the value in Dollars
 */
var toDollar = function toDollar(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value).replace(/^(\D+)/, "$1 ");
};

/**
 * @description Devides an annual value in months
 * @param {number} value the value to be calculated.
 * @returns {number} the value divided by 12
 */
var perMonth = function perMonth(value) {
  return value / 12;
};

/**
 * @description Converts an annual non-decimal percentage value and converts it to a monthly percentage
 * @param {number} value the percentage value to be "converted"
 * @returns {number} the monthly value as a decimal percentage
 */
var percentagePerMonth = function percentagePerMonth(value) {
  return perMonth(value / 100);
};

var Calculator = /*#__PURE__*/function () {
  function Calculator(data) {
    _classCallCheck(this, Calculator);

    Object.assign(this, data);
  }
  /**
   * @description Gets the monthly tax based on the annual value
   * @returns {number} the monthly tax value
   */
  _createClass(Calculator, [{
    key: "getTax",
    value: function getTax() {
      return perMonth(this.annualTax.value);
    }
    /**
     * @description Gets the monthly tax in Dollars
     * @returns {string} A String with the monthly value masked in dollars
     */
  }, {
    key: "getTaxDollars",
    value: function getTaxDollars() {
      return toDollar(this.getTax());
    }
    /**
     * @description Gets the Monthly Insurance based on the annual value
     * @returns {number} the monthly insurance value
     */
  }, {
    key: "getInsurance",
    value: function getInsurance() {
      return perMonth(this.annualInsurance.value);
    }
    /**
     * @description Gets the monthly insurance in Dollars
     * @returns {number} A String with the monthly value masked in dollars
     */
  }, {
    key: "getInsuranceDollars",
    value: function getInsuranceDollars() {
      return toDollar(this.getInsurance());
    }
    /**
     * @description Calculaters the Principle and interest based on the formula provided
     * @returns {number} The Future Value divided by the interest over the period
     */
  }, {
    key: "getPrincipleAndInterest",
    value: function getPrincipleAndInterest() {
      var interestRate = Number(this.interestRate.value);
      var loanAmount = Number(this.loanAmount.value);
      var yearsOfMortgage = Number(this.yearsOfMortgage.value);
      var FutureValue = percentagePerMonth(interestRate) * loanAmount;
      var InterestOverPeriod = 1 - Math.pow(1 + percentagePerMonth(interestRate), -yearsOfMortgage * 12);
      return FutureValue / InterestOverPeriod;
    }
    /**
     * @description Gets Principle and interest masked in Dollars
     * @returns {string} A String with the principle value masked in dollars
     */
  }, {
    key: "getPrincipleAndInterestDollars",
    value: function getPrincipleAndInterestDollars() {
      return toDollar(this.getPrincipleAndInterest());
    }
    /**
     * @description Gets the monthly paymets masked in dollars
     * @returns {string} A string containing the monthly payments masked in dollars
     */
  }, {
    key: "getMonthlyPayments",
    value: function getMonthlyPayments() {
      return toDollar(this.getPrincipleAndInterest() + this.getTax() + this.getInsurance());
    }
  }]);

  return Calculator;
}(); // Event to be fired when the screen loads

/**
 * @description Function to be called when the Window Loads.
 */
function init() {
  $query("button").addEventListener("click", handleCalculate); // Sets the range color based o the init value
  // Adds the event listener to each input range

  $queryAll('.inputRangeBlock input[type="range"]').forEach(function (element) {
    var percentRange = element.value / element.max * 100;
    element.style.background = "linear-gradient(90deg, rgb(10,10,01) 0 ".concat(percentRange, "%, rgb(222,222,222) ").concat(percentRange, "%)");
    element.addEventListener("input", handleInputRange);
  });
}

/**
 * @description Handles the change in value from the input range elements
 * @param {object} event Default event object passed by the event listener
 */
function handleInputRange(event) {
  var inputRange = event.target;
  var percentRange = inputRange.value / inputRange.max * 100;
  inputRange.style.background = "linear-gradient(90deg, rgb(10,10,01) 0 ".concat(percentRange, "%, rgb(222,222,222) ").concat(percentRange, "%)");
  inputRange.nextElementSibling.nextElementSibling.value = inputRange.value;
}

/**
 * @description Handles the click on the calculate button
 * @param {object} event Default event object passed by the event listener
 */
function handleCalculate(event) {
  var mortData = {
    annualTax: $query("#annualTax"),
    annualInsurance: $query("#annualInsurance"),
    interestRate: $query("#interestRate"),
    loanAmount: $query("#loanAmount"),
    yearsOfMortgage: $query("#yearsOfMortgage")
  };

  if (checkInputs([mortData.annualTax, mortData.annualInsurance, mortData.loanAmount])) {
    var calc = new Calculator(mortData);
    var princ = $query("#resultPrinciple");
    princ.textContent = calc.getPrincipleAndInterestDollars();
    princ.style.color = "black";
    var tax = $query("#resultTax");
    tax.textContent = calc.getTaxDollars();
    tax.style.color = "black";
    var insurance = $query("#resultInsurance");
    insurance.textContent = calc.getInsuranceDollars();
    insurance.style.color = "black";
    var monthly = $query("#resultMonthlyPay");
    monthly.textContent = calc.getMonthlyPayments();
    monthly.style.color = "black";
    event.target.textContent = "Recalculate";
    $query(".results").style.display = "block";
  }
}

/**
 * @description Checks if the inputs contain numbers and are not empty
 * @param {Array} checklist An array with the HTML Elements to be checked
 */
function checkInputs(checklist) {
  var passed = true;
  checklist.forEach(function (item) {
    if (item.value.trim() == "") {
      item.value = "";
      passed = false;
      item.nextElementSibling.textContent = screen.width > 640 ? "".concat(item.name, " is mandatory") : "Mandatory Field";
    }

    if (passed) {
      item.style.borderColor = "black";
      item.nextElementSibling.textContent = "";
      $query(".results").classList.add("showResults");
    } else {
      item.style.borderColor = "red";
    }
  });
  return passed;
}

window.addEventListener("load", init);