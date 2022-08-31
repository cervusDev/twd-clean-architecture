import { UserData } from '../../../src/entities'
import { UserRepoistory, InMemoryUserRepository, RegisterUserOnMailingList } from '../../../src/usecases'

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

  it('should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepoistory = new InMemoryUserRepository(users)
    const usecsae: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const json = { name: 'any_name', email: 'invalid-email' }
    const response = (await usecsae.RegisterUserOnMailingList(json)).value as Error
    const user = await repo.findUserByEmail(json.email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  it('should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepoistory = new InMemoryUserRepository(users)
    const usecsae: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const json = { name: '', email: 'valid@mail.com' }
    const response = (await usecsae.RegisterUserOnMailingList(json)).value as Error
    const user = await repo.findUserByEmail(json.email)
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
