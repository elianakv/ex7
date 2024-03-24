const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const postsFilePath = path.join(__dirname, 'posts.json');

// Utility functions
const readPostsFile = () => {
  const postsData = fs.readFileSync(postsFilePath);
  return JSON.parse(postsData);
};

const savePostsFile = (data) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(data, null, 2));
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Routes
app.get('/posts', (req, res) => {
  const posts = readPostsFile();
  res.json(posts);
});

app.get('/post/author/:author', (req, res) => {
  const { author } = req.params;
  const posts = readPostsFile();
  const filteredPosts = posts.filter(post => post.author === author);
  res.json(filteredPosts);
});

app.get('/post/postId/:postId', (req, res) => {
  const { postId } = req.params;
  const posts = readPostsFile();
  const post = posts.find(post => post.postId === postId);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.json(post);
});

app.post('/post', (req, res) => {
  const newPost = { ...req.body, postId: generateId(), comments: [] };
  const posts = readPostsFile();
  posts.push(newPost);
  savePostsFile(posts);
  res.status(201).send(newPost);
});

app.delete('/post/:postId', (req, res) => {
  let posts = readPostsFile();
  const { postId } = req.params;
  posts = posts.filter(post => post.postId !== postId);
  savePostsFile(posts);
  res.status(204).send();
});

app.get('/post/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const posts = readPostsFile();
  const post = posts.find(post => post.postId === postId);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.json(post.comments);
});

app.post('/post/:postId/comment', (req, res) => {
  const { postId } = req.params;
  const newComment = { ...req.body, commentId: generateId() };
  const posts = readPostsFile();
  const postIndex = posts.findIndex(post => post.postId === postId);
  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }
  posts[postIndex].comments.push(newComment);
  savePostsFile(posts);
  res.status(201).send(newComment);
});

app.delete('/post/:postId/comment/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  const posts = readPostsFile();
  const postIndex = posts.findIndex(post => post.postId === postId);
  if (postIndex === -1) {
    return res.status(404).send('Post not found');
  }
  const comments = posts[postIndex].comments;
  const filteredComments = comments.filter(comment => comment.commentId !== commentId);
  posts[postIndex].comments = filteredComments;
  savePostsFile(posts);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
