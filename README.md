# YouTube 字幕提取工具

一个基于 Next.js 14 和 Tailwind CSS 构建的 YouTube 视频字幕提取工具。

## 功能特性

- 输入 YouTube 视频链接，一键提取字幕
- 支持纯文本字幕输出
- 响应式设计，适配各种屏幕尺寸
- 现代化的 Swiss Grid 设计风格
- 一键复制字幕内容

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Next.js API Routes

## 安装和运行

### 1. 安装 Node.js 和 npm

首先，你需要安装 Node.js 和 npm。你可以从 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本的 Node.js（包含 npm）。

安装完成后，你可以通过以下命令验证安装是否成功：

```bash
node -v
npm -v
```

### 2. 安装项目依赖

在项目根目录下运行以下命令安装依赖：

```bash
npm install
```

### 3. 运行开发服务器

依赖安装完成后，运行以下命令启动开发服务器：

```bash
npm run dev
```

### 4. 访问应用

开发服务器启动后，你可以在浏览器中访问 `http://localhost:3000` 来使用应用。

## 构建生产版本

如果你需要构建生产版本，可以运行以下命令：

```bash
npm run build
```

构建完成后，你可以运行以下命令启动生产服务器：

```bash
npm start
```

## 使用方法

1. 在输入框中粘贴 YouTube 视频链接（例如：https://youtu.be/dQw4w9WgXcQ）
2. 点击「提取」按钮
3. 等待字幕提取完成
4. 查看提取的字幕内容
5. （可选）点击「复制字幕」按钮复制字幕内容

## 项目结构

```
youtube-transcript-tool/
├── app/
│   ├── api/
│   │   └── transcript/
│   │       └── route.ts    # API 路由，代理第三方 API 请求
│   ├── components/         # 组件目录
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 主页面
├── public/                 # 静态资源
├── next.config.js          # Next.js 配置
├── package.json            # 项目配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json           # TypeScript 配置
└── README.md               # 项目说明文档
```
