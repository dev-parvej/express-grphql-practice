const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql');

const books = [
    {id: '1', name: 'Harry Potter', genre: "Blah", author_id: '2'},
    {id: '2', name: 'Harry Potter 2', genre: "Blah", author_id: '1'},
    {id: '3', name: 'Harry Potter 3', genre: "Blah", author_id: '2'},
    {id: '4', name: 'Harry Potter 4', genre: "Blah", author_id: '1'},
];

const authors = [
    {id: '1', name: 'Blah BLah', age: 25},
    {id: '2', name: 'Blah BLah 2', age: 24},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return books.find(book => book.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})