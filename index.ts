import express from 'express'
const app = express();
const PORT: number = 3000;
app.use(express.json());



app.listen(PORT, () => {
  console.log(`App is listening to http://localhost:${PORT}`);
})