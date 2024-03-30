export class LocalStorage {
  public static setItem<T = string>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) || '')
  }

  public static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  public static clear() {
    localStorage.clear()
  }
}
