/**
 * @description Gets the monthly tax based on the annual value
 * @returns {number} the monthly tax value
 */
const getTax = () => perMonth($query("#annualTax"));

/**
 * @description Gets the monthly tax in Dollars
 * @returns {string} A String with the monthly value masked in dollars
 */
const getTaxDollars = () => toDollar(getTax());

/**
 * @description Gets the Monthly Insurance based on the annual value
 * @returns {number} the monthly insurance value
 */
const getInsurance = () => perMonth($query("#annualInsurance"));

/**
 * @description Gets the monthly insurance in Dollars
 * @returns {number} A String with the monthly value masked in dollars
 */
const getInsuranceDollars = () => toDollar(getInsurance());

/**
 * @description Calculaters the Principle and interest based on the formula provided
 * @returns {number} The Future Value divided by the interest over the period
 */
const getPrincipleAndInterest = () => {
    const interestRate = $query("#interestRate");
    const loanAmount = $query("#loanAmount");
    const yearsOfMortgage = $query("#yearsOfMortgage");

    const FutureValue = percentagePerMonth(interestRate) * loanAmount;
    const InterestOverPeriod = (1 - Math.pow((1 + (percentagePerMonth(interestRate)), -yearsOfMortgage * 12)));

    return FutureValue / InterestOverPeriod;
};

/**
 * @description Gets Principle and interest masked in Dollars
 * @returns {string} A String with the principle value masked in dollars
 */
const getPrincipleAndInterestDollars = () => toDollar(getPrincipleAndInterest);

/**
 * @description Gets the monthly paymets masked in dollars
 * @returns {string} A string containing the monthly payments masked in dollars
 */
const getMonthlyPayments = () => toDollar(getPrincipleAndInterest() + getTax() + getInsurance());