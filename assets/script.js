//  JQuery DOM Variables here:
var yogaImg = $('.yoga-img');
var yogaName = $('.yoga-name');
var yogaLink = $('#yoga-link');
var closeIcon = $('#close-icon');
var openIcon = $('#open-icon');
var sanskName = $('.sanskrit-name');
var quoteHere = $("#quote-here");
var quoteAuthor = $("#author");
var checkBox = $('.checkbox');
var yesExercise = $('#yes-exercise');
var noExercise = $('#no-exercise');
var addMoodBtn = $('#add-mood');
var moodRange = $("#test5");
var sleepNum = $('.hour-amount');
var dietChoices = $('.diet-choices');
var thoughtOfDay = $('#thought-of-day');
var breatheBox = $('#breatheBox');
var boxBtn = $('#boxBtn');
var sideNavPosts = $('.sidenav-posts');
var sleepTipButton = $("#generate");
var sleepTipElement = $("#sleep-tip");

var sleepTips = ["Sleep in a Pitch Black Room", 
                 "Keep Your Bedtime Consistent", 
                 "Wear Blue Light Blocking Glasses Before Bed", 
                 "Avoid Late-Night Meals",  
                 "Be Hydrated", 
                 "Have Pre-Sleep Routine", 
                 "Have a “Can’t Sleep” Backup Plan",
                 "Increase bright light exposure during the day",
                 "Don’t consume caffeine late in the day",
                 "Set your bedroom temperature",
                 "Reduce irregular or long daytime naps",
                 "Take a relaxing bath or shower",
                 "Exercise regularly — but not before bed",
                ];

//BreatheBox
var boxTextArray = [
  "Breathe In...",
  "Hold...",
  "Breathe Out...",
  "Hold..."
]

var boxTimer;
var navTemplate = '';
var moodBoxTemplate = '';

// check to see if page has been visited today
var hasVisitedRecently = dayCheck();

var moodBoxTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
var navBoxTime = moment().format("dddd, MMMM Do");

localMoodArr = JSON.parse(localStorage.getItem('moodArr')) || [];
// retrieve saved entries from local storage and place them in an array

var instance = M.Sidenav.getInstance($('.sidenav'));

$(document).ready(function () {
  $('#stopBtn').hide();

  getQuote();
  getYoga();
  getSleep();
  getRecipe();
  writeMoodEntries();

  //initializers        
  $('#modal1').modal();
  $('#modal2').modal();
  $('select').formSelect();
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();

})

// deletes moodbox on page, and in local storage if remove button clicked
$(document).on('click', '.removeButton', function() {
  $(this).closest('section').remove();
  console.log($(this).closest('section').attr('id'))
    for (i = 0; i < localMoodArr.length; i++) {
      console.log(localMoodArr[i].time)
      if ($(this).closest('section').attr('id') === localMoodArr[i].time) {
        localMoodArr.splice(i, 1);
        localStorage.setItem('moodArr', JSON.stringify(localMoodArr))
      }
    writeMoodEntries();
    }
})

// retrives quote object and passes it to writeQuote
function getQuote () {

  var dailyQuote = JSON.parse(localStorage.getItem("dailyQuote"));

  // if local storage exists and page visited in last 24 hrs, use that data
  if (dailyQuote && hasVisitedRecently) {
  
    writeQuote(dailyQuote);

    // else there was nothing in local storage or > 24 hrs since last visit
    // fetch new API data and save to local storage
  } else {
  
    fetch('https://type.fit/api/quotes')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
    
        var randomIndex = Math.floor(Math.random() * data.length)
        localStorage.setItem("dailyQuote", JSON.stringify(data[randomIndex]));
        writeQuote(data[randomIndex]);
      })
  }
};

// writes quote data
function writeQuote (quoteData) {

  quoteHere.append(quoteData.text);
  
  if (quoteData.author == null) {
    quoteAuthor.append("Author Unknown");
  } else {
    quoteAuthor.append(quoteData.author);
  }
}

