import express from 'express'
import * as authCtrl from './auth.controller.js'

const router = express.Router()

router.route('/signup').post(authCtrl.signUp)
router.route('/login').get(authCtrl.login)
router.route('/logout').post(authCtrl.logout)

export default router

