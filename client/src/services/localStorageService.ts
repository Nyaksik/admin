export class LocalStorageService {
  static getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

  static setItem<T = string>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }

  static clear() {
    localStorage.clear()
  }
}
