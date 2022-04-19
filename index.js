const express = require('express');
const  { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const schema = require('./schema/schema')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,

}))


app.listen(5000, ()=> {
    console.log('running ..........');
});

