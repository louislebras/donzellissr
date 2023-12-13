import { existsSync, readFileSync } from "fs";
import { join } from "path";
import {
  distPageDirPath,
  metaFileName,
  htmlRenderFileName,
  stylesFileName,
  getDirname,
  getComponentPath,
  makeComponent,
} from "../utils/index.mjs";

const dirName = process.env.DIR_NAME;

// Make components in order
makeComponent("/layout/header");
makeComponent("/layout/nav");
makeComponent("/layout/sidebar-desk");
makeComponent(`/pages${dirName}`);
makeComponent("/layout/footerlight");

const metaFilePath = getComponentPath(`/pages${dirName}`) + "/" + metaFileName;

const styleFilePath = join(
  getDirname(import.meta.url),
  `../dist${distPageDirPath}/${stylesFileName}`
);

const htmlRenderFilePath = join(
  getDirname(import.meta.url),
  `../dist${distPageDirPath}/${htmlRenderFileName}`
);

let serverSideRenderedHtml = readFileSync(
  join(getDirname(import.meta.url), "./base-html.html"),
  {
    encoding: "utf-8",
  }
);

if (existsSync(metaFilePath)) {
  const fileString = readFileSync(metaFilePath, {
    encoding: "utf-8",
  });

  serverSideRenderedHtml = serverSideRenderedHtml.replace(
    "<head>",
    `<head>${fileString}`
  );
}

if (existsSync(styleFilePath)) {
  const fileString = readFileSync(styleFilePath, {
    encoding: "utf-8",
  });

  serverSideRenderedHtml = serverSideRenderedHtml.replace(
    "</head>",
    `<style>${fileString}</style></head>`
  );
}

if (existsSync(htmlRenderFilePath)) {
  const fileString = readFileSync(htmlRenderFilePath, {
    encoding: "utf-8",
  });

  // Server side rendered html
  serverSideRenderedHtml = serverSideRenderedHtml.replace(
    "<slot></slot>",
    fileString
  );
}

// Base dir base path replacement
serverSideRenderedHtml = serverSideRenderedHtml.replaceAll(
  "[DIRECTORY_BASE_PATH]",
  dirName
    .split("/")
    .map(() => "..")
    .join("/")
);

// Output whole HTML to console for ssr build time processing.
console.log(serverSideRenderedHtml);
