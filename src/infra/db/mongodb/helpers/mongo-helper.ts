import { type Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      // this.client = await MongoClient.connect('mongodb://', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
    await this.client.db()
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}
