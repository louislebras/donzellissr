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

const allowedPages = ["/feed"];
// Make components in order
// makeComponent("/layout/loader");
// makeComponent("/layout/noise");
makeComponent("/layout/header-desk");
makeComponent("/layout/header-mobile");
makeComponent("/layout/sidebar-desk");
makeComponent("/layout/sidebar-mobile");
makeComponent("/layout/whatsappbutton");
makeComponent(`/pages${dirName}`);
if (allowedPages.includes(dirName)) {
  makeComponent("/layout/product-table");
}
makeComponent("/layout/footer");

const metaFilePath = getComponentPath(`/pages${dirName}`) + "/" + metaFileName;

const htmlRenderFilePath = join(
  getDirname(import.meta.url),
  `../dist${distPageDirPath}/${htmlRenderFileName}`
);

const styleFilePath = join(
  getDirname(import.meta.url),
  `../dist${distPageDirPath}/${stylesFileName}`
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
