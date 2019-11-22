
const PROJECT_TYPES = ['render'];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const portfolioTypeSchema = {
//    id: 'PortfolioType',
//    type: 'string',
//    title: 'Portfolio Type',
//    description: 'Portfolio Type',
//    enum: PORTFOLIO_TYPES
//};
//registerEntity(portfolioTypeSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const portfolioOutputSchema = {
//    id: 'PortfolioOutput',
//    type: 'object',
//    title: 'PortfolioOutput',
//    description: 'PortfolioOutput',
//    properties: {
//        _id: objectId,
//        type: {$ref: 'PortfolioType'},
//        title: string,
//        urlKey: string,

//        h1: stringOrEmpty,
//        metaTitle: stringOrEmpty,
//        metaDescription: stringOrEmpty,
//        metaSkipRobotIndex: boolean,
//        useH1Value: boolean,
//        useMetaTitleValue: boolean,
//        useMetaDescriptionValue: boolean,

//        content: {type: 'object'},
//        visible: boolean,
//        publishedAt: string,
//        previewImageId: objectIdOrNull,
//        previewImageUrl: stringOrEmpty,
//        createdAt: stringOrEmpty,
//        updatedAt: stringOrEmpty,
//        createdBy: stringOrEmpty,
//        updatedBy: stringOrEmpty
//    },
//    additionalProperties: false
//};

//registerEntity(portfolioOutputSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const portfolioInputSchema = {
//    id: 'PortfolioInput',
//    type: 'object',
//    title: 'PortfolioInput',
//    description: 'PortfolioInput',
//    properties: {
//        _id: objectIdOrEmpty,
//        type: {$ref: 'PortfolioType'},
//        urlKey: string,
//        title: string,

//        h1: stringOrEmpty,
//        metaTitle: stringOrEmpty,
//        metaDescription: stringOrEmpty,
//        metaSkipRobotIndex: boolean,
//        useH1Value: boolean,
//        useMetaTitleValue: boolean,
//        useMetaDescriptionValue: boolean,

//        visible: boolean,
//        publishedAt: string,
//        content: {type: 'object'}
//    },
//    required: ['_id', 'type', 'title', 'content', 'visible', 'publishedAt'],
//    additionalProperties: false
//};

//registerEntity(portfolioInputSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const example = {
//    _id: 'f1ea3f3c-d430-11e2-8981-08002768d168',
//    type: 'calendars_and_postcards',
//    title: 'Some portfolio',
//    urlKey: 'some_cool_portfolio',
//    metaTitle: '',
//    metaDescription: '',
//    metaSkipRobotIndex: false,
//    content: {},
//    visible: true,
//    createdBy: '',
//    updatedBy: '',
//    publishedAt: 'Wed Nov 02 2016 21:29:31 GMT+0300 (MSK)',
//    createdAt: 'Wed Nov 02 2016 21:29:31 GMT+0300 (MSK)',
//    updatedAt: 'Wed Nov 02 2016 18:53:32 GMT+0300 (MSK)'
//};

