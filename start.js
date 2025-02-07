import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
   windowMs: 10 * 1000,
   max: 5,
   message: { error: "Terlalu banyak permintaan, coba lagi nanti." },
   standardHeaders: true,
   legacyHeaders: false,
});

app.use(cors());
app.use(limiter);
app.use(express.static(path.join(__dirname, "html")));

app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "html", "index.html"));
});

app.listen(PORT, () => {
   console.log(`Server berjalan di port ${PORT}`);
});