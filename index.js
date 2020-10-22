const fs = require("fs");
const { INPUT_PATH, OUTPUT_PATH } = require("./constants");
const { parseCandidate } = require("./functions");

if (!fs.existsSync(`./${OUTPUT_PATH}`)) {
  fs.mkdirSync(`./${OUTPUT_PATH}`);
}

fs.readdirSync(`./${INPUT_PATH}`)
  .map((fileName) => ({ fileName, data: fs.readFileSync(`./${INPUT_PATH}/${fileName}`, { encoding: "utf-8" }) }))
  .forEach(({ fileName, data }) => {
    const candidates = Object.entries(JSON.parse(data)).flatMap(([district, parties]) =>
      Object.entries(parties).flatMap(([partyName, party]) => party.candidates.map(parseCandidate))
    );

    fs.writeFileSync(`${OUTPUT_PATH}/${fileName}`, JSON.stringify({ candidates }, null, 2), { encoding: "utf-8" });
  });
