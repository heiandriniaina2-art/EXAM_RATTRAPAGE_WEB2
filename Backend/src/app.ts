import express from "express";
import cors from "cors";
import pollsController from "./controller/polls.controller";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollsController);

app.listen(PORT, () => {
    console.log(`🚀 Serveur Quick Poll démarré sur http://localhost:${PORT}`);
});