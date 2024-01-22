import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, readFileSync, appendFileSync } from "fs";

export const dirName = process.env.DIR_NAME;
export const distPageDirPath = dirName !== "/index" ? dirName : "";
export const metaFileName = "meta.html";
export const htmlRenderFileName = "_render.txt";
export const stylesFileName = "_components-styles.css";

export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  return dirname(__filename);
};

export const appendCustomFile = (filePath, string) => {
  appendFileSync(filePath, string, {
    encoding: "utf-8",
  });
};

// export const addCustomHtmlFile = (dirPath) => {
//   const filePath = join(dirPath, "./index.html");

//   const fileString = readFileSync(filePath, {
//     encoding: "utf-8",
//   });

//   appendCustomFile(
//     join(
//       getDirname(import.meta.url),
//       `../dist${distPageDirPath}/${htmlRenderFileName}`
//     ),
//     fileString
//   );
// };

export const addCustomHtmlFile = (dirPath) => {
  const filePath = join(dirPath, "./index.html");

  // Check if the file exists before reading it
  if (existsSync(filePath)) {
    const fileString = readFileSync(filePath, {
      encoding: "utf-8",
    });

    appendCustomFile(
      join(
        getDirname(import.meta.url),
        `../dist${distPageDirPath}/${htmlRenderFileName}`
      ),
      fileString
    );
  } else {
    console.log(`Warning: No index.html file found in ${dirPath}`);
  }
};

export const addCustomCssFile = (dirPath) => {
  const filePath = join(dirPath, "./index.css");

  if (existsSync(filePath)) {
    const fileString = readFileSync(filePath, {
      encoding: "utf-8",
    });

    appendCustomFile(
      join(
        getDirname(import.meta.url),
        `../dist${distPageDirPath}/${stylesFileName}`
      ),
      fileString
    );
  }
};

export const getComponentPath = (componentUrl) => {
  return join(getDirname(import.meta.url), `..${componentUrl}`);
};

// export const makeComponent = (componentUrl) => {
//   const componentPath = getComponentPath(componentUrl);

//   addCustomHtmlFile(componentPath);
//   addCustomCssFile(componentPath);
// };

// ...

export const makeComponent = (componentUrl, allowedPages = []) => {
  const componentPath = getComponentPath(componentUrl);

  addCustomHtmlFile(componentPath);
  addCustomCssFile(componentPath);

  // If the current page is in the allowedPages list, add components for other pages
  if (allowedPages.includes(dirName)) {
    addComponentsForOtherPages();
  }
};

const addComponentsForOtherPages = () => {
  // Add components for other pages as needed
  makeComponent("/layout/header");
  makeComponent("/layout/nav");
  makeComponent("/layout/sidebar");
  makeComponent("/layout/backblursidebar");
  makeComponent(`/pages${dirName}`);
  makeComponent("/layout/footerlight");
};
