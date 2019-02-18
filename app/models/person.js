import Planet from "./planet.js";


export default class Person {
    constructor(data) {
        this.name = data.name;
        this.gender = data.gender;
        this.hairColor = data.hair_color || data.hairColor;
        this.eyeColor = data.eye_color || data.eyeColor;
        this.movies = data.movies || data.films.length;
        this.homeworld = data.homeworld;
        this.url = data.url;
    }

    get Planet() {
        return new Planet
    }

    get BasicTemplate() {
        return `<li onclick="app.controllers.swController.getPerson('${this.url}')" class="${this.gender}">${this.name}</li>`
    }

    get DetailedTemplate() {
        return `
        <h3>${this.name}</h3>
        <p>Hair: ${this.hairColor}</p>
        <p>Eyes: ${this.eyeColor}</p>
        <p>Movies: ${this.movies}</p>
        <p onclick="app.controllers.swController.getPlanet('${this.homeworld}')">Homeworld: ${Planet.name}</p>
        `
    }
}