// retrieves yoga object and passes it to writeYoga
function getYoga () {

  var dailyPose = JSON.parse(localStorage.getItem("dailyPose"));

  // if local storage exists and page visited in last 24 hrs, use that data
  if (dailyPose && hasVisitedRecently) {
  
    writeYoga(dailyPose);

    // else there was nothing in local storage or > 24 hrs since last visit
    // fetch new API data and save to local storage
  } else {
  
    fetch("https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // select a random yoga object, and write content to card
      var randIndex = Math.floor(Math.random() * data.length);
      localStorage.setItem("dailyPose", JSON.stringify(data[randIndex]));
      writeYoga(data[randIndex]);

    });
  }
}

// writes yoga content
function writeYoga (yogaData) {

  yogaImg.attr('src', yogaData.img_url);
  yogaName.text(yogaData.english_name);
  var dropDownIcon = $('<i></i>').text('more_vert');
  dropDownIcon.attr('class', 'material-icons right');
  yogaName.append(dropDownIcon);
  sanskName.text(`The Sanksrit name for this pose is "${yogaData.sanskrit_name}".\n 36 million people in the US regularly practice yoga.`);
}

// retrieves and displays a sleep tip to card
function getSleep () {

  var dailySleep = JSON.parse(localStorage.getItem("dailySleep"));

  // if local storage exists and page visited in last 24 hrs, use that data
  if (dailySleep && hasVisitedRecently) {
  
    sleepTipElement.text(dailySleep);

    // else there was nothing in local storage or > 24 hrs since last visit
    // get new sleep tip and save it to storage
  } else {
  
    var randomIndex = Math.floor(Math.random() * sleepTips.length);
    localStorage.setItem("dailySleep", JSON.stringify(sleepTips[randomIndex]));
    sleepTipElement.text(sleepTips[randomIndex]);
  }
}

// gets and displays a new sleep tip when clicked
sleepTipButton.on("click", function () {
  var randomIndex = Math.floor(Math.random() * sleepTips.length );
  sleepTipElement.text(sleepTips[randomIndex]);
});

// retrives recipe object and passes it to writeRecipe
function getRecipe () {

  // retrieve data from local storage
  var dailyRecipe = JSON.parse(localStorage.getItem("dailyRecipe"));

  // if local storage exists and page visited in last 24 hrs, use that data
  if (dailyRecipe && hasVisitedRecently) {

    writeRecipe(dailyRecipe);

    // else there was nothing in local storage or > 24 hrs since last visit
    // fetch new API data and save to local storage
  } else {

    var recipeUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=c4a52647f4a64446b59c7602af76c88b&addRecipeInformation=true&number=100&tags=healthy&sort=healthiness";

    fetch(recipeUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        var randomIndex = Math.floor(Math.random() * data.results.length);
        localStorage.setItem("dailyRecipe", JSON.stringify(data.results[randomIndex]));
        writeRecipe(data.results[randomIndex]);

      });
  }
}

// writes recipe data
function writeRecipe (recipeData) {

  // write recipe title to card and add an icon
  var titleSpan = $("#recipe-title");
  titleSpan.text(recipeData.title);
  var dropDownIcon = $('<i></i>').text('more_vert');
  dropDownIcon.attr('class', 'material-icons right');
  titleSpan.append(dropDownIcon);

  // write image and alt text to card
  $("#recipe-image").attr("src", recipeData.image).attr("alt", recipeData.title);

  // write source url to anchor
  $("#recipe-source").attr("href", recipeData.sourceUrl);

  // grab summary
  var recipeSum = recipeData.summary;

  // split summary into str array
  // note that this also splits dollar amounts
  var sumArray = recipeSum.split(".");

  // create new summary to write to card
  var revisedSummmary = "";

  // loop over summary array
  for (let i = 0; i < sumArray.length - 1; i++) {

    // skip sentences that contain unwanted promotional data
    if (!sumArray[i].includes("<a") 
    && !sumArray[i].includes("a>")
    && !sumArray[i].includes("/recipes/") 
    && !sumArray[i].includes("tried")
    && !sumArray[i].includes("made")
    && !sumArray[i].includes("found")
    && !sumArray[i].includes("impressed")
    && !sumArray[i].includes("liked")
    && !sumArray[i].includes("brought")
    && !sumArray[i].includes("score")) {

      // if the str includes a dollar sign, concat strings so $ per serving displays correctly
      if (sumArray[i].includes("$")) {
        revisedSummmary += sumArray[i] + "." + sumArray[i+1] + ". ";
        i += 2;

      // else concat as normal  
      } else {
        revisedSummmary += sumArray[i] + ". ";
      }
    }
  }

  // write summary to card
  $("#recipe-summary").html(revisedSummmary);

}

