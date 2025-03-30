import ListingsDAO from '../dao/listingsDao.js'

export default class ListingsController {
  static async apiGetAll(req, res, next) {
    const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(20)
    const pageNum = req.query.page ? parseInt(req.query.page) : parseInt(1)
    const list = await ListingsDAO.getAll(limit, pageNum)
    res.json(list)
  }

  static async apiGetLocation(req, res, next) {
    if (req.query.location) {
      const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(20)
      const location = req.query.location
      const pageNum = req.query.page ? parseInt(req.query.page) : parseInt(1)
      //console.log(`query.page : ${pageNum} controller`)
      console.log(`query.location : ${location} (controller getLoc)`)
      console.log(`query.limit : ${limit} (controller)`)
      const list = await ListingsDAO.getLocation(limit, location, pageNum)
      //console.log(list[0].data);
      res.json(list)
    } else {
      console.log('no query entered(ctrlr)')
    }
  }

  static async apiCompound(req, res, next) {
	if (!req.query.location) {
	  const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(20)
      const beds = req.query.bedrooms? parseInt(req.query.bedrooms) : parseInt(1)
      const pageNum = req.query.page ? parseInt(req.query.page) : parseInt(1)
      console.log(`query.location: undefined, query.beds: ${beds} (controller)`)
      const list = await ListingsDAO.getBeds(limit, beds, pageNum)
      res.json(list)
    } else {
	  const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(20)
      const location = req.query.location
      const beds = req.query.bedrooms? parseInt(req.query.bedrooms) : parseInt(1)
      const pageNum = req.query.page ? parseInt(req.query.page) : parseInt(1)
      //console.log(`query.location: ${location}, query.beds: ${beds} (controller)`)
      const list = await ListingsDAO.compound(limit, location, beds, pageNum)
      res.json(list)
	} 
  }

  static async apiGetCrib(req, res, next) {
    const cribID = req.params.cribID
    const crib = await ListingsDAO.getCrib(cribID)
    res.json(crib)
  }
  
  
  static async apiGetBeds(req, res, next) {
    if (!isNaN(req.query.bedrooms)) {
      const limit = req.query.limit ? parseInt(req.query.limit) : parseInt(20)
      const beds = parseInt(req.query.bedrooms)
      const pageNum = req.query.page ? parseInt(req.query.page) : parseInt(1)
      console.log(`query.beds : ${beds} (controller)`)
      const list = await ListingsDAO.getBeds(limit, beds, pageNum)
      res.json(list)
    } else {
      console.log('input is not a number')
      return
    }
  }
}

