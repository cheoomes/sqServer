import cors from 'cors';
import express from 'express'


const app = express();
app.use(
  cors({
    origin: 'http://localhost:3001/',
    methods: ['GET', 'POST'],
  })
);	



export default async function handler(req, res) {

    // Your route logic goes here
    res.status(200).json({ message: 'Hello from API route!' });
}


app.listen(3000);