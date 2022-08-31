import { InvalidEmailError } from '../../errors/invalid.email.error'
import { InvalidNameError } from '../../errors/invalid.name.error'
import { User } from '../../entities/user'
import { UserData } from '../../entities/user-data'
import { Either, left, right } from '../../shared/either'
import { UserRepoistory } from '../ports/user.repository'

type Errors = InvalidNameError | InvalidEmailError
type Response = Either<Errors, UserData>
export class RegisterUserOnMailingList {
  private readonly userRepo: UserRepoistory

  constructor (userRepo: UserRepoistory) {
    this.userRepo = userRepo
  }

  public async RegisterUserOnMailingList (request: UserData): Promise<Response> {
    const userOrError: Either<Errors, User> = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const exists = await this.userRepo.exists(request)
    if (!exists) {
      await this.userRepo.add(request)
    }
    return right(request)
  }
}
