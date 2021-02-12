// export const port = 4000
// export const dbURI = 'mongodb://localhost/pokezon'
// export const secret = 'this string is a special string'


import dotenv from 'dotenv'
dotenv.config()

export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/pokezon'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'shhhh its a secret'



