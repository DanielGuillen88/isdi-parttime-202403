import 'dotenv/config'
import express from 'express'
import logic from './logic/index.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import { SystemError } from 'com/errors.js'
import { MongoClient } from 'mongodb'
import data from './data/index.js'

const { MONGODB_URL, PORT, JWT_SECRET } = process.env

const client = new MongoClient(MONGODB_URL)

client.connect()
    .then(connection => {
        const db = connection.db('test')

        const users = db.collection('users')
        const posts = db.collection('posts')

        data.users = users
        data.posts = posts

        const { JsonWebTokenError, TokenExpiredError } = jwt

        const api = express()

        api.use(express.static('public'))

        api.use(cors())

        api.get('/', (req, res) => res.send('Hello, World!'))

        const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

        api.post('/users', jsonBodyParser, (req, res) => {
            const { name, surname, email, username, password, passwordRepeat } = req.body

            try {
                logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                    if (error) {
                        res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    res.status(201).send()
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })



        api.post('/users/auth', jsonBodyParser, (req, res) => {
            const { username, password } = req.body

            try {
                logic.authenticateUser(username, password, error => {
                    if (error) {
                        res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '1h' }, (error, token) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(token)
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/users/:targetUsername', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: username } = payload

                    const { targetUsername } = req.params

                    logic.getUserName(username, targetUsername, (error, name) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(name)
                    })
                })

            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.get('/posts', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: username } = payload

                    logic.getAllPosts(username, (error, posts) => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.json(posts)
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.post('/posts', jsonBodyParser, (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: username } = payload

                    const { title, image, description } = req.body

                    logic.createPost(username, title, image, description, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(201).send()
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.delete('/posts/:postId', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    logic.deletePost(username, postId, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.patch('/posts/:postId/likes', (req, res) => {
            try {
                const token = req.headers.authorization.slice(7)

                jwt.verify(token, JWT_SECRET, (error, payload) => {
                    if (error) {
                        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError)
                            res.status(500).json({ error: SystemError.name, message: error.message })
                        else
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                        return
                    }

                    const { sub: username } = payload

                    const { postId } = req.params

                    logic.toggleLikePost(username, postId, error => {
                        if (error) {
                            res.status(500).json({ error: error.constructor.name, message: error.message })

                            return
                        }

                        res.status(204).send()
                    })
                })
            } catch (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })
            }
        })

        api.listen(PORT, () => console.log(`API running on PORT ${PORT}`))
    })
    .catch(error => console.error(error))