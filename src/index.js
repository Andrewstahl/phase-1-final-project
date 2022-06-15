/** 
 * Makes this more dynamic in the future if we 
 * want to include different countries in the mix 
*/ 
const countryCode = "US";
const currentYear = new Date().getFullYear();

// Event Listener # 0
document.addEventListener("DOMContentLoaded", () => {
  initialize();
})

function initialize() {
  // Populates the holiday dropdown
  fetchData(currentYear, populateHolidayDropdown);
  populateYearDropdown();

// Event Listener # 1
  document.getElementById("holiday_date_picker").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("calculate_days_until_return").innerText = "";
    /**
     * The code on getting the holidays is a bit longwinded but we need to get
     * the underlying text of the option, not the value. If we just did 
     * e.target.holidays.innerText, it would print out all of the 
     */
    // Do we need to take up memory for these? Certainly makes it more readable to use
    // variable names
    const yearSelected = e.target.year.value;
    const holidaySelected = e.target.holidays.options[e.target.holidays.selectedIndex].text; 
    if (holidaySelected !== "Choose a Holiday...") {
      fetchData(yearSelected, handleSubmit, holidaySelected)
    } else {
      alert ("Please pick a valid holiday")
      document.getElementById("holidays").className = "red-box";
    }

// Event Listener # 2
    document.getElementById("holidays").addEventListener("change", e => {
      // This would remove the red-box class name from this element if it exists
      e.target.className = ""
    })
  })

// Event Listener # 3
  document.getElementById("calculate_days_until_button").addEventListener("click", () => {
    handleDaysUntil();
  })

  Array.from(document.getElementsByClassName("grey_hover_button")).forEach(button => () => {
    button.addEventListener("mousedown", () => {
      button.style.color = "#fff";
    })
  })
  // console.log(buttons);
  // .addEventListener("mousedown", () => console.log("mousedown"))
}

/** 
 * Get feedback on this - should I include an optional parameter in here?
 * It helps this function work for handling submit but it's not needed 
 * for other callback functions like populateHolidayDropdown. It will
 * still run without a hitch, but still something to seek guidance on.
*/
function fetchData(year, callback, optionalParameter) {
  fetch("https://date.nager.at/api/v2/publicholidays/" + year + "/" + countryCode)
  .then(function(response) {
    if (response.status !== 200) {
      console.warn("Looks like we didn't get a good request. Request Code: " + response.status);
      return
    }
    return response.json();
  })
  .then(data => callback(data, optionalParameter));
}

function populateHolidayDropdown(holidayData) {
  const holidayDropdown = document.getElementById("holidays");
  // This is meant to find all non-alphanumeric characters in
  // the holiday name so we can add that to the ID/value of the option
  const regex = /[\W_]+/g;
  // Save this here for when we have to create new options for the dropdown.
  let option;
  const addedHolidays = [];

// Array method
  holidayData.forEach(holiday => {
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
  })
}

function populateYearDropdown() {
  const yearDropdown = document.getElementById("year");
  let option;

  // The API allows for years from 1925 until 2100
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

function handleSubmit(holidayData, holidaySelected) {
  const holidayReturnDate = document.getElementById("holiday_return_date");
  const holidayReturnWeekend = document.getElementById("holiday_return_weekend");

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  // Could use a normal for loop to optimize for time
  const len = holidayData.length;
  let holiday;

  for (let i = 0; i < len; ++i) {
    // console.log(holidayData[i])
    if (holidayData[i].name === holidaySelected) {
      holiday = holidayData[i];
      const returnedDate = new Date(holiday.date)
      // We're adding this to a hidden p tag in the body so we 
      // can pull it later on for finding the days until the holiday
      document.getElementById("hidden_date").textContent = holiday.date;

      const day = returnedDate.toLocaleString('default', {weekday: 'long'});
      const month = monthNames[returnedDate.getMonth()]
      const date = returnedDate.getDate();
      
      holidayReturnDate.innerText = `${day}, ${month} ${date}`;

      if (day === "Monday" || day === "Friday") {
        holidayReturnWeekend.innerText = "Congrats, you get an extra long weekend!"
      } else {
        holidayReturnWeekend.innerText = "Sorry, no extra time-off for you. Quit slacking!"
      }

      // Remember - the first month/day start at 0
      fetchFact(returnedDate.getMonth() + 1, returnedDate.getDate() + 1)
      
      // Breaks the loop
      return;
    }
  } 
}

// We can consolidate this with the other fetch by making the url
// as one of the inputs but there's enough difference that we can 
// keep it separate
function fetchFact(month, day) {
  fetch ("https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/selected/" + month + "/" + day)
  .then(res => res.json())
  .then(data => {
    const len = data.selected.length;
    
    // We're going to populate the p element on the page with a random fact from wikipedia
    document.getElementById("wikipedia_fact").innerText = data.selected[Math.floor(Math.random() * (len + 1))].text
  });
}

function handleDaysUntil() {
  const currentDateInSeconds = new Date().getTime();
  const holidayDateInSeconds = new Date(document.getElementById("hidden_date").textContent).getTime();
  // We're first getting the seconds of each of the days, which will give us a clearer
  // path towards figuring out the difference between the two days. Additionally, we'll
  // use Math.floor() to round down so we don't get any decimals
  const difference = Math.floor((holidayDateInSeconds - currentDateInSeconds) / (1000 * 3600 * 24))
  
  let daysUntilReturnText = document.getElementById("calculate_days_until_return");

  switch (true) {
    case (difference < 0):
      daysUntilReturnText.innerText = "Looks like we missed it. Better luck next year!";
      break;
    case (difference === 0):
      daysUntilReturnText.innerText = "That's today, happy holidays!";
      break;
    case (difference === 1):
      daysUntilReturnText.innerText = "That holiday is tomorrow. Make some preparations!";
      break;
    case (difference > 1):
      daysUntilReturnText.innerText = `That holiday is coming up in ${difference} days.`;
      break;    
  }
}