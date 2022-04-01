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

      const list = await cursor.toArray()
      console.log(`${list.length} items per page`)
      return list  
    } catch (e) {
      console.error(`Unable to get listings, ${e}`);
    }
  }

  static async getLocation(location, page) {
    if (location) {
      console.log(`query.location : ${location} (dao)`)
      const listingsPerPage = 20
        try {
          const allListings = listings.aggregate(
            [
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
          )

          console.log('data retrieved')
          const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)
    
          const list = await cursor.toArray()
          console.log(`${list.length} items per page`)
          return list  
        } catch (e) {
          console.error(`Unable to get listings, ${e}`);
        }
    } else {
      console.log('no query entered')
    }
  }

  static async getBeds(beds,page) {
    if (beds) {
      console.log(`query.beds : ${beds} (dao)`)
      const listingsPerPage = 20
        try {
          const allListings = listings.find({ 'bedrooms': beds })

          console.log('data retrieved')
          const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)
    
          const list = await cursor.toArray()
          console.log(`${list.length} items per page`)
          return list  
        } catch (e) {
          console.error(`Unable to get listings, ${e}`);
        }
    } else {
      console.log('no query entered')
    }
  }

  static async compound(location, beds, page) {
    if (location && beds) {
      console.log(`query.location: ${location}, query.beds : ${beds} (dao)`)
      const listingsPerPage = 20
      try {
        const allListings = listings.aggregate(
          [
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
            },
            { $match: { "bedrooms": beds } }
          ]
        )

        console.log('data retrieved')
        const cursor = allListings.limit(listingsPerPage).skip(listingsPerPage * page)
        
        const list = await cursor.toArray()
        console.log(`${list.length} items per page`)
        return list
      } catch (e) {
        console.error(`Unable to get listings, ${e}`);
      }
    } else {
      console.log('no query entered')
    }
  }
}

