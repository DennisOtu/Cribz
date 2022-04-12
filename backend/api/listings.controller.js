import ListingsDAO from '../dao/listingsDao.js'

export default class ListingsController {
  static async apiGetAll(req, res, next) {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20
    const pageNum = req.query.page ? parseInt(req.query.page) : 1
    const list = await ListingsDAO.getAll(limit, pageNum)
    res.json(list)
  }

  static async apiGetLocation(req, res, next) {
    if (req.query.location) {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20
      const location = req.query.location
      const pageNum = req.query.page ? parseInt(req.query.page) : 1
      console.log(`query.page : ${pageNum} controller`)
      console.log(`query.location : ${location} (controller)`)
      const list = await ListingsDAO.getLocation(limit, location, pageNum)
      res.json(list)
    } else {
      console.log('no query entered')
    }

  }

  static async apiGetBeds(req, res, next) {
    if (!isNaN(req.query.bedrooms)) {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20
      const beds = parseInt(req.query.bedrooms)
      const pageNum = req.query.page ? parseInt(req.query.page) : 1

      console.log(`query.beds : ${beds} (controller)`)
      const list = await ListingsDAO.getBeds(limit, beds, pageNum)
      res.json(list)
    } else {
      console.log('input is not a number')
      return
    }

  }

  static async apiCompound(req, res, next) {
    if (req.query.location && req.query.bedrooms) {
      const limit = req.query.limit ? parseInt(req.query.limit) : 20
      const location = req.query.location
      const beds = parseInt(req.query.bedrooms)
      const pageNum = req.query.page ? parseInt(req.query.page) : 1

      console.log(`query.location: ${location}, query.beds: ${beds} (controller)`)
      const list = await ListingsDAO.compound(limit, location, beds, pageNum)
      res.json(list)
    } else {
      console.log('input field empty')
      return
    }

  }
}

