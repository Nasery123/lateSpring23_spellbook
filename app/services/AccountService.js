import { AppState } from '../AppState.js'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger.js'
import { sandboxApi } from './AxiosService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await sandboxApi.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error(err)
    }
  }

  async editAccount(accountData) {
    const res = await sandboxApi.put('/account', accountData)
    AppState.account = new Account(res.data)
  }

}

export const accountService = new AccountService()
