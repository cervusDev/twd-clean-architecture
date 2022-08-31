import { UserData } from '@/entities'
import { UserRepoistory } from '@/usecases'

export class InMemoryUserRepository implements UserRepoistory {
  private repository: UserData[] = []

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)

    if (!exists) {
      this.repository.push(user)
    }

    return null
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const users = this.repository.filter(user => user.email === email)

    if (users.length === 0) {
      return null
    }
    return users[0]
  }

  async findAllUsers (): Promise<UserData[]> {
    const users = this.repository

    if (users.length === 0) {
      return null
    }

    return users
  }

  async exists (user: UserData): Promise<boolean> {
    const find = await this.findUserByEmail(user.email)
    if (!find) {
      return false
    }
    return true
  }
}
