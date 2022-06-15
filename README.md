# Andrew Stahl's Phase 1 Final Project

This is the repository of my Phase 1 final project for Flatiron School.

## Goal
The goal of this project is leverage my knowledge in HTML, CSS, JavaScript, and APIs to create a single-page application.

## Project Overview
This page prompts the user to pick a US holiday and year from dropdowns. Once they submit, they will see which day that 

I have chosen two open source APIs to complete this 

## Outline of Responsibilities
For this project, we are going to using the [Nager.Date API](https://date.nager.at) to pull in a list of US public holidays. The single-page application will allow the user to pick.

- Ask the user to pick a year and a holiday from the list. The holidays will be provided and the years will go as far back as 1921 and as far forward as 2100.
- We will poll the API to see if that holiday existed during that year (some holidays are newer).
  - If the holiday exists, we will pull up the date on the screen in the following format: "DDDD, MMMM D"
    - If it falls during a Monday/Friday, text below will say "Enjoy the long weekend!" weekend
    - If it falls during a weekend, text below will say "Sorry, no extra days off here"
  - If the holiday doesn't exist, we will pull the text on the screen that says "Sorry, the holiday doesn't exist for that year"
- There will be a secondary button below that will ask to calculate the number of days from now until that holiday is reached
  - If the holiday is in the past, text below will say "This holiday has passed!"
  - If the holiday is today, text will say "Today is the holiday. Time to celebrate!"
  - If the holiday is in the future, it will loop through each day until it reaches the holiday. The text below will say "The holiday is in X day(s)" (if it's 1 day, days should be singular)

## Introduction
Here is a placeholder for the introduction of the README.

## Potential Future Developments
- Adjustment for different countries
- Building a local server, which would need to store the holiday dates for 100 years worth of data

## Resources
- [Nager.Date API](https://date.nager.at)