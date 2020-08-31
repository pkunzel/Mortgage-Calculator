

/**
 * @description Gets the monthly tax based on the annual value
 * @returns {number} the monthly tax value
 */
const getTax = () => perMonth($query("#annualTax"));

/**
 * @description Gets the monthly tax in Dollars
 * @returns {number} the Monthly Tax
 */
const getTaxDollars = () => toDollar(getTax());

const getInsurance = () => perMonth($query("#annualInsurance"));
const getInsuranceDollars = () => toDollar(getInsurance());

const getPrincipleAndInterest = () => {
    const interestRate = $query("#interestRate");
    const loanAmount = $query("#loanAmount");
    const yearsOfMortgage = $query("#yearsOfMortgage");

    const FutureValue = percentagePerMonth(interestRate) * loanAmount;
    const InterestOverPeriod = (1 - Math.pow((1 + (percentagePerMonth(interestRate)), -yearsOfMortgage * 12)));

    return FutureValue / InterestOverPeriod;
};

const getPrincipleAndInterestDollars = () => toDollar(getPrincipleAndInterest);

const getMonthlyPayments = () => toDollar(getPrincipleAndInterest() + getTax() + getInsurance());