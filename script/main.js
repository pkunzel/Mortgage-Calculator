/**
 * @description Function to be called when the Window Loads
 */
function init() {
    const calc = new Calculator(
        $query("#annualTax"),
        $query("#annualInsurance"),
        $query("#interestRate"),
        $query("#loanAmount"),
        $query("#yearsOfMortgage")
    )

    $query("button").addEventListener("click", calculatMortgage.bind(calc));

};

/**
 * @description Calculates the Mortgage data based on the provided values.
 */
function calculatMortgage() {
    console.log(this.getTaxDollars());
}


window.addEventListener("load", init);
