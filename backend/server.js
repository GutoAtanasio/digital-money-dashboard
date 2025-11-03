import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "db.json");

const app = express();
app.use(cors());
app.use(express.json());

// Garantir arquivo db.json existe
async function ensureDB(){
  try{
    await fs.access(DB_FILE);
  }catch(err){
    await fs.writeFile(DB_FILE, JSON.stringify({ movements: [] }, null, 2));
  }
}

async function readDB(){
  await ensureDB();
  const content = await fs.readFile(DB_FILE, "utf-8");
  return JSON.parse(content);
}

async function writeDB(data){
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.send("API Digital Money (Express + JSON local) running ✅");
});

// listar movimentações
app.get("/mov", async (req, res) => {
  const db = await readDB();
  res.json(db.movements || []);
});

// adicionar movimentação
app.post("/mov", async (req, res) => {
  const { type, amount, description } = req.body;
  if (!type || (amount === undefined || amount === null)) {
    return res.status(400).json({ message: "type and amount are required" });
  }
  const db = await readDB();
  db.movements = db.movements || [];
  const newMov = {
    id: (db.movements.length ? db.movements[db.movements.length - 1].id + 1 : 1),
    type,
    amount: Number(amount),
    description: description || "",
    createdAt: new Date().toISOString()
  };
  db.movements.push(newMov);
  await writeDB(db);
  res.status(201).json(newMov);
});

// deletar movimentação pelo id
app.delete("/mov/:id", async (req, res) => {
  const id = Number(req.params.id);
  const db = await readDB();
  const index = db.movements.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ message: "Movimentação não encontrada" });

  const deleted = db.movements.splice(index, 1);
  await writeDB(db);
  res.json({ ok: true, deleted: deleted[0] });
});


// rota rápida para limpar (útil em testes)
app.get("/mov/clear", async (req, res) => {
  const db = { movements: [] };
  await writeDB(db);
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
