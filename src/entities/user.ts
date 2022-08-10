import { Either, left } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './invalid-email-error'
import { UserData } from './user-data'

export class User {
  static create (user: UserData): Either<InvalidEmailError, User> {
    const validEmail = Email.create(user.email)
    if (validEmail.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
