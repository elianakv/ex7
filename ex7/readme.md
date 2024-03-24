In this exercise, you will create additional routes for the application you finished in the previous video.

The starter code is provided in the folder ex6. In order to run the tests, the server should be running. You must run the command at the root of your repository (the folder you cloned from the class repository):

`npm i express http-errors jest nodemon supertest`

# 7-1

You should create the following routes:

- 7-1.1 "/simpleString" (GET), the response consists of the string "Hello World"
- 7-1.2 "/myAccount" (DELETE), The response text should be "Deleted"
- 7-1.3 "/newComment" (POST), the response should be "Posted"

To test, make sure you run then test:

```bash
npm run dev
npm run test
```

# 7-2

- 7-2.1 "/data" (GET), returns the JSON from the file "data.json" in the same directory.
- 7-2.2 "/data/\[id\]" (GET), returns a single JSON object of the item whose id property matches the id route parameter.

# Submission

Submit a screenshot of the tests passing.