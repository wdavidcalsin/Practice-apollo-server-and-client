import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';

import { gql} from "apollo-server"

const persons = [
    {
      id: 0,
      name: "Noreen Lowe"
    },
    {
      id: 1,
      name: "Rachelle Joyner"
    },
    {
      id: 2,
      name: "Kimberly Thomas"
    }
  ]


const typeDefs = gql`
  type Person{
    id: ID!,
    name: String!
  }

  type Query {
    persontCount: Int!
    allPerson: [Person]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
    Query: {
        persontCount: () => persons.length,
        allPerson: () => persons,
        findPerson: (root, args) => {
          const {name} = args

          return persons.find(person => person.name == name)
        }
    }
}

// const server = new ApolloServer({
//     typeDefs: typeDefinitions,
//     resolvers
// })

// server.listen().then(({url}) => {
//     console.log(`Server ready at ${url}`)
// })

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

await startApolloServer(typeDefs, resolvers)