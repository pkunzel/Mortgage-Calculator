// Event to be fired when the screen loads
window.addEventListener("load", init);

/**
 * @description Function to be called when the Window Loads.
 */
function init() {
	$query("button").addEventListener("click", handleCalculate);

	// Sets the range color based o the init value
	// Adds the event listener to each input range
	$queryAll('.inputRangeBlock input[type="range"]').forEach((element) => {
		const percentRange = (element.value / element.max) * 100;
		element.style.background = `linear-gradient(90deg, rgb(10,10,01) 0 ${percentRange}%, rgb(222,222,222) ${percentRange}%)`;
		element.addEventListener("input", handleInputRange);
	});
}

/**
 * @description Handles the change in value from the input range elements
 * @param {object} event Default event object passed by the event listener
 */
function handleInputRange(event) {
	const inputRange = event.target;
	const percentRange = (inputRange.value / inputRange.max) * 100;
	inputRange.style.background = `linear-gradient(90deg, rgb(10,10,01) 0 ${percentRange}%, rgb(222,222,222) ${percentRange}%)`;
	inputRange.nextElementSibling.nextElementSibling.value = inputRange.value;
}

/**
 * @description Handles the click on the calculate button
 * @param {object} event Default event object passed by the event listener
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
 * @description Checks if the inputs contain numbers and are not empty
 * @param {Array} checklist An array with the HTML Elements to be checked
 */
function checkInputs(checklist) {
	let passed = true;
	checklist.forEach((item) => {
		if (item.value.trim() == "") {
			item.value = "";
			passed = false;
			item.nextElementSibling.textContent = screen.width > 640 ? `${item.name} is mandatory` : "Mandatory Field";
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
