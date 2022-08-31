import { Either, left, right } from '@/shared'
import { Email, Name, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/errors'

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
      return left(validName.value)
    }

    const validEmail = Email.create(user.email)
    if (validEmail.isLeft()) {
      return left(validEmail.value)
    }

    return right(new User(validName.value, validEmail.value))
  }
}
