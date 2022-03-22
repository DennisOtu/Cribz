import dotenv from 'dotenv' 

dotenv.config()

let listings
export default class ListingsDAO {
  static async injectDB(conn) {
    if (listings) {
      return
    }
    try {
      listings = await conn.db(process.env.LISTINGS_NS).collection("listingsAndReviews")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in listingsDAO: ${e}`,
      )
    }
  }

  static async getAll(listingsPerPage, page) {

    try {
      const allListings = listings.find()
      console.log('data retrieved')
      const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)

      const display = await cursor.toArray()
      console.log(`${display.length} items per page`)
      return { display, listingsPerPage, page }  
    } catch (e) {
      console.error(`Unable to get listings, ${e}`);
    }
  }

  static async getLocation(location) {
    if (location) {
      console.log(`query.location : ${location} (dao)`)
      const listingsPerPage = 20
      const page = 0
      const pipeline = [
        {
          $search: {
            index: 'location',
            text: {
              query: location,
              path: {
                'wildcard': '*'
              }
            }
          }
        }
      ]
        try {
          const allListings = listings.aggregate(pipeline)

          console.log('data retrieved')
          const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)
    
          const display = await cursor.toArray()
          console.log(`${display.length} items per page`)
          return { display, listingsPerPage, page }  
        } catch (e) {
          console.error(`Unable to get listings, ${e}`);
        }
    } else {
      console.log('no query entered')
    }
  }

  static async getBeds(beds) {
    if (beds) {
      console.log(`query.beds : ${beds} (dao)`)
      const listingsPerPage = 20
      const page = 0

        try {
          const allListings = listings.find({ 'bedrooms': beds })

          console.log('data retrieved')
          const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)
    
          const display = await cursor.toArray()
          console.log(`${display.length} items per page`)
          return { display, listingsPerPage, page }  
        } catch (e) {
          console.error(`Unable to get listings, ${e}`);
        }
    } else {
      console.log('no query entered')
    }
  }

}

