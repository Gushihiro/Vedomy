
// sleep tips

var sleepTipElement = document.getElementById("sleep-tip")

var sleepTipButton = document.getElementById("generate")


var sleepTips = ["Sleep in a Pitch Black Room", "Keep Your Bed Time Consistent", "Wear Blue Light Blocking Glasses Before Bed", "Avoid Late-Night Meals",  "Be Hydrated", "Have Pre-Sleep Routine", "Have a “Can’t Sleep” Backup Plan"];


var setTip = () => {
    var randomIndex = Math.floor(Math.random() * sleepTips.length )
    console.log("test this", randomIndex)
    sleepTipElement.textContent = sleepTips[randomIndex]
}





    sleepTipButton.addEventListener("click", setTip);

    setTip();
