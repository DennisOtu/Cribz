import ListingsDAO from '../dao/listingsDao.js'

export default class ListingsController {
  static async apiGetAll(req, res, next) {
    const listingsPerPage = req.query.listingsPerPage ? parseInt(req.query.listingsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0
    const display  = await ListingsDAO.getAll(listingsPerPage, page)
    let output = {
      listings : display,
      listingsPerPage : listingsPerPage,
      page : page + 1
    }
    res.json(output)
  }

  static async apiGetLocation(req, res, next) {
    if (req.query.location) {
      const location = req.query.location
      console.log(`"query.location" : ${location} (controller)`)
      const { display, listingsPerPage, page }  = await ListingsDAO.getLocation(location)
      let output = {
        itemsMatched : display,
        listingsPerPage : listingsPerPage,
        page : page + 1,
      }
      res.json(output)
    } else {
      console.log('no query entered')
    }

  }

  static async apiGetBeds(req, res, next) {
    if (!isNaN(req.query.bedrooms)) {
      const beds = parseInt(req.query.bedrooms)
      console.log(`"query.beds" : ${beds} (controller)`)
      const { display, listingsPerPage, page }  = await ListingsDAO.getBeds(beds)
      let output = {
        itemsMatched : display,
        listingsPerPage : listingsPerPage,
        page : page + 1,
      }
      res.json(output)
    } else {
      console.log('input is not a number')
      return
    }

  }


}

