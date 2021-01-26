const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema')
const app = express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening to: http://localhost:${PORT}`);
});