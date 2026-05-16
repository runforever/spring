#!/bin/bash
#
# release.sh — 在 develop 分支上一键发布到 main
#
# 流程：
#   1. 清空 release/
#   2. npm run build
#   3. dist/ → release/
#   4. git worktree 操作 main（不切分支）
#   5. release/ 内容强制推送到 main
#
# 用法: bash release.sh ["提交信息"]

set -e

RELEASE_MSG="${1:-release: $(date '+%Y-%m-%d %H:%M:%S')}"
WORKTREE_DIR=".git-worktree-main"

echo "========================================"
echo "  Release: develop → main"
echo "  Message: $RELEASE_MSG"
echo "========================================"

# --- 检查分支 ---
CURRENT=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT" != "develop" ]; then
    echo "必须在 develop 分支上运行 (当前: $CURRENT)"
    exit 1
fi

# --- Step 1: 清空 release/ ---
echo ""
echo "[1/5] 清空 release/..."
mkdir -p release
rm -rf release/*

# --- Step 2: Build ---
echo ""
echo "[2/5] 编译打包..."
npm run build

# --- Step 3: dist → release ---
echo ""
echo "[3/5] 复制 dist/ → release/..."
if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
    echo "Build 失败: dist/index.html 不存在"
    exit 1
fi
cp -r dist/* release/
echo "release/ 已更新 ($(ls release/ | wc -l) 个文件)"

# --- Step 4: git worktree 操作 main ---
echo ""
echo "[4/5] 用 git worktree 推送 main..."

# 清理旧的 worktree（如果存在）
if [ -d "$WORKTREE_DIR" ]; then
    git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || rm -rf "$WORKTREE_DIR"
fi

# 配置 safe.directory（避免权限问题）
git config --global --add safe.directory "$(pwd)/$WORKTREE_DIR" 2>/dev/null || true

# 创建 main 分支的 worktree
git worktree add "$WORKTREE_DIR" main 2>/dev/null || {
    # 如果 main 分支不存在则创建
    git branch main 2>/dev/null || true
    git worktree add "$WORKTREE_DIR" main
}

# 清空 worktree 内容并复制 release/
rm -rf "${WORKTREE_DIR:?}"/*
cp -r release/* "$WORKTREE_DIR/"

# 在 worktree 中提交并推送
cd "$WORKTREE_DIR"
git add -A
git commit -m "$RELEASE_MSG" || true
git push -f origin main
cd -

# --- Step 5: 清理 worktree ---
echo ""
echo "[5/5] 清理..."
git worktree remove "$WORKTREE_DIR" --force 2>/dev/null || rm -rf "$WORKTREE_DIR"

echo ""
echo "========================================"
echo "  发布成功!"
echo "  main: $RELEASE_MSG"
echo "========================================"
