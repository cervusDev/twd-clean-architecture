import { Email } from '../../src/entities'

describe('Email validation', () => {
  it('should not accept null strings', () => {
    const email = null
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should not accept empty strings', () => {
    const email = ''
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should accept valid email', () => {
    const email = 'any@email.com'
    const validate = Email.validate(email)

    expect(validate).toBeTruthy()
  })

  it('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@email.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should not accept email larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should not accept domain part larger than 255 chars', () => {
    const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should no accept empty local part', () => {
    const email = '@domain.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should not accept empty domain part', () => {
    const email = 'local@'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should not accept domain with a part larger than 63 chars', () => {
    const email = 'any@' + 'd'.repeat(64) + '.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should no accept local part with invalid char', () => {
    const email = 'any email@mail.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should no accept local part with two dots', () => {
    const email = 'any..email@mail.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should no accept local part with ending dots', () => {
    const email = 'anyemail.@mail.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })

  it('should no accept email without an at-sign', () => {
    const email = 'anyemailmail.com'
    const validate = Email.validate(email)

    expect(validate).toBeFalsy()
  })
})
