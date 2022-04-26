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
      const allListings = await listings.aggregate([
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: limit * page }, { $limit: limit }]
          }
        }
      ])
      console.log('Data retrieved (getAll)')

      const startIndex = (limit * page)
      const endIndex = (limit * page) + limit
      const list = await allListings.toArray()
      const total = list[0].metadata[0].total

      console.log(`total: ${total} items`)
      console.log(`${limit} items per page, ${list[0].data.length} items displayed`)
      console.log(`${Math.ceil(total / limit)} pages`)
      console.log(`pageRequested: page ${pageNum}`)
      console.log(`startIndex = ${startIndex}, endIndex = ${endIndex}`)

      if (startIndex > 0) {
        console.log('prevPage: true')
      } else {
        console.log('prevPage: false')          
      }

      if (endIndex < list[0].metadata[0].total) {
        console.log('nextPage: true')
      } else {
        console.log('nextPage: false')
      }

      return list
    } catch (e) {
      console.error(`Unable to get listings, ${e}`);
    }
  }

  static async getLocation(limit, location, pageNum) {
    if (location) {
      console.log(`Query.location : ${location}`)
      try {
        const page = pageNum - 1
        const allListings = await listings.aggregate(
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
            
            {
              $facet: {
                metadata: [{ $count: 'total' }],
                data: [{ $skip: limit * page }, { $limit: limit }]
              }
            }
          ]
        )
        console.log('Data retrieved (getLocation)')

        const startIndex = (limit * page)
        const endIndex = (limit * page) + limit
      
        //const cursor = allListings.skip(limit * page).limit(limit)
        const list = await allListings.toArray()
        const total = list[0].metadata[0].total

        console.log(`total: ${total} items`)
        console.log(`${limit} items per page, ${list[0].data.length} items displayed`)
        console.log(`${Math.ceil(total / limit)} pages`)
        console.log(`pageRequested: page ${pageNum}`)
        console.log(`startIndex = ${startIndex}, endIndex = ${endIndex}`)

        if (startIndex > 0) {
          console.log('prevPage: true')
        } else {
          console.log('prevPage: false')          
        }

        if (endIndex < list[0].metadata[0].total) {
          console.log('nextPage: true')
        } else {
          console.log('nextPage: false')
        }

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
      console.log(`Query.location: ${location}, Query.beds : ${beds}`)
      try {
        const page = pageNum - 1
        const allListings = await listings.aggregate(
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
            { $match: { "bedrooms": beds } },
            {
              $facet: {
                metadata: [{ $count: 'total' }],
                data: [{ $skip: limit * page }, { $limit: limit }]
              }
            }
          ]
        )
    
        console.log('Data retrieved (compound)')

        const startIndex = (limit * page)
        const endIndex = (limit * page) + limit
        const list = await allListings.toArray()
        const total = list[0].metadata[0].total

        console.log(`total: ${total} items`)
        console.log(`${limit} items per page, ${list[0].data.length} items displayed`)
        console.log(`${Math.ceil(total / limit)} pages`)
        console.log(`pageRequested: page ${pageNum}`)
        console.log(`startIndex = ${startIndex}, endIndex = ${endIndex}`)

        if (startIndex > 0) {
          console.log('prevPage: true')
        } else {
          console.log('prevPage: false')          
        }

        if (endIndex < list[0].metadata[0].total) {
          console.log('nextPage: true')
        } else {
          console.log('nextPage: false')
        }

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
          const allListings = await listings.find({ 'bedrooms': beds })

          const total = await allListings.count()
    
          console.log('data retrieved (getBeds)')

          const startIndex = (limit * page)
          const endIndex = (limit * page) + limit
          const cursor = allListings.skip(limit * page).limit(limit)
          const list = await cursor.toArray()

          console.log(`start Index = ${startIndex}, end Index = ${endIndex}`)
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

