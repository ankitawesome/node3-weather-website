console.log('Client side js is loading')

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) =>{
        console.log(data)
    })
})

fetch('')