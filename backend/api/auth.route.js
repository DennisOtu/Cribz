import express from 'express'
import * as authCtrl from './auth.controller.js'

const router = express.Router()

router.route('/signup').post(authCtrl.signUp)
router.route('/login').post(authCtrl.login)

export default router

