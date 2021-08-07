const URL = `http://localhost:8081/article`
const polarityElement = document.getElementById('polarity')
const agreementElement = document.getElementById('agreement')
const subjectivityElement = document.getElementById('subjectivity')
const confidenceElement = document.getElementById('confidence')
const ironyElement = document.getElementById('irony')

function resetResultUI(){
    polarityElement.innerHTML = '';
    agreementElement.innerHTML = '';
    subjectivityElement.innerHTML = '';
    confidenceElement.innerHTML = '';
    ironyElement.innerHTML = '';

}



function updateUI(result){
    polarityElement.innerHTML = `Polarity: ${displayPolarityScore(result.score_tag)}`
    subjectivityElement.innerHTML = `Subjectivity: ${result.subjectivity}`
    agreementElement.innerHTML = `Agreement: ${result.agreement}`
    confidenceElement.innerHTML = `Confidence: ${result.confidence}`
    ironyElement.innerHTML = `Irony: ${result.irony}`
}

function handleSubmit(event) {
    event.preventDefault()
    resetResultUI()

    // check what text was put into the form field
    let articleURL = document.getElementById('article-url').value
    if(Client.validateUrl(articleURL)){
        postData(URL, {url: articleURL})
        .then(function(res) {
            console.log('results:::', res)
            updateUI(res)
        })
    }else {
        alert('invalid URL, please try with a valid URL.');
    }
   
}

const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

// API response output (https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response)
const displayPolarityScore = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit }
