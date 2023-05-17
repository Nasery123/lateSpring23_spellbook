import { AppState } from "../AppState.js"
import { Spell } from "../models/Spell.js"
import { sandboxApi } from "./AxiosService.js"

class UserSpellsService {
  async removeSpell(id) {
    const res = await sandboxApi.delete('api/spells/' + id)
    console.log('removed spell', res.data)
    AppState.userSpells = AppState.userSpells.filter(s => s.id != id)
  }

  async toggleSpell(id) {
    const spell = AppState.userSpells.find(s => s.id == id)
    // NOTE flipping a bool
    spell.prepared = !spell.prepared
    // send the edited spell to the server so it knows we flipped the bool 
    const res = await sandboxApi.put('api/spells/' + id, spell)
    console.log('did it work?', res.data)
  }

  async getUsersSpells() {
    const res = await sandboxApi.get('api/spells')
    console.log('my spells', res.data)
    AppState.userSpells = res.data.map(s => new Spell(s))
  }

  async addSpell() {
    const res = await sandboxApi.post('api/spells', AppState.activeSpell)
    const newSpell = new Spell(res.data)
    AppState.userSpells.push(newSpell)
    AppState.emit('userSpells')

  }

}

export const userSpellsService = new UserSpellsService()