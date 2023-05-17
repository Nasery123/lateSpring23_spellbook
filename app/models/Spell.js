import { AppState } from "../AppState.js"

export class Spell {
  constructor(data) {
    // Adapter Pattern for the Sandbox Data
    this.id = data.id || ''
    this.name = data.name
    this.description = data.desc?.join('<br/>') || data.description || ''
    this.damage = data.damage || 0
    this.level = data.level || 1
    this.range = data.range || ''
    this.material = data.material || ''
    this.ritual = data.ritual || false
    this.concentration = data.concentration || false
    this.castingTime = data.casting_time || data.castingTime || ''
    this.duration = data.duration || ''
    this.components = data.components || []
    this.prepared = data.prepared || false
  }

  get ActiveSpellCardTemplate() {
    return /*html*/`
      <div class="card sticky-top my-4">
        <div class="card-body">
          <p class="fs-2">${this.name}</p>

          <p>${this.description}</p>

          ${this.SpellbookButton}


        </div>
      </div>
    `
  }

  get SpellbookButton() {
    if (!AppState.account) {
      return /*html*/`
        <button class="btn btn-primary" onclick="app.AuthController.login()">Login to Add to Spellbook</button>
      `
    }
    return /*html*/`
      <button class="btn btn-primary" onclick="app.UserSpellsController.addSpell()">Add to Spellbook</button>
    `
  }


  get preparedCheckbox() {
    return this.prepared ? 'checked' : ''
  }


  get UserSpellTemplate() {
    return /*html*/`
      <div>
        <p class="fs-4 d-flex align-items-center justify-content-between">
        
        <input 
          type="checkbox" 
          onchange="app.UserSpellsController.togglePrepared('${this.id}')"
          ${this.preparedCheckbox} 
        >

            <span>
              ${this.name}
            </span>
            <button class="btn btn-outline-dark" onclick="app.UserSpellsController.removeSpell('${this.id}')">
              💀
            </button>
          </p>
      </div>
    `
  }

}