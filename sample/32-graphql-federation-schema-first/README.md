# GraphQL Federation - Schema First

A simple example of GraphQL Federation using Schema First approach.

## Execution

Make sure to start the two sub-graph applications first, then the gatway. Otherwise the gateway won't be able to fetch schemas from the sub-graphs.

```sh
cd core-application && npm install && npm run start
```

```sh
cd gateway && npm install && npm run start
```

## Access the graph

You can reach the gateway under `http://localhost:3002/graphql`

## Query a combined graph

```gql
query getUserWithPosts($userId: ID!) {
  getUser(id: $userId) {
    id
    name
    posts {
      id
      title
      user {
        id
        name
      }
    }
  }
}
```
