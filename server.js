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
      const atlas = path.join(assetsDir, `${name}.atlas`);
      if (fs.existsSync(atlas)) {
        result.push({
          name,
          skeleton: `assets/${name}.json`,
          atlas: `assets/${name}.atlas`,
        });
      }
    }
  });

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
