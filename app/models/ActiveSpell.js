export class ActiveSpell {
  constructor(data) {

    // Adapter Pattern for the Sandbox Data
    this.name = data.name
    this.description = data.desc?.join('<br/>')
    this.damage = data.damage || 0
    this.level = data.level || 1
    this.range = data.range || ''
    this.material = data.material || ''
    this.ritual = data.ritual || false
    this.concentration = data.concentration || false
    this.castingTime = data.casting_time || ''
    this.duration = data.duration || ''
    this.components = data.components || []
  }


  get ActiveSpellCardTemplate() {
    return /*html*/`
      <div class="card">
        <div class="card-body">
          <p class="fs-2">${this.name}</p>
        </div>
      </div>
    `
  }


}