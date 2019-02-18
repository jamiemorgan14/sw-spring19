//private
import Person from "../models/person.js";
import Planet from "../models/planet.js";

//Creates an object to send requests from
let _peopleApi = axios.create({
    baseURL: 'https://swapi.co/api/people'
});

let _planetApi = axios.create({
    baseURL: 'https://swapi.co/api/planets'
})


let _state = {
    people: [],
    nextPrevPeople: {
        nextUrl: '',
        previousUrl: ''
    },
    nextPrevPlanet: {
        nextURL: '',
        previousUrl: ''
    },
    activePerson: {},
    planets: [],
    activePlanet: {}
}

let _subscribers = {
    people: [],
    nextPrevPeople: [],
    activePerson: [],
    planets: [],
    nextPrevPlanet: [],
    activePlanet: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
    _state[prop] = value
    _subscribers[prop].forEach(fn => fn());
}


//public
export default class StarWarsService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    //get local data
    get People() {
        //Breaks Refrences of each object in state
        return _state.people.map(p => new Person(p))
    }

    get NextPeople() {
        return _state.nextPrevPeople.nextUrl
    }

    get PreviousPeople() {
        return _state.nextPrevPeople.previousUrl
    }

    get ActivePerson() {
        //Creates a new object that is a copy of the active person (breaking refrence)
        return new Person(_state.activePerson)
    }

    get Planets() {
        return _state.planets.map(p => new Planet(p));
    }

    get ActivePlanet() {
        return new Planet(_state.activePlanet)
    }

    get nextPlanets() {
        return _state.nextPrevPlanet.nextURL;
    }

    get PreviousPlanets() {
        return _state.nextPrevPlanet.previousUrl;
    }



    //make a call to swapi api to get all people
    getAllApiPeople(url = '') {
        _peopleApi.get(url)
            //Happens after data comes back
            .then(response => {
                //all axios requests return 'data' in the response
                let people = response.data.results.map(d => new Person(d))
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                setState('nextPrevPeople', urlData)
                setState('people', people)
            })
            .catch(err => {
                console.error(err)
            })
    };
    getOneApiPerson(url) {
        _peopleApi.get(url)
            .then(res => {
                setState('activePerson', new Person(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    };
    getAllApiPlanet(url = '') {
        _planetApi.get(url)
            //Happens after data comes back
            .then(response => {
                //all axios requests return 'data' in the response
                let planets = response.data.results.map(d => new Planet(d))
                let urlData = {
                    nextUrl: response.data.next,
                    previousUrl: response.data.previous
                }
                setState('nextPrevPlanet', urlData)
                setState('planets', planets)
            })
            .catch(err => {
                console.error(err)
            })
    };

    getOneApiPlanet(url) {
        _planetApi.get(url)
            .then(res => {
                setState('activePlanet', new Planet(res.data))
            })
            .catch(err => {
                console.error(err)
            })
    };

}