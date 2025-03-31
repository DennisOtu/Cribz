import express from 'express'

const router = express.Router()

router.route('/signup').get((req, res) => {res.send('signUpGet')})
router.route('/signup').post((req, res) => {res.send('signUpPost')})
router.route('/login').get((req, res) => {res.send('login')})
router.route('/logout').post((req, res) => {res.send('logout')})

export default router

