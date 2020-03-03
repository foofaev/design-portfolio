My take on DDD and Clean Architecture using TypeScript, fastify and Typeorm

  1. Controllers take responsibility for presenting data to client. So all input / output models should be there. As well as mappers and dto's. As well as validation / serialization.
  2. Services (can't make myself call it use-cases) don't know anything about outside world, it's pure logic
  3. Services rely on interfaces, repositories from data layers should satisfy those interfaces
  3. Repositories are responsible for storing, querying data from db and any external sources

  4. The problem with Entities. By clean architecture logic entity in domain and database schema should be separated, so domain layer doesn't rely on data layer. Typeorm provides such feature - https://typeorm.io/#/separating-entity-definition. But it results in code dublication and not as elegant code.

  5. Useful links:
    - https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
    - https://habr.com/ru/company/mobileup/blog/335382/
    - https://proandroiddev.com/a-guided-tour-inside-a-clean-architecture-code-base-48bb5cc9fc97
