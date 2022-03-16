// Declaring DOM Variables
const btn = document.querySelector(".btn");
const adviceText = document.querySelector(".text");
const adviceId = document.querySelector(".title span");
const diceImg = document.querySelector(".btn img");

// Global variable (Object) to keep track of API Response
let newAdviceText = null;

// Function to indicate that response is loading
// by disabling button and including animation

function loadingAdviceText() {
  if (!newAdviceText) {
    diceImg.classList.add("loading");
    btn.disabled = true;
  } else {
    diceImg.classList.remove("loading");
    btn.disabled = false;
  }
}

// Function to set data values in their respective DOM elements
function setAdviceDetails(advice, id) {
  adviceText.textContent = '"' + advice + '"';
  adviceId.textContent = id;
}

// Function to get response from Advice API
async function getNewAdvice() {
  loadingAdviceText();
  const response = await fetch("https://api.adviceslip.com/advice", {
    cache: "no-cache",
  })
    .then(resp => resp.json())
    .catch(e => console.log(e));
  newAdviceText = response;
  loadingAdviceText();
  const { id, advice } = newAdviceText.slip;
  setAdviceDetails(advice, id);
  newAdviceText = null;
}

// Click event listener to trigger API call and obtaining response
btn.addEventListener("click", e => {
  if (!e.target.disabled) {
    getNewAdvice();
  }
});
