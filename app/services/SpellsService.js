import { AppState } from "../AppState.js"
import { Spell } from "../models/Spell.js"
import { dndApi } from "./AxiosService.js"

class SpellsService {

  async setActiveSpell(index) {
    const res = await dndApi.get('api/spells/' + index)
    // const res = await dndApi.get(`api/spells/${index}`)

    console.log('what is the res', res.data)

    AppState.activeSpell = new Spell(res.data)

  }


  async getSpells() {
    const res = await dndApi.get('/api/spells')
    // console.log('what is the res', res.data.results)
    AppState.spellDex = res.data.results
  }


}


export const spellsService = new SpellsService()