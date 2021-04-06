//  JQuery DOM Variables here:
var yogaImg = $('.yoga-img');
var yogaName = $('.yoga-name');
var sanskName = $('.sanskrit-name');

// fetches JSON data from News API
// API key: 72274a0b422f439fb0c2d607f98ef1ad
//function checkNewsApi () {
// var NewsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=72274a0b422f439fb0c2d607f98ef1ad';
// fetch(NewsUrl)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {     
//   console.log(data);
// })
//}

//checkNewsApi();

// page link test
console.log("js linked");

// moment js test
var timeCheck = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log("Current date and time is " + timeCheck);

// Creating a current hour and midnight hour as a conditional for daily refresh
var currentHour = moment().hour();
console.log(currentHour);
var midnightHour = moment().hour(23).format('HH');
console.log(midnightHour);
var hasRunOnce = false;


displayRandExerc();

// ATTEMPTING TO CREATE A "ONCE-A-DAY" REFRESH OF TIPS. FEEL FREE TO MESS WITH IT
// $(document).ready('load', function() {
//     if (!hasRunOnce) {
//         displayRandExerc();
//         hasRunOnce = true;
//     } else if (midnightHour > currentHour) {
//         displayRandExerc();
//         hasRunOnce = false;
//         return;
//     }
    
// })

function displayRandExerc() {
    var randIndex = Math.floor(Math.random() * 48);
    console.log(randIndex);
    fetch("https://raw.githubusercontent.com/rebeccaestes/yoga_api/master/yoga_api.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var yogaData = data[randIndex]
            console.log(yogaData);
            yogaImg.attr('src', yogaData.img_url)
            yogaName.text(yogaData.english_name)
            sanskName.text(`The Sanksrit name for this pose is "${yogaData.sanskrit_name}".`);
        });
}

//Inspirational Quotes API
var quoteHere = $("#quote-here");
var quoteAuthor = $("#author");
function getApi() {
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
        quoteAuthor.append(data[randomIndex].author)
  })
};
getApi();