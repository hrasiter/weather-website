console.log('Client side javascript file is loaded.')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1= document.querySelector('#message-1')
const message2= document.querySelector('#message-2')

message1.textContent = '';
message2.textContent = '';

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    message1.textContent = 'Loading...'
    message2.textContent = ''
    const location = search.value
    console.log(location)
    const url = 'http://192.168.2.97:3000/weather?address='+location

    fetch(url).then((response) => {

    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error
            message2.textContent = ''
        }
        else{
            message1.textContent = data.place
            message2.textContent = data.forecast
        }

    })
})
})