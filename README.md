本地环境：
vscode: 1.77.1
nodejs: 18.15.0

## Project Setup

```sh
npm install --legacy-peer-deps
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

问题复现步骤:
1. 执行npm run dev
2. 用谷歌浏览器进入主页面，会自动弹出 Amis 编辑对话框。
3. 按F12打开浏览器的开发工具
4. 关闭对话框，此时控制台会输出错误信息
