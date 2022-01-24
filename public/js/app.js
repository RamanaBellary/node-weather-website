//const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Guntakal.json?access_token=pk.eyJ1IjoicmFtYW5heWFkYXZzIiwiYSI6ImNreWgyeW0wOTF5eXcyd284eDVrZTc2YnIifQ.kcmDDtPAtI4ypQg_8xRkcg&limit=1'
const forecastUrl = 'http://api.weatherstack.com/current?access_key=14b7a8fb209d17401c05f90bbf7fa8aa&query='
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()//To prevent reloading of form

    const location = search.value
    if(!location){
        messageOne.textContent='Invalid location'
        return
    }
    
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoicmFtYW5heWFkYXZzIiwiYSI6ImNreWgyeW0wOTF5eXcyd284eDVrZTc2YnIifQ.kcmDDtPAtI4ypQg_8xRkcg&limit=1').then((res)=>{
        messageOne.textContent='Loading...'    
        messageTwo.textContent=''
        
        res.json().then((data)=>{        
            if(data === undefined || data.features === undefined || data.features.length === 0){
                messageOne.textContent ='Could not find the location'
            }else{
                fetch(forecastUrl+data.features[0].center[1]+','+data.features[0].center[0]).then((forecastResp)=>{
                    forecastResp.json().then((f)=>{
                        if(f === undefined || f.location === undefined || f.location.name === undefined ||
                            f.current === undefined || f.current.temperature === undefined){
                                messageOne.textContent='Could not find forecast for the location'
                            }else{
                                messageOne.textContent = 'Location: ' + f.location.name
                                messageTwo.textContent = 'Temperature: ' + f.current.temperature
                            }
                    })                
                })
            }        
        })
    })
})