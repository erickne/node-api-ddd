export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://mongo:27017/clea-node-api',
  port: process.env.POST ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'rTfks=%21'
}
