import ListingsDAO from '../dao/listingsDao.js'

export default class ListingsController {
  static async apiGetAll(req, res, next) {
    const listingsPerPage = req.query.listingsPerPage ? parseInt(req.query.listingsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0
    const list = await ListingsDAO.getAll(listingsPerPage, page)
    res.json(list)
  }

  static async apiGetLocation(req, res, next) {
    if (req.query.location) {
      const location = req.query.location
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      console.log(`"query.location" : ${location} (controller)`)
      const list = await ListingsDAO.getLocation(location, page)
      res.json(list)
    } else {
      console.log('no query entered')
    }

  }

  static async apiGetBeds(req, res, next) {
    if (!isNaN(req.query.bedrooms)) {
      const beds = parseInt(req.query.bedrooms)
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      console.log(`"query.beds" : ${beds} (controller)`)
      const list = await ListingsDAO.getBeds(beds, page)
      res.json(list)
    } else {
      console.log('input is not a number')
      return
    }

  }

  static async apiCompound(req, res, next) {
    if (req.query.location && req.query.bedrooms) {
      const location = req.query.location
      const beds = parseInt(req.query.bedrooms)
      const page = req.query.page ? parseInt(req.query.page, 10) : 0

      console.log(`query.location: ${location}, query.beds: ${beds} (controller)`)
      const list = await ListingsDAO.compound(location, beds, page)
      res.json(list)
    } else {
      console.log('input field empty')
      return
    }

  }
}

