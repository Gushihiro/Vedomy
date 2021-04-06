var memeArray = [
    
]
var randomIndex = Math.floor(Math.Random)
function getApi(event) {
      // fetch request gets a list of all the repos for the node.js organization  
    var requestUrl = 'https://api.imgflip.com/get_memes';
    console.log(requestUrl)
      fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {     
          console.log(data)
          console.log(data.data.memes[0].url)
          console.log(data.data.memes[0].)
    })
}
getApi();

// page link test
console.log("js linked");

// moment js test
var timeCheck = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log("Current date and time is " + timeCheck);

// array for sleep tip
var sleepTip = ["Sleep in a Pitch Black Room",]

