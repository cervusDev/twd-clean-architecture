import { UserData } from '@/entities'
import { InMemoryUserRepository } from '@/usecases'

describe('In memory user repository', () => {
  it('should return null if user is not found', async () => {
    const users: UserData[] = []
    const repository = new InMemoryUserRepository(users)
    const user = await repository.findUserByEmail('any@gmail.com')
    expect(user).toBeNull()
  })

  it('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const json = { name: 'any', email: 'any@email' }
    const repository = new InMemoryUserRepository(users)
    await repository.add(json)
    const user = await repository.findUserByEmail('any@email')
    expect(user.email).toEqual(json.email)
  })

  it('should return all users', async () => {
    const users = [{ name: 'any', email: 'any@email' }, { name: 'any', email: 'any@email' }]
    const repository = new InMemoryUserRepository(users)
    const usersFound = await repository.findAllUsers()
    expect(usersFound.length).toBe(2)
  })
})
