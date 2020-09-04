/**
 * @description Function to be called when the Window Loads
 */
function init() {
	$query("button").addEventListener("click", handleCalculate);

	$queryAll('.inputRangeBlock input[type="range"]').forEach((element) => {
		element.addEventListener("input", handleInputRange);
	});
}

function handleInputRange(event) {
	const inputRange = event.target;
	const percentRange = (inputRange.value / inputRange.max) * 100;
	inputRange.style.background = `linear-gradient(90deg, rgb(10,10,01) 0 ${percentRange}%, rgb(222,222,222) ${percentRange}%)`;
	inputRange.nextElementSibling.nextElementSibling.value = inputRange.value;
}

function handleCalculate() {
	const mortData = {
		annualTax: $query("#annualTax"),
		annualInsurance: $query("#annualInsurance"),
		interestRate: $query("#interestRate"),
		loanAmount: $query("#loanAmount"),
		yearsOfMortgage: $query("#yearsOfMortgage"),
	};

	if (checkInputs([mortData.annualTax, mortData.annualInsurance, mortData.loanAmount])) {
		const calc = new Calculator(mortData);

		$query("#resultPrinciple").textContent = calc.getPrincipleAndInterestDollars();
		$query("#resultTax").textContent = calc.getTaxDollars();
		$query("#resultMonthlyPay").textContent = calc.getMonthlyPayments();
	}
}

function checkInputs(checklist) {
	let passed = true;
	checklist.forEach((item) => {
		if (item.value.trim() == "") {
			passed = false;
			showElementWithMessage(item.nextElementSibling, `${item.name} is mandatory`);
		} else if (isNaN(item.value)) {
			passed = false;
			showElementWithMessage(item.nextElementSibling, "Value must be numeric");
		} else {
			showElementWithMessage(item.nextElementSibling, "");
		}
	});

	return passed;
}

function showElementWithMessage(element, msg) {
	element.style.borderColor = "red";
	element.textContent = msg;
}

window.addEventListener("load", init);
