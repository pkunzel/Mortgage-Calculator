/**
 * @description Function to be called when the Window Loads
 */
function init() {
	$query("button").addEventListener("click", handleCalculate);

	$queryAll('.inputRangeBlock input[type="range"]').forEach((element) => {
		const percentRange = (element.value / element.max) * 100;
		element.style.background = `linear-gradient(90deg, rgb(10,10,01) 0 ${percentRange}%, rgb(222,222,222) ${percentRange}%)`;
		element.addEventListener("input", handleInputRange);
	});
}
/**
 *
 * @param {*} event
 */
function handleInputRange(event) {
	const inputRange = event.target;
	const percentRange = (inputRange.value / inputRange.max) * 100;
	inputRange.style.background = `linear-gradient(90deg, rgb(10,10,01) 0 ${percentRange}%, rgb(222,222,222) ${percentRange}%)`;
	inputRange.nextElementSibling.nextElementSibling.value = inputRange.value;
}

/**
 *
 * @param {*} event
 */
function handleCalculate(event) {
	const mortData = {
		annualTax: $query("#annualTax"),
		annualInsurance: $query("#annualInsurance"),
		interestRate: $query("#interestRate"),
		loanAmount: $query("#loanAmount"),
		yearsOfMortgage: $query("#yearsOfMortgage"),
	};

	if (checkInputs([mortData.annualTax, mortData.annualInsurance, mortData.loanAmount])) {
		const calc = new Calculator(mortData);

		let princ = $query("#resultPrinciple");
		princ.textContent = calc.getPrincipleAndInterestDollars();
		princ.style.color = "black";

		let tax = $query("#resultTax");
		tax.textContent = calc.getTaxDollars();
		tax.style.color = "black";

		let insurance = $query("#resultInsurance");
		insurance.textContent = calc.getInsuranceDollars();
		insurance.style.color = "black";

		let monthly = $query("#resultMonthlyPay");
		monthly.textContent = calc.getMonthlyPayments();
		monthly.style.color = "black";

		event.target.textContent = "Recalculate";
		$query(".results").style.display = "block";
	}
}

/**
 *
 * @param {*} checklist
 */
function checkInputs(checklist) {
	let passed = true;
	checklist.forEach((item) => {
		if (item.value.trim() == "") {
			passed = false;
			showElementWithMessage(item.nextElementSibling, `${item.name} is mandatory`);
			item.style.borderColor = "red";
		} else if (isNaN(item.value)) {
			passed = false;
			showElementWithMessage(item.nextElementSibling, "Value must be numeric");
			item.style.borderColor = "red";
		} else {
			showElementWithMessage(item.nextElementSibling, "");
			item.style.borderColor = "red";
		}
	});

	return passed;
}

/**
 *
 * @param {*} element
 * @param {*} msg
 */
function showElementWithMessage(element, msg) {
	element.style.borderColor = "red";
	element.textContent = msg;
}

window.addEventListener("load", init);
