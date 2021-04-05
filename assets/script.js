var memeArray = [];

var randomIndex = Math.floor(Math.Random);
function getApi(event) {
  // fetch request gets a list of all the repos for the node.js organization  
  var requestUrl = 'https://api.imgflip.com/get_memes';
  console.log(requestUrl);
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {     
        console.log(data);
        console.log(data.data.memes[0].url);
        console.log(data.data.memes[0]);
    })
}
getApi();


// fetches JSON data from News API
// API key: 72274a0b422f439fb0c2d607f98ef1ad
function checkNewsApi () {
  var NewsUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=72274a0b422f439fb0c2d607f98ef1ad';

  fetch(NewsUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {     
    console.log(data);
  })
}

checkNewsApi();

// page link test
console.log("js linked");

// moment js test
var timeCheck = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log("Current date and time is " + timeCheck);

