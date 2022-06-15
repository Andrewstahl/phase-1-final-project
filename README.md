# Andrew Stahl's Phase 1 Final Project

This is the repository of my Phase 1 final project for Flatiron School.

## Goal
The goal of this project is leverage my knowledge in HTML, CSS, JavaScript, and APIs to create a single-page application.

## Project Overview
This page prompts the user to pick a US holiday and year from dropdowns. Once they submit, they will see the date and day of that holiday as well as a fun fact about that day in history (excluding the year). Finally, there will be a button at the bottom that will allow the user to see how many days it will be until we reach that holiday. The response they get will be different depending on if the holiday had passed, if today is that holiday, or if the holiday is in the future.

I have chosen two open source APIs to complete this project. The first is the [Nager.Date API](https://date.nager.at), which populates the first dropdown upon page load and will look for the applicable holiday date upon form submission. The second is the [Wikipedia API](https://api.wikimedia.org/wiki/API_reference/Feed/On_this_day), which will pull in a fun fact on that day in history after the holiday has been submitted. 

## Outline of Responsibilities
Here's a quick outline of the responsibilities for this project, henceforth known as the SHP (Stahl Holiday Picker):
- As soon as the page loads, SHP will fetch a list of holidays from the Nager API and populate our first dropdown. We'll need to enter in a date to use this API, so we're just going to give it the current year and get the most up to date list of holidays 
- The program will populate the 'Year' dropdown upon page load as well since this is much easier to control programmatically with JavaScript. 
- The user will be able to pick a holiday and year from the list. The holidays will be provided and the years will go as far back as 1925 and as far forward as 2100.
- The user will need to click the submit button to activate the program
  - If the user does not select a holiday, it will pop up with an alert and not run the rest of the program until that deliverable is met
- The SHP will pull the API to see if that holiday existed during that year (some holidays are newer).
  - If the holiday exists, SHP will pull up the date on the screen in the following format: "DDDD, MMMM D" (i.e. Monday, December 31)
    - If it falls during a Monday/Friday, text below will say "Congrats, you get an extra long weekend!"
    - If it falls during a weekend, text below will say "Sorry, no extra time-off for you. Quit slacking!"
  - If the holiday doesn't exist, we will pull the text on the screen that says "Sorry, this holiday wasn't found during that year."
- There will be a secondary button below that will ask to calculate the number of days from now until that holiday is reached. When pressed, this button will calculate the time (in seconds) of the holiday and today. This will be able to give us an accurate read of the number of days between today and the holiday. SHP will convert the difference in seconds into days.
  - If the holiday is in the past, text below the button will say "Looks like we missed it. Better luck next year!"
  - If the holiday is today, text below the button will say "That's today, happy holidays!"
  - If the holiday is tomorrow, text below the button will say "That holiday is tomorrow. Make some preparations!"
  - If the holiday is in the future, it will loop through each day until it reaches the holiday. The text below will say "That holiday is coming up in XX days", where X would be replaced with the number of days that we found earlier

## Potential Future Developments
- This is currently just coded for US holidays. Nager Date API does allow for other holidays and the code is dynamic enough to support this change. This could be user prompted as well, where they would first select their country code, the SHP could fetch all possible holidays from that country to populate the second dropdown, and then the rest of the program would work the same way.
- Building a local server using json-server is also workable within this project. I have a json file attached to this repository with information on US holiday dates in 2022. For this to be as effective as the API route, we would need to store 100 years worth of data and house data for other countries, too.

## Resources
- [Nager.Date API](https://date.nager.at)
- [Wikipedia API](https://api.wikimedia.org/wiki/API_reference/Feed/On_this_day)