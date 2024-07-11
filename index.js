import express from 'express';
import router from './routes/index.js';
import { prisma } from "./database/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
app.use("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// prsima connection
prisma.$connect()
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log("failed connect to database", err);
    })

app.listen(7777, () => {
  console.log(`server is running on port 7777`);
});
