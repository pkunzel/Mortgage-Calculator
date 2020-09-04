class Calculator {
	constructor(data) {
		Object.assign(this, data);
	}

	/**
	 * @description Gets the monthly tax based on the annual value
	 * @returns {number} the monthly tax value
	 */
	getTax() {
		return perMonth(this.annualTax.value);
	}

	/**
	 * @description Gets the monthly tax in Dollars
	 * @returns {string} A String with the monthly value masked in dollars
	 */
	getTaxDollars() {
		return toDollar(this.getTax());
	}

	/**
	 * @description Gets the Monthly Insurance based on the annual value
	 * @returns {number} the monthly insurance value
	 */
	getInsurance() {
		return perMonth(this.annualInsurance.value);
	}

	/**
	 * @description Gets the monthly insurance in Dollars
	 * @returns {number} A String with the monthly value masked in dollars
	 */
	getInsuranceDollars() {
		return toDollar(this.getInsurance());
	}

	/**
	 * @description Calculaters the Principle and interest based on the formula provided
	 * @returns {number} The Future Value divided by the interest over the period
	 */
	getPrincipleAndInterest() {
		const interestRate = Number(this.interestRate.value);
		const loanAmount = Number(this.loanAmount.value);
		const yearsOfMortgage = Number(this.yearsOfMortgage.value);

		const FutureValue = percentagePerMonth(interestRate) * loanAmount;

		const InterestOverPeriod = 1 - Math.pow(1 + percentagePerMonth(interestRate), -yearsOfMortgage * 12);

		return FutureValue / InterestOverPeriod;
	}

	/**
	 * @description Gets Principle and interest masked in Dollars
	 * @returns {string} A String with the principle value masked in dollars
	 */
	getPrincipleAndInterestDollars() {
		return toDollar(this.getPrincipleAndInterest());
	}

	/**
	 * @description Gets the monthly paymets masked in dollars
	 * @returns {string} A string containing the monthly payments masked in dollars
	 */
	getMonthlyPayments() {
		return toDollar(this.getPrincipleAndInterest() + this.getTax() + this.getInsurance());
	}
}
