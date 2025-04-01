import express from 'express'
import * as authCtrl from './auth.controller.js'

const router = express.Router()

router.route('/signup').get(authCtrl.signUpGet)
router.route('/signup').post(authCtrl.signUpPost)
router.route('/login').get(authCtrl.login)
router.route('/logout').post(authCtrl.logout)

export default router

