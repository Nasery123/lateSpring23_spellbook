import { AppState } from "../AppState.js"
import { spellsService } from "../services/SpellsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawSpellDex() {
  console.log('spellDex 📖', AppState.spellDex)

  let template = ''

  AppState.spellDex.forEach(s => {
    template += /*html*/`
      <div>
        <p class="fs-4 selectable" role="button" onclick="app.SpellsController.setActiveSpell('${s.index}')">${s.name}</p>
      </div>
    `
  })

  setHTML('spellDex', template)


}

function _drawActiveSpell(){
  setHTML('activeSpell', AppState.activeSpell.ActiveSpellCardTemplate)
}



export class SpellsController {

  constructor() {

    // 👂 LISTENERS
    AppState.on('spellDex', _drawSpellDex)
    AppState.on('activeSpell', _drawActiveSpell)

    console.log('doing magic 🪄')
    this.getSpellsFromApi()

  }


  async getSpellsFromApi() {
    try {
      await spellsService.getSpells()
    } catch (error) {
      Pop.error(error)
    }
  }


  async setActiveSpell(index) {
    try {
      await spellsService.setActiveSpell(index)
    } catch (error) {
      Pop.error(error)
    }
  }



}