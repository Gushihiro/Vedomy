//  JQuery DOM Variables here:
var yogaImg = $('.yoga-img');
var yogaName = $('.yoga-name');
var sanskName = $('.sanskrit-name');

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
