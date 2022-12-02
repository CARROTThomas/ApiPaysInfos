const monBouton = document.querySelector("#fetchAll")
const monBoutonSearch = document.querySelector("#triggerSearch")
const countryContainer = document.querySelector(".lesPays")
const searchField = document.querySelector("#search")

monBouton.addEventListener("click", ()=>{
    clearContainer()
    fetchAll()
})
monBoutonSearch.addEventListener("click", ()=>{
    clearContainer()
    fetchOne(searchField.value)
})


const inputLanguage = document.querySelector("#searchLanguage").value
const btnLanguage = document.querySelector("#triggerSearchLanguage")

btnLanguage.addEventListener("click", ()=>{
    clearContainer()
    findPaysSpeakLanguage(inputLanguage)
})

function findPaysSpeakLanguage(input){
    let url = `https://restcountries.com/v3.1/lang/${input}`
    fetch(url)
        .then(tableauSerialise=>tableauSerialise.json())
        .then(data=>{
            data.forEach(pays=>{
                fetchOne(pays.name.common)})
        })
}

function fetchAll(){

    fetch("https://restcountries.com/v3.1/all")
        .then(paysSerialises=>paysSerialises.json())
        .then( paysDeserialises => {

            paysDeserialises.forEach(pays=>{

                addCountryTemplate(pays)


            })

        })
}

function fetchOne(countryName){

    let url = `https://restcountries.com/v3.1/name/${countryName}`

    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            //on sait que la réponse vient dans un tableau contenant un objet pays, donc :

            let country = data[0]


            addCountryPreciseTemplate(country)
        })
}

function addCountryTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="20px" src="${country.flags.png}" alt="">
                    <p class="clickable">${country.name.common}</p>
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function addCountryPreciseTemplate(country){
    let template = `
                <div class="countryDiv">
                   
                    <img height="20px" width="20px" src="${country.flags.png}" alt="">
                    <div>
                         <p>${country.name.common}</p>
                        <p>Region :  ${country.region}</p>
                    </div>
                  
                    
                </div>
    `


    countryContainer.innerHTML += template

    let countries = document.querySelectorAll(".clickable").forEach(country=>{

        country.addEventListener("click", ()=>{
            clearContainer()
            fetchOne(country.innerHTML)

        })

    })
}

function clearContainer(){
    document.querySelector(".lesPays").innerHTML = ""
}