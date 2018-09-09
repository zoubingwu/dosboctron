const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');
const { games } = require('./games.json');

const targetPath = path.resolve(__dirname, '../public/gamedata');
const files = fs.readdirSync(targetPath);

files.forEach(file => {
  const name = file.replace('.zip', '');
  if (games[name]) {
    const newName = camelCase(games[name].name.en);

    const oldPath = path.resolve(__dirname, `../public/gamedata/${file}`);
    const newPath = path.resolve(__dirname, `../public/gamedata/${newName}.zip`);
    fs.renameSync(oldPath, newPath);
  }
})
