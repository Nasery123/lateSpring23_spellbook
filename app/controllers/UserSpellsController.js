import { AppState } from "../AppState.js"
import { userSpellsService } from "../services/UserSpellsService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawUserSpells() {
  console.log('drawing users spells 🧙‍♂️', AppState.userSpells)

  let template = /*html*/`
    <div class="">
      <div class="d-flex">
        <p>
          <b>
          Prepared ${AppState.userSpells.filter(s => s.prepared).length}/${AppState.userSpells.length}</p>
          </b>
        </div>
    </div>
  `

  AppState.userSpells.forEach(s => {
    template += s.UserSpellTemplate
  })

  setHTML('userSpells', template)

}


export class UserSpellsController {

  constructor() {
    console.log('is this thing on....')
    // DO NOT TRY THIS ON LOAD YOU MUST WAIT
    // this.getUserSpells() 

    AppState.on('account', this.getUserSpells)
    AppState.on('userSpells', _drawUserSpells)

  }

  async getUserSpells() {
    try {
      await userSpellsService.getUsersSpells()
    } catch (error) {
      Pop.error(error)
    }
  }


  async addSpell() {
    try {
      await userSpellsService.addSpell()
    } catch (error) {
      Pop.error(error)
    }
  }

  async togglePrepared(id) {
    try {
      await userSpellsService.toggleSpell(id)
    } catch (error) {
      Pop.error(error)
    }
  }

  async removeSpell(id) {
    try {
      const yes = await Pop.confirm('Forget Spell?')
      if (!yes) { return }
      
      await userSpellsService.removeSpell(id)
    } catch (error) {
      Pop.error(error)
    }
  }


}