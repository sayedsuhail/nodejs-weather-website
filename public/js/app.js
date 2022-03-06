// without id querySelector target the first element eg: first form/input/paragrap/headings etc
const weatherForm = document.querySelector('form') 
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    //console.log(location)
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            //console.log('Error: ',data.error)
            messageOne.textContent = data.error
        }else{
            //console.log('Forecast: ',data.forecast)
            const weatherMsg = "It's " + data.forecast.temperature + " temperature and its " + data.forecast.weather
            //console.log('Location: ',data.location)
            messageTwo.textContent = data.location
            messageOne.textContent = weatherMsg
        }
        
    })
})
})