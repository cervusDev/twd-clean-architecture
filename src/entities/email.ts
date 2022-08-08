export class Email {
  static validate (email: string): boolean {
    if (!email) {
      return false
    }

    if (email.length > 320) {
      return false
    }

    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    const invalidChar = emailRegex.test(email)

    if (!invalidChar) {
      return false
    }

    const [local, domain] = email.split('@')
    if (local.length > 64 || local.length === 0) {
      return false
    }

    if (domain.length > 255 || domain.length === 0) {
      return false
    }

    const domainParts = domain.split('.')
    const larger63 = domainParts.some((part) => part.length > 63)

    if (larger63) {
      return false
    }

    return true
  }
}
