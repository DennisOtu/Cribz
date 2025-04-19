import express from 'express'
import * as authCtrl from './auth.controller.js'

const router = express.Router()

router.route('/signup').post(authCtrl.signUp)
router.route('/login').post(authCtrl.login)
router.route('/logout').get(authCtrl.logout)

export default router

