//cloudinary
// page link test
console.log("js linked");

// moment js test
var timeCheck = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
console.log("Current date and time is " + timeCheck);


function getApi() {
    var zenQuote = 'https://type.fit/api/quotes';
    fetch(zenQuote)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {     
        console.log(data)
  })
};
getApi();