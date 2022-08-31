import { InvalidEmailError, InvalidNameError } from '@/errors'
import { User, UserData } from '@/entities'
import { Either, left, right } from '@/shared'
import { UserRepoistory } from '@/usecases'

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
