#  :ledger: Note-taking app

---

> Keep everything important, capture ideas, stay organized and productive with this note-taking app.

## Development process

---


[**TRELLO LINK**](https://trello.com/b/cSzWcC6C)


## Running the app (Docker)

---

1. Install Docker
2. Clone 

   `git clone https://github.com/alyona-korenkovich/note-taking-app.git`

   `cd note-taking-app`
3. Create `.env` file in the current directory with specified variables:
   1. `DB_USERNAME`= ...
   2. `DB_PASSWORD`= ...
   3. `JWT_SECRET`= ...
4. Run `docker compose up`
5. Voilà -- the app is now available in your browser at `localhost:3000`

## Usage examples (Postman)
### Authentication

#### Sign-up

---
* POST localhost:5000/auth/register

Body:
```json
{
   "name": "John",
   "email": "example@mail.ru",
   "password": "Aud7oefj90"
}
```

Result (uses login request, so returns accessToken):
```json
{
    "id": "6389c46e0a06c9714ca284e0",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzg5YzQ2ZTBhMDZjOTcxNGNhMjg0ZTAiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5ydSIsImlhdCI6MTY2OTk4NDc2NX0.WTlFDFDzJFb_kbgolUPXNcH-1Mnj6uHwHPfTdCILTVw"
}
```

#### Login

---
* POST localhost:5000/auth/login

Body:
```json
{
   "email": "example@mail.ru",
   "password": "Aud7oefj90"
}
```

Result:
```json
{
    "id": "6389c46e0a06c9714ca284e0",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzg5YzQ2ZTBhMDZjOTcxNGNhMjg0ZTAiLCJlbWFpbCI6ImV4YW1wbGVAbWFpbC5ydSIsImlhdCI6MTY2OTk4NDc2NX0.WTlFDFDzJFb_kbgolUPXNcH-1Mnj6uHwHPfTdCILTVw"
}
```

### Notes
From now on all the requests must have the authorization header
#### Create a note

---
* POST localhost:5000/notes

Body:
```json
{
   "title": "Example title",
   "content": "Example text"
}
```

Result:
```json
{
   "title": "Example title",
   "content": "Example text",
   "isPinned": false,
   "dateCreated": "2022-12-02T09:27:18.995Z",
   "owner": {
      "_id": "6389c46e0a06c9714ca284e0",
      "name": "John",
      "email": "example@mail.ru",
      "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
      "__v": 0
   },
   "_id": "6389c4f60a06c9714ca284e7",
   "__v": 0
}
```

#### Get all user's notes

---
* GET localhost:5000/notes

Result:
```json
[
   {
      "_id": "6389f28fc67ce82469f91e04",
      "title": "Note #1",
      "content": "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.",
      "isPinned": false,
      "dateCreated": "2022-12-02T12:41:51.622Z",
      "owner": {
         "_id": "6389c46e0a06c9714ca284e0",
         "name": "Ivan",
         "email": "example@mail.ru",
         "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
         "__v": 0
      },
      "__v": 0
   },
   {
      "_id": "6389f2d1c67ce82469f91e07",
      "title": "Note #2",
      "content": "The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine and had a varicose ulcer above his right ankle, went slowly, resting several times on the way. On each landing, opposite the lift-shaft, the poster with the enormous face gazed from the wall. It was one of those pictures which are so contrived that the eyes follow you about when you move. BIG BROTHER IS WATCHING YOU, the caption beneath it ran.",
      "isPinned": false,
      "dateCreated": "2022-12-02T12:42:57.541Z",
      "owner": {
         "_id": "6389c46e0a06c9714ca284e0",
         "name": "Ivan",
         "email": "example@mail.ru",
         "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
         "__v": 0
      },
      "__v": 0
   },
   
   ...
   
]
```

#### Get a note

---
* GET localhost:5000/notes/6389c4f60a06c9714ca284e7

Result:
```json
{
   "title": "Example title",
   "content": "Example text",
   "isPinned": false,
   "dateCreated": "2022-12-02T09:27:18.995Z",
   "owner": {
      "_id": "6389c46e0a06c9714ca284e0",
      "name": "John",
      "email": "example@mail.ru",
      "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
      "__v": 0
   },
   "_id": "6389c4f60a06c9714ca284e7",
   "__v": 0
}
```

#### Update a note

---
* PUT localhost:5000/notes/6389c4f60a06c9714ca284e7
  
Body:
```json
{
   "title": "Example title",
   "content": "Changed example content"
}
```

Result:
```json
{
   "title": "Example title",
   "content": "Changed example content",
   "isPinned": false,
   "dateCreated": "2022-12-02T09:27:18.995Z",
   "owner": {
      "_id": "6389c46e0a06c9714ca284e0",
      "name": "John",
      "email": "example@mail.ru",
      "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
      "__v": 0
   },
   "_id": "6389c4f60a06c9714ca284e7",
   "__v": 0
}
```

#### Pin a note

---
* PUT localhost:5000/notes/pin/6389c4f60a06c9714ca284e7

Result:
```json
{
   "title": "Example title",
   "content": "Changed example content",
   "isPinned": true,
   "dateCreated": "2022-12-02T09:27:18.995Z",
   "owner": {
      "_id": "6389c46e0a06c9714ca284e0",
      "name": "John",
      "email": "example@mail.ru",
      "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
      "__v": 0
   },
   "_id": "6389c4f60a06c9714ca284e7",
   "__v": 0
}
```

#### Search

---
* GET localhost:5000/notes/search?query=exa

Result:
```json
[
   {
      "title": "Example title",
      "content": "Changed example content",
      "isPinned": true,
      "dateCreated": "2022-12-02T09:27:18.995Z",
      "owner": {
         "_id": "6389c46e0a06c9714ca284e0",
         "name": "John",
         "email": "example@mail.ru",
         "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
         "__v": 0
      },
      "_id": "6389c4f60a06c9714ca284e7",
      "__v": 0
   }
]
```

#### Delete a note

---
* DELETE localhost:5000/notes/6389c4f60a06c9714ca284e7

Result (return the deleted note):
```json
{
   "title": "Example title",
   "content": "Changed example content",
   "isPinned": true,
   "dateCreated": "2022-12-02T09:27:18.995Z",
   "owner": {
      "_id": "6389c46e0a06c9714ca284e0",
      "name": "John",
      "email": "example@mail.ru",
      "password": "$2b$10$.h5G.InPpo72YONM9S5JEubhTd2o4fcTnPGux7HyXh3aS.oZeVHym",
      "__v": 0
   },
   "_id": "6389c4f60a06c9714ca284e7",
   "__v": 0
}
```

## Client side available pages

### Main page 
![Main page](images/main_page.png)

### Login page
![Login page](images/login_page.png)

### Signup page
![Signup page](images/signup_page.png)

### Notes page
![Notes page](images/notes_page.png)

### Note's page
![Note's page](images/note_page.png)