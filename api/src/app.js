import express from "express";
import cors from "cors";

export const app = express();

app.use(cors());          // libera o front para chamar a API
app.use(express.json());  // transforma o corpo JSON das requisições em objeto (req.body)

app.get("/", (req, res) => {
    res.json({ mensagem: "API Lumen no ar" });
});