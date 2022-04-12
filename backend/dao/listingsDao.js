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

  static async getAll(limit, pageNum) {

    try {
      const page = pageNum - 1
      const allListings = listings.find()
      console.log('data retrieved')
      const cursor = allListings.skip(limit * page).limit(limit)

      const list = await cursor.toArray()
      console.log(`${list.length} items per page`)
      return list  
    } catch (e) {
      console.error(`Unable to get listings, ${e}`);
    }
  }

  static async getLocation(limit, location, pageNum) {
    if (location) {
      console.log(`query.location : ${location} (dao)`)
      try {
          const page = pageNum - 1
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
          console.log(`computed page: ${page} dao`);
          const cursor = allListings.skip(limit * page).limit(limit)
    
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

  static async getBeds(limit, beds, pageNum) {
    if (beds) {
      console.log(`query.beds : ${beds} (dao)`)
        try {
          const allListings = listings.find({ 'bedrooms': beds })

          console.log('data retrieved')
          const cursor = allListings.skip(limit * page).limit(limit)
    
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

  static async compound(limit, location, beds, pageNum) {
    if (location && beds) {
      console.log(`query.location: ${location}, query.beds : ${beds} (dao)`)
      try {
        const page = pageNum - 1
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
        const cursor = allListings.skip(limit * page).limit(limit)
        
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

