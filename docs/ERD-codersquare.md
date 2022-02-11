# ERD: codersquare

This document explores the design of online-auction-system, a website where users could exchange goods in auctions manner.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a NoSql database, and serving HTTP traffic from a public endpoint.

## Storage

We'll use a NoSql database to fast retrieval of data.  
Data will be stored on the server on a separate, backed up volume for resilience. There will be no replication or sharding of data at this early stage.

### Schema:

We'll need at least the following entities to implement the service:

**Users**:
| Column | Type |
|--------|------|
| \_id | ObjectId |
| name | STRING |
| Email | STRING |
| Password | STRING |
| role | Roles enum |

**Auctions**:
| Column | Type |
|--------|------|
| \_id | ObjectId |
| Product | String |
| InitialPrice | number |
| startDate | Date |
| endDate | Date |
| sellerId | ObjectId |
| status | Status enum |

## Server

A simple HTTP server is responsible for authentication, serving stored data, and potentially ingesting and serving analytics data.

- Node.js is selected for implementing the server for speed of development.
- Nest.js is the web server framework.
- Mongoose to be used as an ORM.

### Auth

For v1, a simple JWT-based auth mechanism is to be used, with passwords
hashed and stored in the database.  
OAuth is to be added initially or later for Google + Facebook and maybe others (Github?).

### API

**Auth**:

```
/register  [POST]
/login  [POST]
/logout [POST]
/refresh-token [POST]
/profile [GET]
```

**Users**:

```
/users  [GET]
/users/:id  [GET]
/users/:id [PATCH]
/users/:id [DELETE]
```

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js.

## Hosting

The code will be hosted on Github, PRs and issues welcome.

The web client will be hosted using any free web hosting platform such as firebase or netlify. A domain will be purchased for the site, and configured to point to the web host's server public IP.

We'll deploy the server to a (likely shared) VPS for flexibility. The VM will have HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated later using Github actions or similar. The server will have closed CORS policy except for the domain name and the web host server.
