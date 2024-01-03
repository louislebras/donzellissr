import { execSync } from "child_process";
import { readdirSync, mkdirSync } from "fs";
import { resolve, join } from "path";
import { existsSync, readFileSync } from "fs";
import { getDirname } from "../utils/index.mjs";

const currentDir = getDirname(import.meta.url);
const rootDir = join(currentDir, "..");

// Create necessary directories in the dist folder
const distDirs = ["public", "js", "css"];
distDirs.forEach((dir) => {
  const distDirPath = join(rootDir, "dist", dir);
  if (!existsSync(distDirPath)) {
    mkdirSync(distDirPath, { recursive: true });
  }
});

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
let success = true; // Variable pour suivre l'état du traitement

for await (fullDirPath of getFiles(join(currentDir, "../pages"))) {
  const dirName = fullDirPath.replace(rootDir + "/pages", "");
  process.env.DIR_NAME = dirName;

  if (dirName !== "/index") {
    try {
      execSync(`mkdir -p ./dist/${dirName}`);
      execSync(
        `node ./server/html-rendering.mjs > ./dist${dirName}/index.html`
      );
    } catch (error) {
      console.error(`Error processing ${dirName}:`, error.message);
      success = false;
    }
  } else {
    try {
      execSync(`node ./server/html-rendering.mjs > ./dist${dirName}.html`);
    } catch (error) {
      console.error(`Error processing ${dirName}:`, error.message);
      success = false;
    }
  }
}

// if (success) {
//   console.log("SSR build completed successfully.");
// } else {
//   console.error("SSR build completed with errors.");
//   process.exit(1); // Indiquer un code d'erreur pour indiquer un échec dans le processus
// }
