// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
// @ts-ignore
import pollsController from "./controller/polls.controller";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollsController);

app.listen(PORT, () => {
    console.log(` Serveur Quick Poll démarre sur http://localhost:${PORT}`);
});