import { UserData } from '../../entities/user-data'
import { UserRepoistory } from '../ports/user.repository'
import { InMemoryUserRepository } from '../repository/user.inmemory.repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'

describe('Register user on mailing list', () => {
  it('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepoistory = new InMemoryUserRepository(users)
    const usecsae: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const json = { name: 'any_name', email: 'any@mail.com' }
    const response = await usecsae.RegisterUserOnMailingList(json)
    const user = repo.findUserByEmail(json.email)
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })
})
