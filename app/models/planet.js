export default class Planet {
  constructor(data) {
    this.name = data.name;
    this.climate = data.climate;
    this.terrain = data.terrain;
    this.gravity = data.gravity;
    this.surface_water = data.surface_water;
    this.population = data.population;
    this.url = data.url
  }

  get BasicTemplate() {
    return `<li onclick="app.controllers.swController.getPlanet('${this.url}')">${this.name}</li>`
  }

  get DetailedTemplate() {
    return `
        <h3>${this.name}</h3>
        <p>Climate: ${this.climate}</p>
        <p>Terrain: ${this.terrain}</p>
        <p>Gravity: ${this.gravity}</p>
        <p>Surface Water: ${this.surface_water}</p>
        <p>Population: ${this.population}</p>
        `
  }
}