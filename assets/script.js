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