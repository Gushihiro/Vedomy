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
var moodBoxTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var breatheBox = $('#breatheBox')
var boxBtn = $('#boxBtn')



// Creating a current hour and midnight hour as a conditional for daily refresh
var currentHour = moment().hour();
console.log(currentHour);
var midnightHour = moment().hour(23).format('HH');
console.log(midnightHour);
var hasRunOnce = false;
var quoteHere = $("#quote-here");
var quoteAuthor = $("#author");

displayRandExerc();
getQuotesApi();
getRecipe(); //api key has 150 request daily quota

$(document).ready(function() {
  // future moodbox creation on page-load
  // var localMoodArr = JSON.parse(localStorage.getItem('urlArr')) || [];
  // for (i = 0; i <localMoodArr.length; i++ ) {
  //   createMoodBox(localMoodArr[i])
  // }

  //initializers        
  $('#modal1').modal();
  $('#modal2').modal();
  $('select').formSelect();
  
  // ATTEMPTING TO CREATE A "ONCE-A-DAY" REFRESH OF TIPS. FEEL FREE TO MESS WITH IT
    // if (!hasRunOnce) {
    //     displayRandExerc();
    //     hasRunOnce = true;
    // } else if (midnightHour > currentHour) {
      //     displayRandExerc();
      //     hasRunOnce = false;
      //     return;
      // }
})
    

addMoodBtn.on('click', function() {
  var modalSubmit = {
    time: moodBoxTime,
    mood: moodRange.val(),
    sleep: sleepNum.val(),
    exercise: yesExercise.prop('checked'),
    diet: dietChoices.val(),
    thoughts: thoughtOfDay.val(),
  }

  var localMoodArr = JSON.parse(localStorage.getItem('moodArr')) || [];
  localMoodArr.push(modalSubmit);
  console.log(localMoodArr);
  localStorage.setItem("moodArr", JSON.stringify(localMoodArr));

  console.log(modalSubmit)

})



function displayRandExerc() {
    var randIndex = Math.floor(Math.random() * 48);
    console.log(randIndex);
    fetch("https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            var yogaData = data[randIndex]
            // console.log(yogaData);
            yogaImg.attr('src', yogaData.img_url)
            yogaName.text(yogaData.english_name)
            var dropDownIcon = $('<i></i>').text('more_vert');
            dropDownIcon.attr('class', 'material-icons right');
            yogaName.append(dropDownIcon);
            sanskName.text(`The Sanksrit name for this pose is "${yogaData.sanskrit_name}".`);
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
        console.log(data)
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
function getRecipe () {
  var testRecipeUrl = "https://api.spoonacular.com/recipes/random?number=1&apiKey=c4a52647f4a64446b59c7602af76c88b";

  fetch(testRecipeUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log("getting recipe");
    console.log(data);
  });
}

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
function animateBox() {
    breatheBox.style.height = "100px";
    breatheBox.style.width = "100px";
    
}
boxBtn.on("click", animateBox)   