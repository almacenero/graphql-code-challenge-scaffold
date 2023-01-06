import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
const expressPlayground = require('graphql-playground-middleware-express')
  .default
import fs from 'fs';
import queries from './resolvers/Queries';

const schemaString = fs.readFileSync('./src/schemas/schema.graphql', 'utf8');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

const schema = buildSchema(schemaString);

const rootValue = {
  ...queries,
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,
}));

export { app };