// updates content of mood and side nav containers
function writeMoodEntries () {

  $("#mood-box-entries").empty(); // clear mood box
  moodBoxTemplate = "";           // reset template

  sideNavPosts.empty();
  navTemplate = "";

  // update templates for every item in local storage
  for (i = 0; i < localMoodArr.length; i++) {
    createMoodBox(localMoodArr[i]);       // create a mood box
    createSideNavLinks(localMoodArr[i]);  // create a side nav link
  }

  // write updated templates
  $("#mood-box-entries").html(moodBoxTemplate);
  sideNavPosts.html(navTemplate);
}

addMoodBtn.on('click', function () {

  // creates object based on results of modal
  var modalSubmit = {
    navTime: navBoxTime,
    time: moodBoxTime,
    mood: moodRange.val(),
    sleep: sleepNum.val(),
    exercise: yesExercise.prop('checked'),
    notExercise: noExercise.prop('checked'),
    diet: dietChoices.val(),
    thoughts: thoughtOfDay.val(),
  }

  // update mood entry array and save it to local storage
  localMoodArr.unshift(modalSubmit);
  localStorage.setItem("moodArr", JSON.stringify(localMoodArr));

  writeMoodEntries (); // update mood entry logs

  moodRange.val("");
  sleepNum.attr('value', '');
  sleepNum.val('');
  dietChoices.attr('tabindex', 0);
  thoughtOfDay.val("");

})

// creates an html template for a mood entry
function createMoodBox (post) {
  console.log(post)
  if (post.mood <= 1) {
    statusIcon = '<i class="material-icons red-text">sentiment_very_dissatisfied</i>'
  } else if (post.mood > 1 & post.mood < 4) {
    statusIcon = '<i class="material-icons orange-text">sentiment_dissatisfied</i>'
  } else if (post.mood > 3 & post.mood < 6) {
    statusIcon = '<i class="material-icons yellow-text accent-3">sentiment_neutral</i>'
  } else if (post.mood > 5 & post.mood < 8) {
    statusIcon = '<i class="material-icons lime-text">sentiment_satisfied</i>'
  } else if (post.mood > 7 & post.mood < 10) {
    statusIcon = '<i class="material-icons light-green-text">sentiment_very_satisfied</i>'
  } else {
    statusIcon = '<i class="material-icons green-text">sentiment_very_satisfied</i>'
  }

  var exerciseText;

  if (post.exercise) {
    exerciseText = 'I exercised!'
  } else if (post.notExercise) {
    exerciseText = `I'll exercise tomorrow!`
  } else {
    exerciseText = '';
  }

  var dietText;

  if (post.diet < 3 && post.diet > 0) {
    dietText = 'I ate healthy!'
  } else if (post.diet > 2) {
    dietText = 'Gotta eat better!'
  } else {
    dietText = ''
  }

  var sleepText = `I slept ${post.sleep} hours.`

  if (post.sleep === null) {
    sleepText = '';
  }

  var quoteIt;

  if (post.thoughts === '') {
    quoteIt = `I didn't feel like journaling today.`
  } else {
    quoteIt = `${post.thoughts}`
  }



  // concat most recent entry to template
  moodBoxTemplate += `
  <section class="card row horizontal mood-box" id="${post.time}">
    <div class="col s12 timestamp-container">
        <div class="row status">
        <div class="col s4 status-time">${post.time}</div>
            <div class="col s4 status-emoticon"><p class="feeling-text">I'm Feeling: ${statusIcon}</p></div>
            <div class="col s4 status-placeholder"> <a class="waves-effect waves-light removeButton"><i class="material-icons close">close</i></a></div>
        </div>
        <div class="divider"></div>
        <div class="row zenthoughts-container">
            <div class="col s12 m2 l2 card-image zen-box">
                <img class="zen-pic materialboxed" id='first-zen' src="./assets/images/lotus.png" > 
            </div>
            <div class="col s12 m8 l8 thoughts-box"><p class="thoughts-text">${quoteIt}</p></div>
            <div class="col s12 m2 l2 card-image zen-box">
            <img class="zen-pic materialboxed" id='second-zen' src="./assets/images/lotus.png" > 
            </div>  
        </div>
            <div class="col s12 divider"></div>
            <div class="row status">
              <div class="col s4 feeling-text sleep-text">${sleepText}</div>
              <div class="col s4 status-emoticon"><p class="feeling-text exercise-text">${exerciseText}</p></div>
              <div class="col s4 feeling-text diet-text">${dietText}</div>
            </div>
    </div>
  </section>`;
}

