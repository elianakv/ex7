For this project, you will be creating a Node.js / Express application that mirrors some of the functionality you worked on during project 1, but on the server side. Going on the theme of content management, you will be creating a file-backed express server that handles blog posts and comments using a JSON file to store the data.

## Requirements

Posts are JSON objects with the following properties:

Posts:

```text
title: string
date: DateTime
postId: string
comments: [
{
author: string
date: DateTime 
commentId: string
content: string
}
]
content: string
```

All postIds are strings without spaces, can be numbers.

All authors are strings without spaces, representing usernames.

Posts should be stored as an array in a "posts.json" file, and every time the posts are changed, the file should be updated with the latest content. Further, for each request, the file should be read (synchronously) so that any changes made to the file will be available.

Your application should handle the following routes, each of which should be demonstrated using Postman in the video:

- GET /posts : Returns an array of posts.
- GET /posts/\[author\] : Returns an array of posts by a given author.
- GET /post/\[postId\]/ : Retrieves a single post object
- POST /post : Accepts a JSON object as the body of the request containing the author, 
- DELETE /post/\[postId\] : Removes the post from the array.
- POST /post/\[postId\]/comment : Adds a comment to the end of the post and returns an ID
- GET /post/\[postId\]/comments : Returns all comments associated with a post
- DELETE /post/\[postId\]/comment/\[id\] : Deletes the comment with the provided id

You may use classes, but are not required to do so.

Each post and comment should be assigned a unique ID (a string).

You can use any method to come up with an ID, but it should be unique. Consider a global number of posts or number of comments. Comment IDs should be unique to the post, not necessarily globally.

# Testing and Submission

You should test your application by using Postman (and demonstrate each route working in a short video). A sample HTML client may be provided that uses these routes as described.