const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require('graphql');

const books = [
    {id: '1', name: 'Harry Potter', genre: "Blah", author_id: '2'},
    {id: '2', name: 'Harry Potter 2', genre: "Blah", author_id: '1'},
    {id: '3', name: 'Harry Potter 3', genre: "Blah", author_id: '2'},
    {id: '4', name: 'Harry Potter 4', genre: "Blah", author_id: '1'},
];

const BookType = new GraphQLObjectType({
    name: 'BookType',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.author_id)
            }
        },
    })
});

const BookResolver = {
    type: BookType,
    args: {id: {type: GraphQLString}},
    resolve(parent, args) {
        return books.find(book => book.id === args.id)
    }
};

const authors = [
    {id: '1', name: 'Blah BLah', age: 25},
    {id: '2', name: 'Blah BLah 2', age: 24},
]

const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.author_id === parent.id);
            }
        }
    })
});

const AuthorResolver = {
    type: AuthorType,
    args: {id: {type: GraphQLString}},
    resolve(parent, args) {
        return authors.find(author => author.id === args.id);
    }
}


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: BookResolver,
        author: AuthorResolver
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})