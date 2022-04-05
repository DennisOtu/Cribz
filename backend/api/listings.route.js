import express from 'express'
import ListingsCtrl from '../api/listings.controller.js'

const router = express.Router()
router.route('/').get(ListingsCtrl.apiGetAll)
router.route('/location').get(ListingsCtrl.apiGetLocation)
router.route('/bedrooms').get(ListingsCtrl.apiGetBeds)
router.route('/compound').get(ListingsCtrl.apiCompound)

export default router

