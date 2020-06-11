
# Challenge C06 
 
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

## Requeriments:

* Node.js version 10.16.0
* MongoDB Server version 4.2

## How to run the app

### Step 1: Create Mongo database and collections 

After run MongoDB services, let's create `bookInfo` database. In Mongo terminal: 

> use bookInfo

Now let's create the collections into `bookInfo`

`books` collection:
 ```
 db.createCollection('books')
```
`users` colection:
```
db.createCollection('users')
```

### Step 2: Installing Dependencies 

It's neccesary to have all dependencies, listed in `package.json`, installed in order to run the project properly.

> $ npm install


### Step 3: Run server

Once all dependencies are installed, run the following command to start the application

> $ npm run start

You should see the following message in the terminal: 

```
Server listening at http://localhost:3977
☺
Connection to database succesful!
```
### Step 4: Populate books Database

its time to populate the `books` collection! In order to do that we need import the books data from a JSON file named `books.json`:

 Open Postman and use the following endpoint in GET mode: 

```
http://localhost:3977/api/populatedb
```

The result should be a `db populated` message and we have the books collection filled with books data. 

In the next steps, we'll see how to fill the `users` collection



### Step 5: API overview

#### Models

Book model schema:
```JavaScript Code
  id: String,
  title: String,
  publishedDate: String,
  author: String,
  pageCount: Number,
  description: String,
  rating: Number,
  bookShelf: String,
  isLent: Boolean,
  returnDate: String,
  isbn: String
```

User model schema: 
```JavaScript Code
  name: String,
  surname: String,
  email: String,
  password: String,
  role: String
```
Tha API has the following endpoints classified by Not-Secured and Authenticated with JWT approach

#### Working with the API

#### NOTE: Not-secured POST requests must be sent using x-www-form-urlencoded:  

POST requests header: 
```JSON
'Content-Type': "application/x-www-form-urlencoded"
```

Endpoints: 

```
Not-Secured:
POST: /api/register
POST: /api/login

Authenticated with JWT:

GET: /api/books
GET: /api/books/:id
POST: /api/books/:id/lend
```

### Step 6: Registering a user


In order to use the authenticated endpoints we need to create an user, to do this we are going to use the `/api/register` endpoint with Postman 

#### Remember send the data using x-www-form-urlencoded in the Body tab: 

The body of this request consist in the following `key : value` pairs: 

```JSON
"name": String
"surname": String
"email": String
"password": String
"role": String
```

#### NOTE: all the data must be completed

If everything is ok the server will give you a response as like the following one:

```JSON
{
    "status": 200,
    "message": "Success registering!",
    "user": {
        "_id": "5d9a105a8432f40f88ed7ed1",
        "name": "Carlos",
        "surname": "Quevedo",
        "role": "ROLE_USER",
        "email": "carlosq@user.com",
        "password": "not showed, its an example",
        "__v": 0
    }
}
```

### Step 7: Logging in

Its time to Login to get the authorization token. 

To Login you can use the `/api/login` endpoint

The body of this request consist in the following `key : value` pairs: 

```JSON
"email": String
"password": String
```

If everything is ok the server will give you a response as like the following one:

```JSON

{
    "email": "carlosq@user.com",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDlhMTA1YTg0MzJmNDBmODhlZDdlZDEiLCJuYW1lIjoiQ2FybG9zIiwic3VybmFtZSI6IlF1ZXZlZG8iLCJlbWFpbCI6ImNhcmxvc3FAdXNlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNTcwMzc5MjgzfQ.V-Dl44qZ_glTYQoesdHqKVV6HdQ0JLS1FUhQ2GL06RM"
}
```
### Step 8: Using secured endpoints

In order to use the secured endpoints, you must copy the token and paste it in the 'Headers' tab of Postman. 

Name the key field as  'Authorization' and then paste the token in the 'value' field. Once done, you can make the request. 

The following `key : value` pair must be in the request header: 

```JSON 
"Authorization": "YOUR_TOKEN",
```

#### if you try to make the request without the token, you will receive the following response: 

```JSON
{
    "status": 401,
    "description": "Unauthorized",
    "message": "You need authorization to do this action. Please login and get the Token"
}
```

If everything is ok, you will get the normal response of the server according to the endpoint used. 

## Book endpoints

* ###  `/api/books`

#### Method type: GET

This endpoint without `bookshelf` query parameter return all books stored in database. 

If everything is ok the server will give you the following response: 


 ```JSON
{
    "status": 200,
    "description": "OK",
    "message": "All Books!",
    "items": 16,
    "books": [
        {
          ...
        },
        ...
    ]
}
 ```
This method could receive a QUERY parameter named `bookshelf` to filter the books by bookshelf. 

You need to add key `bookshelf` in Params tab and then put the `value`: Cartagena, Medellin, Quito or Digital.

If you enter an invalid location, the server will give you the following response: 

 ```JSON
{
    "status": 400,
    "description": "Bad Request",
    "message": "Invalid BookShelf! Valid bookshelves: Cartagena, Quito, Medellin or Digital"
}
```
If everything is ok the server will give you a response as like the following one:

For example, filter the books by Digital bookShelf:

```JSON
{
    "status": 200,
    "description": "OK",
    "message": "Digital books",
    "items": 5,
    "books": [
        {
           "_id": "5d9a071e267a582bcc114adc",
            "id": "2",
            "title": "The Secret Country",
            "publishedDate": "2007",
            "author": "Jane Johnson",
            "pageCount": 336,
            ...
        },
        ...
    ]
}
```
* ###  `/api/books/:id`

#### Method type: GET

This endpoint return the info of 1 book by `id` (id located in the JSON file).

If you enter a `id` that doesn't exist, the server will give you the following response: 

```JSON
{
    "status": 404,
    "description": "Not Found",
    "message": "Book doesn't exist"
}
```
If everyting is OK, the server will give you a response with the info of one book. 


* ###  `/api/books/:id/lend`

#### Method type: POST

This endpoint allow you lend a book.

Open Postman, put your token in the Headers Tab. Then go  to 'Body' tab and check "x-www-form-urlencoded"

Your POST header should looks like as: 

POST requests header: 
```JSON
"Content-Type": "application/x-www-form-urlencoded",
"Authorization": "YOUR_TOKEN"
```
The body of this request consist in the following `key : value` pairs: 

```JSON
"return_date": Date
```
This `Date` format is DD/MM/YYYY.

For example, your POST Body header should looks like as: 

```JSON
"return_date": 07/10/2019
```
If you put a wrong key name or not chekc the `return_date` key, the server will give you the following response: 

```JSON
{
    "status": 400,
    "description": "Bad request",
    "message": "Please enter a valid body key",
    "valid_key": "return_date"
}
```

If everyting is OK, the server will give you the following response: 

```JSON
{
    "status": 200,
    "description": "OK",
    "message": "Book lent!",
    "items": 1,
    "return_date": "06/10/2019"
}
```

And that's it!
