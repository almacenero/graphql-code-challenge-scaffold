import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
const expressPlayground = require('graphql-playground-middleware-express')
  .default
import fs from 'fs';

const schemaString = fs.readFileSync('./src/schemas/schema.graphql', 'utf8');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

const schema = buildSchema(schemaString);

const root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

export { app };