//  JQuery DOM Variables here:
var yogaImg = $('.yoga-img');
var yogaName = $('.yoga-name');
var yogaLink = $('#yoga-link')
var closeIcon = $('#close-icon')
var openIcon = $('#open-icon')
var sanskName = $('.sanskrit-name');
var quoteHere = $("#quote-here");
var quoteAuthor = $("#author");
var checkBox = $('.checkbox')
var yesExercise = $('#yes-exercise')
var noExercise = $('#no-exercise')
var addMoodBtn = $('#add-mood');
var moodRange = $("#test5");
var sleepNum = $('.hour-amount');
var dietChoices = $('.diet-choices');
var thoughtOfDay = $('#thought-of-day');
var breatheBox = $('#breatheBox')
var boxBtn = $('#boxBtn');
var sideNavPosts = $('.sidenav-posts')

var navTemplate = '';
var moodBoxTemplate = '';
var instance = M.Sidenav.getInstance($('.sidenav'));

var moodBoxTime = moment().format("dddd, MMMM Do YYYY, h:mm a");
var navBoxTime = moment().format("dddd, MMMM Do");

var hasVisitedRecently = dayCheck();

getYogaApi();
getQuotesApi();
getRecipe(); //api key has 150 request daily quota

$(document).ready(function() {
  // clears side nav 
  sideNavPosts.empty();
  var localMoodArr = JSON.parse(localStorage.getItem('moodArr')) || [];

  // for every object in local storage:
  for (i = 0; i <localMoodArr.length; i++ ) {
    
    // Regenerates side nave links
    createMoodBox(localMoodArr[i])
    createSideNavLinks(localMoodArr[i]);
  // }
  }

  //initializers        
  $('#modal1').modal();
  $('#modal2').modal();
  $('select').formSelect();
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();

})
    

addMoodBtn.on('click', function() {
  
  // creates object based on results of modal
  var modalSubmit = {
    navTime: navBoxTime,
    time: moodBoxTime,
    mood: moodRange.val(),
    sleep: sleepNum.val(),
    exercise: yesExercise.prop('checked'),
    diet: dietChoices.val(),
    thoughts: thoughtOfDay.val(),
  }

  // gets stred array, puts new object in, and re-stores it.
  var localMoodArr = JSON.parse(localStorage.getItem('moodArr')) || [];
  localMoodArr.push(modalSubmit);
  // console.log(localMoodArr);
  localStorage.setItem("moodArr", JSON.stringify(localMoodArr));

  // creates a post, and post link in side nav
  createMoodBox(modalSubmit);
  createSideNavLinks(modalSubmit);

  moodRange.val("");

  console.log(sleepNum.val())
  sleepNum.attr('value', '');
  console.log(sleepNum.val())
  sleepNum.val('');
  dietChoices.attr('tabindex', 0);
  thoughtOfDay.val("");

})

function createMoodBox(post) {

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
  } else {
    exerciseText = 'I will exercise tomorrow!'
  }

  var dietText;

  if (post.diet < 3 && post.diet > 0) {
    dietText = 'I ate healthy!'
  } else if (post.diet > 2) {
    dietText = 'Gonna try to eat better tomorrow!'
  } else {
    dietText = ''
  }

  var sleepText = `I slept ${post.sleep} hours.`
  if (post.sleep === null) {
    sleepText = '';
  }

    moodBoxTemplate += `
    <div class="card row horizontal mood-box id=${post.time.trim()}">
      <div class="col s12 timestamp-container">
          <div class="row status">
          <div class="col s4 status-time">${post.time}</div>
              <div class="col s4 status-emoticon"><p class="feeling-text">I'm Feeling: ${statusIcon}</p></div>
              <div class="col s4 status-placeholder">placeholder</div>
          </div>
          <div class="divider"></div>
          <div class="row zenthoughts-container">
              <div class="col s2 card-image zen-box">
                  <img class="zen-pic materialboxed circle" src="./assets/images/zen.jpg" > 
              </div>
              <div class="col s10 thoughts-box"><p class="thoughts-text">"${post.thoughts}"</p></div>  
              <div class="col s12 divider"></div>
              <div class="col s12 status">
              <div class="col s4 status-time">${sleepText}</div>
                  <div class="col s4 status-emoticon"><p class="feeling-text">${exerciseText}</p></div>
                  <div class="col s4 status-placeholder">${dietText}</div>
              </div>
          </div>
      </div>
    </div>`

