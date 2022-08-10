import { left } from '../shared/either'
import { InvalidEmailError } from './invalid.email.error'
import { InvalidNameError } from './invalid.name.error'
import { User } from './user'

describe('User domain entity', () => {
  it('should not create user with invalid e-mail adress', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  it('should not create user with invalid name (too few chars)', () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })
    expect(error).toEqual(left(new InvalidNameError()))
  })
})
