import { createFilter } from "vite";

let buildData, env;
const indexReg = new RegExp("src/router/index.prod.js$");

export default function routerImportPlugin() {
  return {
    name: "router-import-plugin",

    // 获取 Vite 配置
    config(config, { mode }) {
      env = mode;
      buildData = config.data;
    },

    // 使用 transform 钩子来修改模块内容
    transform(code, id) {
      if (env !== "production") {
        return null;
      }
      // 使用 createFilter 来过滤需要处理的文件
      const filter = createFilter(indexReg);

      if (!filter(id)) {
        return null; // 如果不是目标文件，直接返回
      }

      let routerPath = `@/router/${buildData.module}/${buildData.name}.js`;

      // 动态添加 import 语句
      const importStr = `import routers from '${routerPath}';\n`;
      const transformedCode = importStr + code;

      return {
        code: transformedCode,
        map: null, // 如果你需要 source map，可以生成一个
      };
    },
  };
}
