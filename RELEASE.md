# 工具宇宙 — 发布流程文档

本文档定义了从开发分支到生产环境（main 分支）的完整发布流程。

## 仓库信息

- **仓库地址**: `git@github.com:runforever/spring.git`
- **开发分支**: `develop` — 存放源代码，用于开发
- **发布分支**: `main` — 存放编译打包后的 `dist/` 内容，用于 GitHub Pages 部署

## 发布流程（3步走）

### Step 1: 在 develop 分支提交代码

**前提条件**: 当前在 develop 分支，且 SSH 密钥已配置（`~/.ssh/id_ed25519_github`）。

```bash
# 1. 切换到 develop 分支
git checkout develop

# 2. 确保代码是最新状态
git pull origin develop 2>/dev/null || true

# 3. 把最新的源代码复制到工作目录
# （假设源代码在 /mnt/agents/output/app/ 目录）
rm -rf src/ public/ *.json *.ts *.js *.html .gitignore
cp -r /mnt/agents/output/app/. .

# 4. 清理不需要提交的目录
rm -rf node_modules/ dist/ package-lock.json/

# 5. 提交修改
git add -A
git commit -m "feat: xxx功能描述"

# 6. 推送到远端 develop 分支
git push origin develop
```

### Step 2: 在 develop 分支编译打包

```bash
# 1. 确保在 develop 分支
git checkout develop

# 2. 安装依赖
npm install --legacy-peer-deps

# 3. 编译打包
npm run build

# 4. 确认 dist/ 目录已生成
ls dist/
# 应该包含: index.html, assets/ 目录, 以及图片文件
```

### Step 3: dist 内容覆盖 main 分支

**核心思路**: 把 `dist/` 文件夹的内容作为 main 分支的全部内容，强制推送覆盖。

```bash
# 1. 把 dist 移到临时目录（注意不要在当前仓库内）
mv dist /tmp/spring-dist-release

# 2. 切换到 main 分支
git checkout main

# 3. 删除 main 分支所有文件
git rm -rf .
git clean -fdx

# 4. 把 dist 内容复制进来
cp -r /tmp/spring-dist-release/. .

# 5. 添加所有文件并提交
git add -A
git commit -m "release: 版本描述"

# 6. 强制推送到远端 main 分支
git push -f origin main
```

## SSH 配置（一次性）

如果 SSH 推送失败，检查以下配置：

```bash
# 1. 确认 SSH 密钥存在
ls ~/.ssh/id_ed25519_github

# 2. SSH 配置文件
cat > ~/.ssh/config << 'EOF'
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519_github
    IdentitiesOnly yes
    StrictHostKeyChecking accept-new
EOF
chmod 600 ~/.ssh/config

# 3. 测试连接
ssh -T git@github.com
# 期望输出: Hi runforever! You've successfully authenticated...
```

## 项目结构

### develop 分支（源代码）

```
├── package.json          # 项目依赖配置
├── vite.config.ts        # Vite 构建配置
├── tsconfig.json         # TypeScript 配置
├── index.html            # 入口 HTML
├── .gitignore            # Git 忽略规则
├── public/               # 静态资源（图片）
│   ├── galaxy-pixel.jpg
│   ├── blackhole.png
│   ├── wandering-earth.png
│   └── rocket-pixel.png
└── src/
    ├── main.tsx          # 应用入口
    ├── App.tsx           # 路由配置
    ├── App.css           # 全局样式
    ├── index.css         # Tailwind 入口
    ├── data/tools.ts     # 工具卡片数据
    ├── hooks/            # 自定义 Hooks
    ├── components/       # 公共组件
    ├── sections/         # 页面区块
    └── pages/            # 页面组件
```

### main 分支（打包产物）

```
├── index.html              # SPA 入口
├── assets/
│   ├── index-xxx.js        # 打包后的 JS (~170KB)
│   ├── index-xxx.css       # 打包后的 CSS (~3KB)
│   └── ...
├── galaxy-pixel.jpg        # 静态图片
├── blackhole.png
├── wandering-earth.png
└── rocket-pixel.png
```

## 注意事项

1. **永远不要直接在 main 分支修改代码**。main 只存放 `npm run build` 的产物。
2. **develop 分支不提交 `node_modules/` 和 `dist/`**。已在 `.gitignore` 中排除。
3. **图片素材放在 `public/` 目录下**。Vite 构建时会自动复制到 `dist/`。
4. **force push 是安全的**。main 分支只用于发布，不保留历史版本。
5. **如果 npm install 失败**，尝试使用 `--legacy-peer-deps` 参数。

## 常见问题

### Q: git push 提示 "Permission denied"
A: SSH 密钥未添加到 GitHub。复制 `~/.ssh/id_ed25519_github.pub` 的内容到 GitHub Settings → SSH and GPG keys → New SSH key。

### Q: npm run build 报错
A: 检查 `node_modules/` 是否存在。如果不存在，先执行 `npm install --legacy-peer-deps`。

### Q: main 分支 push 后网站没更新
A: GitHub Pages 部署需要时间（通常 1-2 分钟）。在仓库 Settings → Pages 中查看部署状态。

### Q: 如何回滚发布？
A: 切换到上一个正常的 develop commit，重新执行 Step 2 和 Step 3。
