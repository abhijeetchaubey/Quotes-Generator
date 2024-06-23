const apiUrl="https://jacintodesign.github.io/quotes-api/data/quotes.json"

const GenerateQuote=document.querySelector('#new-quote')
const quoteAuthor=document.querySelector('#author')
const quoteText=document.querySelector('#quote')
const TwitterBtn=document.querySelector('.twitter-button')
const loaderBtn=document.querySelector('.loader')
const quoteContainer=document.querySelector('.quote-container')

let apiQuotes=[];

// Show New Quote
function newQuote(){
    displayLoader();
    // Pick a random Quotes
    const quote =apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote);
    quoteText.innerHTML=`${quote.text}`

    // Check if author is filled or blank
    if (!quote.author) {
        quoteAuthor.textContent=`~UnKnown`
    }else{
        quoteAuthor.textContent=`~${quote.author}`
    }

    // check Quote length to determine styling
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    complete()
}
// Get quotes from API
async function generateQuote() {
    displayLoader()
    try {
        const response= await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        alert("Failed to generate quotes")
        console.log("Failed to generate quotes");
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterURL,'_blank')
}


//display Loader
function displayLoader(){
    loaderBtn.hidden=false;
    quoteContainer.hidden=true;
}

// Hide Loader
function complete(){
    quoteContainer.hidden=false;
    loaderBtn.hidden=true;
}
// on load
generateQuote()

// Event Listner
GenerateQuote.addEventListener('click',(e)=>{
    // setTimeout(displayLoader(),5000)
    generateQuote()
})
TwitterBtn.addEventListener('click',(e)=>{
    tweetQuote()
})