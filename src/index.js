// save for grabbing the holiday names - "https://date.nager.at/api/v2/publicholidays/2022/US"
/**
 * Basic setup:
 * - Upon loading, we need to populate the two dropdowns with years and holiday names
 *    - The holidays will be populated through the API but we can utilize a JSON server for this
 * - Event listeners:
 *    - Submit button to populate dates
 *    - Click button to calculate the days until we hit that holiday
 * - Separate functions
 *    - 
 */

// Make this more dynamic in the future
const countryCode = "US";
const currentYear = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  initialize();
})

function initialize() {
  populateYearDropdown();
}

function populateYearDropdown() {
  const yearDropdown = document.getElementById("year");
  let option;
  // The API allows for years from 1921 until 2100
  for (let i = 1925; i <= 2100; ++i) {
    option = document.createElement("option");
    option.value = i;
    option.id = i;
    option.innerText = i;
    yearDropdown.appendChild(option);
  }
  // Selects the current year
  document.getElementById(String(currentYear)).selected = 'selected';
}