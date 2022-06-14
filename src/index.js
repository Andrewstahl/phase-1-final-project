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
  populateHolidayDropdown();
  populateYearDropdown();

  document.getElementById("holiday_date_picker").addEventListener("submit", e => {
    e.preventDefault();
    /**
     * The code on getting the holidays is a bit longwinded but we need to get
     * the underlying text of the option, not the value. If we just did 
     * e.target.holidays.innerText, it would print out all of the 
     */
    handleSubmit(e.target.holidays.options[e.target.holidays.selectedIndex].text, e.target.year.value);
  })
}

function populateHolidayDropdown() {
  const holidayDropdown = document.getElementById("holidays");
  // This is meant to find all non-alphanumeric characters in
  // the holiday name so we can add that to the ID/value of the option
  const regex = /[\W_]+/g;
  // Save this here for when we have to create new options for the dropdown.
  let option;
  const addedHolidays = [];
  
  // Note: we're going to use the current year to populate the holidays.
  // That way we always have the most up to date holiday setup
  fetch("https://date.nager.at/api/v2/publicholidays/" + currentYear + "/" + countryCode)
  .then(function(response) {
    if (response.status !== 200) {
      console.warn("Looks like we didn't get a good request. Request Code: " + response.status);
      return
    }
    return response.json();
  })
  .then(data => data.forEach(holiday => {
    /**
     * This handles if we've already added the holiday.
     * I noticed on a few of the holidays, like Good Friday,
     * this is actually added two times by mistake.
     */
    if (addedHolidays.indexOf(holiday.name) === -1) {
      option = document.createElement("option");
      option.innerText = holiday.name;
      
      let holidayWithoutSpecialCharacters = holiday.name.replace(regex, "").toLowerCase();
      option.value = holidayWithoutSpecialCharacters;
      option.id = holidayWithoutSpecialCharacters;
      
      holidayDropdown.appendChild(option);
      // Keep track of what we've added so we can prevent duplicates
      addedHolidays.push(holiday.name);
    }
  }))
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

function handleSubmit(holiday, year) {

}