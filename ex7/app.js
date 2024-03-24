import express from "express";
import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const data = JSON.parse(fs.readFileSync(resolve(__dirname, "mockData.json")));

app.use(express.json());

// TODO: Ex 7-1: Implement the routes here
// 7-1.1 GET
app.get('/simpleString', (req, res) => {
    res.send('Hello World');
});

// 7-1.2 DELETE
app.delete('/myAccount', (req, res) => {
    res.send('Deleted');
});

// 7.1-3 POST
app.post('/newComment', (req, res) => {
    res.send('Posted');
});

// TODO: Ex 6-2: You will need to use the "const data" above to access mockData.json for these two parts
// 7-2.1 DATA
app.get('/data', (req, res) => {
    res.json(data);
});

// 7-2.2 DATA/ID
app.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id);
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});
export default app;
