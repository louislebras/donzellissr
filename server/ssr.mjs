import { execSync } from "child_process";
import { readdirSync } from "fs";
import { dirname, join, resolve } from "path";
import { getDirname } from "../utils/index.mjs";

const currentDir = getDirname(import.meta.url);
const rootDir = join(currentDir, "..");

async function* getFiles(dir) {
  const dirents = readdirSync(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
      yield res;
    }
  }
}

execSync(`rm -rf ./dist`);
execSync(`mkdir -p ./dist`);

// Ensure the 'public' folder is copied to 'dist'
execSync(`cp -r ./public ./dist`);

// Ensure the 'js' folder is copied to 'dist'
execSync(`cp -r ./js ./dist`);

// Ensure the 'css' folder is copied to 'dist'
execSync(`cp -r ./css ./dist`);

let fullDirPath = null;
for await (fullDirPath of getFiles(join(currentDir, "../pages"))) {
  const dirName = fullDirPath.replace(rootDir + "/pages", "");
  process.env.DIR_NAME = dirName;

  if (dirName !== "/index") {
    execSync(`mkdir -p ./dist/${dirName}`);
    execSync(`node ./server/html-rendering.mjs > ./dist${dirName}/index.html`);
  } else {
    execSync(`node ./server/html-rendering.mjs > ./dist${dirName}.html`);
  }
}
