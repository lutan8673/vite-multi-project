import fs from "fs";
import { build } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import zipPack from "vite-plugin-zip-pack";

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取npm run dev后缀 配置的环境变量
const module = process.env.npm_config_module || "";
const name = process.env.npm_config_name || "";
// 命令行报错提示
const errorLog = (error) => console.log(chalk.red(`${error}`));
// 打包提示
const buildEndFn = (name) => {
  console.log(`🚀🚀🚀 ${chalk.green.bold(`${name} 构建成功!`)}`);
};

// 递归获取指定目录及其所有子目录下的所有文件名称
const getFilesInDirectory = (dirPath, module = "", name = "") => {
  let results = [];
  let list = fs.readdirSync(dirPath);
  if (name) {
    list = list.filter((file) => file.includes(name));
  }
  if (!module) {
    list = list.filter(
      (file) => !["index.prod.js", "index.dev.js"].includes(file)
    );
  }

  list.forEach((file) => {
    const filePath = path.resolve(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      let moduleStr = module ? `${module}/${file}` : file;
      // 递归读取子目录
      results = results.concat(getFilesInDirectory(filePath, moduleStr, null));
    } else {
      results.push({
        module: module,
        name: file.replace(".js", ""),
      });
    }
  });

  return results;
};

const buildList = [];
// 目录路径
let directoryPath = "",
  files = [];
if (module) {
  directoryPath = path.resolve(__dirname, `../src/router/${module}`);
} else {
  directoryPath = path.resolve(__dirname, "../src/router");
}
// 获取文件名称列表
files = getFilesInDirectory(directoryPath, module, name);

buildList.push(...files);
console.log("文件列表:", buildList);

const runBuild = async function () {
  try {
    const item = buildList.shift();
    await build({
      data: {
        module: item.module,
        name: item.name,
      },
      root: "./",
      plugins: [
        zipPack({
          inDir: `dist/${item.name}`, // 要打包的文件夹
          outDir: "package", // 打包好输出到该目录下
          outFileName: `${item.name}.zip`, // 打包好的文件名
          pathPrefix: `lutan.com.cn`, // 打包好的文件路径前缀
        }),
      ],
      build: {
        outDir: `dist/${item.name}`,
        rollupOptions: {
          buildEnd: buildEndFn(item.name),
        },
      },
    });
    if (buildList.length) {
      runBuild();
    }
  } catch (err) {
    errorLog(`⚠️ Build failed: ${err}！`);
  }
};

if (!buildList.length) {
  errorLog(
    "⚠️ 警告 -- 请在命令行后以 `--module=页面模块，--page=页面名称` 格式指定正确的页面名称！"
  );
} else {
  runBuild();
}
