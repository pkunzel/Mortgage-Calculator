/**
 * @description Shortcut for the querySelector
 */
const $query = document.querySelector.bind(document);

/**
 * @description Shortcut for the querySelectorAll
 */
const $queryAll = document.querySelectorAll.bind(document);

/**
 * @description Adds a mask that converts a plain number to Dollar
 * @param {number} value The value to received the Dollar Mask
 * @returns {string} a string representation of the value in Dollars
 */
const toDollar = (value) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value).replace(/^(\D+)/, "$1 ");

/**
 * @description Devides an annual value in months
 * @param {number} value the value to be calculated.
 * @returns {number} the value divided by 12
 */
const perMonth = (value) => value / 12;

/**
 * @description Converts an annual non-decimal percentage value and converts it to a monthly percentage
 * @param {number} value the percentage value to be "converted"
 * @returns {number} the monthly value as a decimal percentage
 */
const percentagePerMonth = (value) => perMonth(value / 100);
