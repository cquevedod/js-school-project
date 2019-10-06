
# Challenge C06 

## Minimum Viable Product (MVP): 

- Generate a backend rest service with the necessary endpoints to use in the application
- Integrate MongoDB to save all reservations

  Detailed specs:
- - Create some JS code to populate MongoDB with books information.
- - Create a method to return all books. This method could receive a QUERY parameter to filter the books by               bookShelf: Quito, Medellin, Digital, etc….
- - Create a method to return the info of 1 book.
- - Create a method to lend a Book. This method should validate the book is not lent.
- - The backend should Have users.
- - Create a login endpoint for a user to authenticate and receive a token
- - All the endpoints except Login are secured. Use a JWT approach
- - Create a Detailed Readme on how to run the backend

- Create at least 3 endpoints to be consumed
- Use express architecture to mount all services

## Development

### Step 1 Create database and collections 

After run MongoDB services, let's create `bookInfo` database. In Mongo terminal: 

> > use bookInfo

Now let's create the collections into `bookInfo`

`books` collection:
 ```
 db.createCollection('books')
```
`users` colection:
```
db.createCollection('users')
```
its time to populate the `books` collection! In order to do that we need import the books data from a JSON file named `books.json`:

 Open Postman and use the following endpoint: 

```
/api/populateDB
```
The result should be a `db populated` message and we have the books collection filled with books data. 

In the step four, we'll see how to fill the `users` collection

### Step 2 Installing Dependencies 

It's neccesary to have all dependencies, listed in `package.json`, installed in order to run the project properly.

> $ npm install

Once all dependencies are installed, run the following command to start the application

> $ npm run start

Endpoints: 

```
Not-Secured:
POST: /api/register
POST: /api/login

Authenticated with JWT 

GET: /api/book/:id
GET: /api/books/all
GET: /api//bookshelf/:bookShelf
POST: /api/book/:id/lend
POST: /api/book/:id/return
```