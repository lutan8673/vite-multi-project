import { build } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk"; // console高亮
import { defineConfigHook } from "../vite.config.js";
import project from "../scripts/multiPages.json" assert { type: "json" }; // 引入多页面配置文件

// 获取当前文件的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取npm run dev后缀 配置的环境变量
const npm_config_module = process.env.npm_config_module || "";
const npm_config_name = process.env.npm_config_name || "";
// 命令行报错提示
const errorLog = (error) => console.log(chalk.red(`${error}`));

//获取指定的单页面入口
const getEnterPage = () => {
  const findBid = project.find(
    (item) => item.bid.toLowerCase() == npm_config_name.toLowerCase()
  );
  if (!findBid) {
    errorLog("⚠️ 警告 -- 不存在此页面，请检查页面名称！");
    return;
  }

  return {
    module: findBid.module,
    chunk: findBid.chunk,
    bid: findBid.bid,
    bidDir: findBid.bidDir,
    input: path.resolve(
      __dirname,
      `../src/projects/${findBid.bidDir}/index.html`
    )
  };
};

//模块入口
const getModuleEnterPage = () => {
  const findModuleList = project.filter(
    (item) => item.module == npm_config_module
  ).map((item) => {
    return {
      module: item.module,
      chunk: item.chunk,
      bid: item.bid,
      bidDir: item.bidDir,
      input: path.resolve(
        __dirname,
        `../src/projects/${item.bidDir}/index.html`
      ),
    };
  });
  if (findModuleList.length == 0) {
    errorLog("⚠️ 警告 -- 不存在此模块，请检查模块名称！");
    return [];
  }

  return findModuleList;
}

//多页面入口
const getAllEnterPages = (p) => {
  const findList = project.map((item) => {
    return {
      module: item.module,
      chunk: item.chunk,
      bid: item.bid,
      bidDir: item.bidDir,
      input: path.resolve(
        __dirname,
        `../src/projects/${item.bidDir}/index.html`
      ),
    };
  })

  return findList;
};

const buildList = [];
if (npm_config_name) {
  const enterPage = getEnterPage();
  if (enterPage) {
    buildList.push(enterPage);
  }
} else if (npm_config_module) {
  const moduleList = getModuleEnterPage();
  buildList.push(...moduleList);
} else {
  const allPages = getAllEnterPages();
  buildList.push(...allPages);
}

console.log(buildList);

const buildProject = async () => {
  try {
    const item = buildList.shift();
    const defineConfig = defineConfigHook(item);
    // 调用Vite的build API
    await build(defineConfig);
    console.log(`🚀🚀🚀 ${chalk.green.bold(`${item.bid} 构建成功!`)}`);
    if (buildList.length) {
      buildProject();
    }
  } catch (err) {
    errorLog(`⚠️ Build failed: ${err}！`);
  }
};

if (!buildList.length) {
  errorLog(
    "⚠️ 警告 -- 请在命令行后以 `--page=页面名称` 格式指定正确的页面名称！"
  );
} else {
  buildProject();
}
