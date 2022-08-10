import { gql, ApolloServer} from "apollo-server"

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
    },
    {
      id: 3,
      name: "David"
    }
  ]


const typeDefinitions = gql`
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
        },
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})