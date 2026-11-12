import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import processosRoutes from "./routes/processos.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensagem: "API Lumen no ar" });
});

app.use("/processos", processosRoutes);

// Qualquer rota não mapeada
app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});

app.use(errorHandler);
