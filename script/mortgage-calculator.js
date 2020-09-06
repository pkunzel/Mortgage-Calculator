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


function _instanceof(e, n) {
	return null != n && "undefined" != typeof Symbol && n[Symbol.hasInstance]
		? !!n[Symbol.hasInstance](e)
		: e instanceof n;
}
function _classCallCheck(e, n) {
	if (!_instanceof(e, n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, n) {
	for (var t = 0; t < n.length; t++) {
		var r = n[t];
		(r.enumerable = r.enumerable || !1),
			(r.configurable = !0),
			"value" in r && (r.writable = !0),
			Object.defineProperty(e, r.key, r);
	}
}
function _createClass(e, n, t) {
	return n && _defineProperties(e.prototype, n), t && _defineProperties(e, t), e;
}
var $query = document.querySelector.bind(document),
	$queryAll = document.querySelectorAll.bind(document),
	toDollar = function (e) {
		return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
			.format(e)
			.replace(/^(\D+)/, "$1 ");
	},
	perMonth = function (e) {
		return e / 12;
	},
	percentagePerMonth = function (e) {
		return perMonth(e / 100);
	},
	Calculator = (function () {
		function e(n) {
			_classCallCheck(this, e), Object.assign(this, n);
		}
		return (
			_createClass(e, [
				{
					key: "getTax",
					value: function () {
						return perMonth(this.annualTax.value);
					},
				},
				{
					key: "getTaxDollars",
					value: function () {
						return toDollar(this.getTax());
					},
				},
				{
					key: "getInsurance",
					value: function () {
						return perMonth(this.annualInsurance.value);
					},
				},
				{
					key: "getInsuranceDollars",
					value: function () {
						return toDollar(this.getInsurance());
					},
				},
				{
					key: "getPrincipleAndInterest",
					value: function () {
						var e = Number(this.interestRate.value),
							n = Number(this.loanAmount.value),
							t = Number(this.yearsOfMortgage.value);
						return (percentagePerMonth(e) * n) / (1 - Math.pow(1 + percentagePerMonth(e), 12 * -t));
					},
				},
				{
					key: "getPrincipleAndInterestDollars",
					value: function () {
						return toDollar(this.getPrincipleAndInterest());
					},
				},
				{
					key: "getMonthlyPayments",
					value: function () {
						return toDollar(this.getPrincipleAndInterest() + this.getTax() + this.getInsurance());
					},
				},
			]),
			e
		);
	})();
function init() {
	$query("button").addEventListener("click", handleCalculate),
		$queryAll('.inputRangeBlock input[type="range"]').forEach(function (e) {
			var n = (e.value / e.max) * 100;
			(e.style.background = "linear-gradient(90deg, rgb(10,10,01) 0 "
				.concat(n, "%, rgb(222,222,222) ")
				.concat(n, "%)")),
				e.addEventListener("input", handleInputRange);
		});
}
function handleInputRange(e) {
	var n = e.target,
		t = (n.value / n.max) * 100;
	(n.style.background = "linear-gradient(90deg, rgb(10,10,01) 0 ".concat(t, "%, rgb(222,222,222) ").concat(t, "%)")),
		(n.nextElementSibling.nextElementSibling.value = n.value);
}
function handleCalculate(e) {
	var n = {
		annualTax: $query("#annualTax"),
		annualInsurance: $query("#annualInsurance"),
		interestRate: $query("#interestRate"),
		loanAmount: $query("#loanAmount"),
		yearsOfMortgage: $query("#yearsOfMortgage"),
	};
	if (checkInputs([n.annualTax, n.annualInsurance, n.loanAmount])) {
		var t = new Calculator(n),
			r = $query("#resultPrinciple");
		(r.textContent = t.getPrincipleAndInterestDollars()), (r.style.color = "black");
		var a = $query("#resultTax");
		(a.textContent = t.getTaxDollars()), (a.style.color = "black");
		var l = $query("#resultInsurance");
		(l.textContent = t.getInsuranceDollars()), (l.style.color = "black");
		var u = $query("#resultMonthlyPay");
		(u.textContent = t.getMonthlyPayments()),
			(u.style.color = "black"),
			(e.target.textContent = "Recalculate"),
			($query(".results").style.display = "block");
	}
}
function checkInputs(e) {
	var n = !0;
	return (
		e.forEach(function (e) {
			"" == e.value.trim() &&
				((n = !1),
				(e.nextElementSibling.textContent =
					screen.width > 640 ? "".concat(e.name, " is mandatory") : "Mandatory Field")),
				isNaN(e.value) && ((n = !1), (e.nextElementSibling.textContent = "Value must be numeric")),
				n
					? ((e.style.borderColor = "black"),
					  (e.nextElementSibling.textContent = ""),
					  $query(".results").classList.add("showResults"))
					: (e.style.borderColor = "red");
		}),
		n
	);
}
window.addEventListener("load", init);