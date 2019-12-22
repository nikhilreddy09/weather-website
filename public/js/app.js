

// fetch('http://puzzle.mead.io/puzzle').then( (response) => {

// response.json().then((data) => {

//     console.log(data)

// })

// })
const address = 'boston'



const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const message1 = document.querySelector('#para1')
const message2 = document.querySelector('#para2')
message1.textContent = ' '
message2.textContent = ' '


weatherForm.addEventListener('submit', (e) => {

e.preventDefault()

const location = search.value

message1.textContent = 'Loading........'

fetch('http://localhost:3000/weather?address='+location+'').then((response) => {


response.json().then((data) => {

if(data.error) {
        message1.textContent = 'Invalid location. weather not found'
}
else {

    message1.textContent = data.location
    message2.textContent = "current temperature : " + data.forecast.currentTemperature +" summary : " + data.forecast.dailySummary +
    "\n  there is " + data.forecast.chanceofRain +"% chance of rain today"
    console.log(data.location)
    console.log(data.forecast)
}

})
})


})