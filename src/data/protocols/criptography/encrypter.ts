export interface Encrypter {
  generate: (id: string) => Promise<string>
}
