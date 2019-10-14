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

Go to \Challenge C07\backend\src and do a

> $ npm install

The same in \Challenge C07\frontend

### Step 3: Go to \Challenge C07\backend\src and Run the server

Once all dependencies are installed, run the following command to start the application

> $ npm run start

You should see the following message in the terminal: 

```
Server listening at http://localhost:3977
Connection to database succesful!
```
### Step 4: Go to \Challenge C07\frontend in the terminal and Run React

> $ npm start

### Step 5: Populate books Database

its time to populate the `books` collection! In order to do that, copy paste the following endpoint in your browser and press ENTER 

```
http://localhost:3977/api/populateDB
```

 Or Open Postman and use the following endpoint in GET mode: 

```
http://localhost:3977/api/populateDB
```

The result should be a `db populated with book info`.
