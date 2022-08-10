import { Either, left } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './invalid.email.error'
import { InvalidNameError } from './invalid.name.error'
import { Name } from './name'
import { UserData } from './user-data'

export class User {
  static create (user: UserData): Either<InvalidEmailError, User> {
    const validName = Name.create(user.name)
    if (validName.isLeft()) {
      return left(new InvalidNameError())
    }

    const validEmail = Email.create(user.email)
    if (validEmail.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
