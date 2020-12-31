"use strict";

//TODO - 1. Add events button, 2. Store events, 3. Display events in Correct table cell
//TODO - 4. Size table better with CSS, fix height to take up the whole window and shrink
//TODO - with resizing. 5. Display events when date is selected on the left.

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const gettheTable = document.querySelector(".calendar--table");
let cellId = 0;
for (let i = 0; i < 6; i++) {
  const addingrow = document.createElement("tr");
  addingrow.setAttribute("class", "row--calendar");
  console.log("Row Added");
  for (let x = 0; x < 7; x++) {
    const addingcell = document.createElement("td");
    addingcell.setAttribute("class", "cell--calendar");
    addingcell.setAttribute("id", `cell--${cellId}`);
    cellId++;
    addingrow.appendChild(addingcell);
  }
  gettheTable.appendChild(addingrow);
}

//function that is used to changed the text color of the begining and end of month
function changingTextColor(i, content, color, themonth, theyear) {
  let contentincalendar = document.getElementById(`cell--${i}`);
  contentincalendar.textContent = content;
  contentincalendar.style.color = color;
  const input = document.createElement("input");
  //https://stackoverflow.com/questions/1000795/create-a-hidden-field-in-javascript
  //creates hidden input for date field. Trying to use this later for date selected.
  input.setAttribute("type", "hidden");
  input.setAttribute("id", `datevalue--${i}`);
  input.setAttribute("value", `${themonth}/${content}/${theyear}`);
  contentincalendar.appendChild(input);
}

//Changes the date upon new selections, not pretty but I made the code on my own.
function dateChange() {
  let monthOption = document.getElementById("month").value;
  let yearOption = document.getElementById("year").value;
  const d = new Date(`${monthOption}/01/${yearOption}`);
  let endofLastMonthdate = new Date(d);
  endofLastMonthdate.setDate(0);
  let endofLastMonthday = endofLastMonthdate.getDate();
  let startingDay = d.getDay();
  let endingDate = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  let endingDay = endingDate.getDate();
  endingDate.setDate(endingDay + 1);
  let trailingmonth = endingDate.getDate();
  //Adds days for current month
  let dayNum = 2;
  //sets first date based on day of the week.
  changingTextColor(startingDay, 1, "black", monthOption, yearOption);
  for (let i = startingDay + 1; i < endingDay + startingDay; i++) {
    changingTextColor(i, dayNum, "black", monthOption, yearOption);
    dayNum++;
  }

  //Add even listeners to each table cell
  //Event is on click and displays date in the left column
  for (let i = 0; i < 42; i++) {
    document
      .getElementById(`cell--${i}`)
      .addEventListener("click", function () {
        const displayDate = document.getElementById(`datevalue--${i}`).value;
        document.querySelector(".day--selected--title").innerHTML = displayDate;
      });
  }
  //Beginning of calendar. Add the dates of the last part of the month.
  for (let i = startingDay - 1; i >= 0; i--) {
    changingTextColor(
      i,
      endofLastMonthday,
      "#A3A3A3",
      endofLastMonthdate.getMonth() + 1,
      endofLastMonthdate.getFullYear()
    );
    endofLastMonthday--;
  }
  //End of calendar preceding month.
  let count = 1;
  for (let i = startingDay + endingDay; i < 42; i++) {
    changingTextColor(
      i,
      trailingmonth,
      "#A3A3A3",
      endingDate.getMonth() + 1,
      endingDate.getFullYear()
    );
    trailingmonth++;
  }
}
const currentDate = new Date();
console.log(currentDate);
const selectmonth = document.getElementById("month");
const selectyear = document.getElementById("year");

//Month list (https://stackoverflow.com/questions/8674618/adding-options-to-select-with-javascript)

// This creates the list of months, I can't figure out how to make this a function.
//TODO: Make this into a function.
for (let i = 0; i < 12; i++) {
  let opt = document.createElement("option");
  opt.value = i + 1;
  opt.innerHTML = months[i];
  selectmonth.appendChild(opt);
}
//Creating Year list
for (let i = 2020; i < 2031; i++) {
  let opt = document.createElement("option");
  opt.value = i;
  opt.innerHTML = i;
  selectyear.appendChild(opt);
}

//Selects month and year on Page load using JQuery
//https://stackoverflow.com/questions/41805041/set-select-value-on-page-load-reload
//TODO - I don't understand how this code works. Need to research Jquery a little more.
$(document).ready(function () {
  $("div.sel_month select")
    .val(currentDate.getMonth() + 1)
    .change();
});

$(document).ready(function () {
  $("div.sel_year select").val(currentDate.getFullYear()).change();
});
