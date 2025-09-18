const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serviamo i file statici (index.html + assets)
app.use(express.static(__dirname));

// Endpoint che restituisce lista spine
app.get("/list", (req, res) => {
  const assetsDir = path.join(__dirname, "assets");
  const files = fs.readdirSync(assetsDir);

  const result = [];

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const name = path.basename(file, ".json");
      const name2 = estraiPrimaDiUltimoTrattino(name);
      const atlas = path.join(assetsDir, `${name2}.atlas`);
      if (fs.existsSync(atlas)) {
        result.push({
          name,
          skeleton: `assets/${name}.json`,
          atlas: `assets/${name2}.atlas`,
        });
      }
    }
  });

  res.json(result);
});
function estraiPrimaDiUltimoTrattino(str) {
  // Trova la posizione dell'ultimo trattino
  const ultimoTrattino = str.lastIndexOf('-');
  if (ultimoTrattino === -1) return str; // Nessun trattino trovato
  // Prendi solo la parte prima dell'ultimo trattino
  return str.substring(0, ultimoTrattino);
}

app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
