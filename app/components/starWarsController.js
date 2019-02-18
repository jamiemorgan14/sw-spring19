//private
import StarWarsService from "./starWarsService.js";


let _swService = new StarWarsService()



function drawPeople() {
    let people = _swService.People
    let template = ''
    people.forEach(p => {
        template += p.BasicTemplate
    })
    //handles people list
    document.getElementById('sw-items').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_swService.PreviousPeople ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.PreviousPeople}')">Previous</button>
    <button ${_swService.NextPeople ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.NextPeople}')">Next</button>
    `
}

function drawActivePerson() {
    document.getElementById('active-item').innerHTML = _swService.ActivePerson.DetailedTemplate
}

function drawPlanets() {
    let planets = _swService.Planets;
    let template = '';
    planets.forEach(p => {
        template += p.BasicTemplate
    })
    document.getElementById('sw-items').innerHTML = template
    document.getElementById('buttons').innerHTML = `
    <button ${_swService.PreviousPlanets ? '' : 'disabled'} onclick="app.controllers.swController.getPlanets('${_swService.PreviousPlanets}')">Previous</button>
    <button ${_swService.nextPlanets ? '' : 'disabled'} onclick="app.controllers.swController.getPlanets('${_swService.nextPlanets}')">Next</button>`
}

function drawActivePlanet() {
    document.getElementById('active-item').innerHTML = _swService.ActivePlanet.DetailedTemplate
}

//public
export default class StarWarsController {
    constructor() {
        //add subscribers to service
        _swService.addSubscriber('people', drawPeople)
        _swService.addSubscriber('activePerson', drawActivePerson)
        _swService.addSubscriber('planets', drawPlanets)
        _swService.addSubscriber('activePlanet', drawActivePlanet)


    }

    getPeople(url) {
        _swService.getAllApiPeople(url)
        document.getElementById('active-item').innerHTML = ''
    }
    getPerson(url) {
        _swService.getOneApiPerson(url)
    }
    getPlanets(url) {
        _swService.getAllApiPlanet(url)
        document.getElementById('active-item').innerHTML = ''

    }
    getPlanet(url) {
        _swService.getOneApiPlanet(url)
    }

}