import express from 'express'
import ListingsCtrl from './listings.controller.js'

const router = express.Router()

router.route('/').get(ListingsCtrl.apiGetAll)
router.route('/location').get(ListingsCtrl.apiGetLocation)
router.route('/bedrooms').get(ListingsCtrl.apiGetBeds)
router.route('/compound').get(ListingsCtrl.apiCompound)
router.route('/compound/:cribID').get(ListingsCtrl.apiGetCrib)
router.route('/:cribID').get(ListingsCtrl.apiGetCrib)

export default router

