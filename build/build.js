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
const npm_config_page = process.env.npm_config_page || "";
// 命令行报错提示
const errorLog = (error) => console.log(chalk.red(`${error}`));

//获取指定的单页面入口
const getEnterPage = () => {
  const filterArr = project.filter(
    (item) => item.chunk.toLowerCase() == npm_config_page.toLowerCase()
  );
  if (!filterArr.length) {
    errorLog("⚠️ 警告 -- 不存在此页面，请检查页面名称！");
    return;
  }

  return {
    page: npm_config_page,
    input: path.resolve(
      __dirname,
      `../src/projects/${npm_config_page}/index.html`
    ),
  };
};

//多页面入口
const getEnterPages = (p) => {
  const pages = {};
  p.forEach((ele) => {
    const htmlUrl = path.resolve(
      __dirname,
      `src/projects/${ele.chunk}/index.html`
    );
    pages[ele.chunk] = htmlUrl;
  });
  return pages;
};

const buildList = [];
if (npm_config_page) {
  const enterPage = getEnterPage();
  if (enterPage) {
    buildList.push(enterPage);
  }
} else {
  Object.keys(getEnterPages(project)).forEach((key) => {
    buildList.push({
      page: key,
      input: path.resolve(__dirname, `../src/projects/${key}/index.html`),
    });
  });
}

console.log(buildList);

const buildProject = async () => {
  try {
    const item = buildList.shift();
    const defineConfig = defineConfigHook(item);
    // 调用Vite的build API
    await build(defineConfig);
    console.log(`🚀🚀🚀 ${chalk.green.bold(`${item.page} 构建成功!`)}`);
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
} else{
  buildProject();
}
