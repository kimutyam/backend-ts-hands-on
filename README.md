# backend-ts-hands-on

## ホスト環境の環境構築

[miseをインストール](https://mise.jdx.dev/installing-mise.html)してから、リポジトリのルートで次のコマンドを実行してください。Node.jsとpnpmのバージョンは`mise.toml`で管理しています。

```bash
mise trust
mise install
mise exec -- pnpm install --frozen-lockfile
```

パッケージごとの開発用コマンドはモノレポタスクとして定義しています。`//hono-drizzle`は`packages/hono-drizzle`のパスエイリアスで、リポジトリ内のどこからでも対象を指定して実行できます。

```bash
mise run //hono-drizzle:lint
mise run //hono-drizzle:build
mise run //hono-drizzle:test
mise run //hono-drizzle:test:watch
mise run //hono-drizzle:test:db
```

`packages/hono-drizzle`内では`mise run :lint`のように実行できます。タスク一覧は`mise tasks --all`で確認できます。ツールのバージョンはルートの`mise.toml`、タスクは`packages/hono-drizzle/mise.toml`で管理し、処理本体は既存の`package.json`のスクリプトを呼び出します。

[シェル連携](https://mise.jdx.dev/cli/activate.html)を設定すると、`pnpm`を直接実行しても指定したバージョンを使用できます。例えばzshの場合は、`~/.zshrc`に次の行を追加し、シェルを再起動してください。

```bash
eval "$(mise activate zsh)"
```

## 環境変数の管理

miseはNode.jsとpnpmのバージョン管理とタスクの実行に使います。環境変数は、各コマンドがdotenvまたはNode.jsの`--env-file`で読み込みます。

`packages/hono-drizzle`では、用途に応じて次のファイルを使い分けます。

| 用途                       | ファイル       | 読み込み方法          |
| -------------------------- | -------------- | --------------------- |
| ローカル起動               | `.env.local`   | Node.jsの`--env-file` |
| ローカルDBの操作           | `.env.local`   | dotenvのCLI           |
| 通常テスト                 | `.env.test`    | dotenvのCLI           |
| DBテスト・テスト用DBの操作 | `.env.test.db` | dotenvのCLI           |

miseにも環境変数を設定する機能がありますが、このリポジトリではmiseの共通`[env]`でこれらのファイルを読み込ませません。開発用の値をシェル全体に適用すると、テストにも引き継がれるためです。dotenvは既存の環境変数を既定では上書きしないため、テスト用ファイルより開発用の値が優先される可能性があります。

環境変数はコマンド単位で読み込み、開発環境とテスト環境の混在を避けます。
