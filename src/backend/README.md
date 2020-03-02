My take on DDD and Clean Architecture

  1. Controllers take responsibility for presenting data to client. So all input / output models should be there. As well as mappers and dto's. As well as validation / serialization.
  2. Services (can't make myself call it use-cases) don't know anything about outside world, it's pure logic
  3. Repositories are responsible for storing, querying data from db
  4. Entities for now are db tables, probably should be moved to database folder with repositories
