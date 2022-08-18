import { Either, left, right } from '../shared/either'
import { Email } from './email'
import { InvalidEmailError } from './invalid.email.error'
import { InvalidNameError } from './invalid.name.error'
import { Name } from './name'
import { UserData } from './user-data'

type Errors = InvalidNameError | InvalidEmailError

export class User {
  public readonly email: Email
  public readonly name: Name

  private constructor (name: Name, email: Email) {
    this.email = email
    this.name = name
  }

  static create (user: UserData): Either<Errors, User> {
    const validName = Name.create(user.name)
    if (validName.isLeft()) {
      return left(new InvalidNameError(user.name))
    }

    const validEmail = Email.create(user.email)
    if (validEmail.isLeft()) {
      return left(new InvalidEmailError(user.email))
    }

    const name = validName.value as Name
    const email = validEmail.value as Email

    return right(new User(name, email))
  }
}