$('.mood-box-content').html(moodBoxTemplate);  


}

// This function creates sidenav links based off user posts
function createSideNavLinks(post) {
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

  // this variable will go in href, to navigate to post on page.

  // adds an html string to the sidenav
  navTemplate += `<li><a href="#${post.time.trim()}">${statusIcon}${post.navTime}</a></li>`;

  sideNavPosts.html(navTemplate);
}

// Yoga pose API fetching/displaying
function getYogaApi() {
    var randIndex = Math.floor(Math.random() * 48);
    // console.log(randIndex);
    fetch("https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var yogaData = data[randIndex]
            yogaImg.attr('src', yogaData.img_url)
            yogaName.text(yogaData.english_name)
            var dropDownIcon = $('<i></i>').text('more_vert');
            dropDownIcon.attr('class', 'material-icons right');
            yogaName.append(dropDownIcon);
            sanskName.text(`The Sanksrit name for this pose is "${yogaData.sanskrit_name}".\n 36 million people in the US regularly practice yoga.`);
        });
}

//Inspirational Quotes API
function getQuotesApi() {
    var zenQuote = 'https://type.fit/api/quotes';
    fetch(zenQuote)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {  
        var randomIndex = Math.floor(Math.random() * data.length)   
        // console.log(data)
        console.log(data[randomIndex].text, data[randomIndex].author);
        quoteHere.append(data[randomIndex].text);
        if (data[randomIndex].author == null) {
            quoteAuthor.append("Author Unknown")
        } else {
            quoteAuthor.append(data[randomIndex].author)
        }
        console.log(data[randomIndex].author)
    })
};

// fetches recipe for display
// passes an array of recipes to writeRecipe()
function getRecipe () {
  // retrieve data from local storage
  var savedRecipes = JSON.parse(localStorage.getItem("recipes"));

  // if local storage exists and page visited in last 24 hrs, use that data
  if (savedRecipes && hasVisitedRecently) {

    writeRecipe(savedRecipes.results);

  // else there was nothing in local storage or > 24 hrs since last visit
  // fetch new API data and save to local storage
  } else {
    
    var recipeUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=c4a52647f4a64446b59c7602af76c88b&addRecipeInformation=true&number=100&tags=healthy&sort=healthiness";

    fetch(recipeUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      localStorage.setItem("recipes", JSON.stringify(data));
      writeRecipe(data.results);
    });
  }
}

// takes recipe info and writes it to recipe card
// recipeArray: an array of recipe info pulled from API data fetch request
function writeRecipe (recipeArray) {
  var randomIndex = Math.floor(Math.random() * recipeArray.length);
  dailyRecipe = recipeArray[randomIndex]; // select a random recipe from the array

// write recipe title to card and add an icon
  var titleSpan = $("#recipe-title");
  titleSpan.text(dailyRecipe.title);
  var dropDownIcon = $('<i></i>').text('more_vert');
  dropDownIcon.attr('class', 'material-icons right');
  titleSpan.append(dropDownIcon);

  // write image and alt text to card
  $("#recipe-image").attr("src", dailyRecipe.image);
  $("#recipe-image").attr("alt", dailyRecipe.title);

  // write source url to anchor
  $("#recipe-source").attr("href", dailyRecipe.sourceUrl);

  // write summary to card
  $("#recipe-summary").html(dailyRecipe.summary);

}

// returns true if page has been visited today
// else returns false
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

// This function checks to see if checkbox is checked, then disbales the other
function ckCheckbox(ckType){
  var checked = document.getElementById(ckType.id);

  if (checked.checked) {
    for(var i=0; i < checkBox.length; i++){

        if(!checkBox[i].checked){
            checkBox[i].disabled = true;
        }else{
            checkBox[i].disabled = false;
        }
    } 
  }
  else {
    for(var i=0; i < checkBox.length; i++){
      checkBox[i].disabled = false;
    } 
  }    
}

//BreatheBox
//function animateBox() {
    
//}
boxBtn.on("click", function() {
  breatheBox.toggleClass("movingBox")
}); 