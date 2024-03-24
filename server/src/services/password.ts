import * as argon2 from 'argon2'

export class Password {
  async getHash(password: string): Promise<string> {
    return await argon2.hash(password)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password)
  }
}