// creates a side nav bar and concatenates it to the existing template
function createSideNavLinks (post) {
  var statusIcon;

  // depending on mood of post, will display different emoticon on link
  if (post.mood <= 1) {
    statusIcon = '<i class="material-icons red-text">sentiment_very_dissatisfied</i>'
  } else if (post.mood > 1 & post.mood < 4) {
    statusIcon = '<i class="material-icons orange-text">sentiment_dissatisfied</i>'
  } else if (post.mood > 3 & post.mood < 6) {
    statusIcon = '<i class="material-icons yellow-text accent-3">sentiment_neutral</i>'
  } else if (post.mood > 5 & post.mood < 8) {
    statusIcon = '<i class="material-icons lime-text">sentiment_satisfied</i>'
  } else if (post.mood > 7 & post.mood < 10) {
    statusIcon = '<i class="material-icons light-green-text">sentiment_very_satisfied</i>'
  } else {
    statusIcon = '<i class="material-icons green-text">sentiment_very_satisfied</i>'
  }


  // concat most recent entry to template
  navTemplate += `<li><a class="sidenav-close" href="#${post.time}">"${statusIcon}${post.navTime}"</a></li>`;
}

// returns true if page has been visited today
function dayCheck () {
  var currentDay = parseInt(moment().format("DDD"));
  var referenceDay = parseInt(localStorage.getItem("refDay"));

  // if a reference day exists and page visited today, return true
  if (referenceDay && currentDay == referenceDay) {
    return true;

    // otherwise save today to be reference and return false
  } else {
    localStorage.setItem('refDay', currentDay);
    return false;
  }
}

// checks to see if checkbox is checked, then disables the other
function ckCheckbox (ckType) {
  var checked = document.getElementById(ckType.id);

  if (checked.checked) {
    for (var i = 0; i < checkBox.length; i++) {

      if (!checkBox[i].checked) {
        checkBox[i].disabled = true;
      } else {
        checkBox[i].disabled = false;
      }
    }
  }
  else {
    for (var i = 0; i < checkBox.length; i++) {
      checkBox[i].disabled = false;
    }
  }
}

boxBtn.on("click", function () {
  $('#stopBtn').show();
  boxBtn.hide();
  var boxTimer;
  var i = 0;
  $(".boxText").html(boxTextArray[i]);
  breatheBox.toggleClass("movingBox")
  boxTimer = setInterval(function () {
    i++;
    console.log({i, text: boxTextArray[i]})
    if (i >= boxTextArray.length) {
      i = 0;
    }
    $(".boxText").html(boxTextArray[i]);
  }, 4 * 1000);
});

$('#stopBtn').on('click', function () {
  boxBtn.show();
  $('#stopBtn').hide();
  i = 0;
  clearInterval(boxTimer);
  breatheBox.toggleClass("movingBox")
  $(".boxText").empty();
  return;
})
