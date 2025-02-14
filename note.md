## 1 创建步骤
  - ### 1. 创建命令
  ```javascript
  npm run new:page
  ```
  - ### 2. 输入模块
    - #### 创建文件夹
      - 模块/需求？/业务
      - loan:模块名 houseLoan:需求名 houseLoan:业务名
      - loan:模块名 cloudLoan:需求名 cloudLoanView:业务名
      - loan/houseLoan:房贷
      - loan/cloudLoan/cloudLoanView:云贷

## 2 打包步骤
  - ### 1. 打包命令
  > 打包单个包
  ```javascript
  npm run build --page=houseLoan
  ```
  > 打包模块
  ```javascript
  npm run build --modul=cloudLoan
  ```
  > 打包所有
  ```javascript
  npm run build
  ```

  - ### 2. 运行命令
