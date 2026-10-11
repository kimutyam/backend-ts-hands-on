# backend-ts-hands-on

## ホスト環境の環境構築

[miseをインストール](https://mise.jdx.dev/installing-mise.html)してから、リポジトリのルートで次のコマンドを実行してください。Node.jsとpnpmのバージョンは`mise.toml`で管理しています。

```bash
mise trust
mise install
mise run deps:install
```

パッケージごとの開発用コマンドはモノレポタスクとして定義しています。`//ec-example`は`packages/ec-example`のパスエイリアスで、リポジトリ内のどこからでも対象を指定して実行できます。

```bash
mise run //ec-example:lint
mise run //ec-example:build
mise run //ec-example:test
mise run //ec-example:test:watch
```

`packages/ec-example`内では`mise run :lint`のように実行できます。
タスク一覧は`mise tasks --all`で確認できます。
ツールのバージョンと共通タスクはルートの`mise.toml`、パッケージごとのタスクは`packages/ec-example/mise.toml`で管理し、pnpmやDocker Composeを呼び出します。

[シェル連携](https://mise.jdx.dev/cli/activate.html)を設定すると、`pnpm`を直接実行しても指定したバージョンを使用できます。例えばzshの場合は、`~/.zshrc`に次の行を追加し、シェルを再起動してください。

```bash
eval "$(mise activate zsh)"
```

## ローカルDBの起動

Dockerを起動してから、次のコマンドを実行します。リポジトリ内のどこからでも実行できます。

```bash
mise run //ec-example:db:up
mise run //ec-example:test:db:push
mise run //ec-example:test:db
```

- `db:up`: `packages/ec-example`で`docker compose up -d`を実行
- `test:db:push`: テスト用DBへスキーマを反映
- `test:db`: テスト用DBでテストを実行

停止・削除もmiseタスクで実行できます。

```bash
mise run //ec-example:db:down
mise run //ec-example:db:clean
```

- `db:down`: コンテナとネットワークを削除し、DBのボリュームを保持
- `db:clean`: コンテナ・ネットワーク・イメージ・ボリューム・孤立したコンテナを削除（DBデータも削除）

## 環境変数の管理

miseはNode.jsとpnpmのバージョン管理とタスクの実行に使います。環境変数は、各コマンドがdotenvまたはNode.jsの`--env-file`で読み込みます。

`packages/ec-example`では、用途に応じて次のファイルを使い分けます。

| 用途                       | ファイル       | 読み込み方法          |
| -------------------------- | -------------- | --------------------- |
| ローカル起動               | `.env.local`   | Node.jsの`--env-file` |
| ローカルDBの操作           | `.env.local`   | dotenvのCLI           |
| 通常テスト                 | `.env.test`    | dotenvのCLI           |
| DBテスト・テスト用DBの操作 | `.env.test.db` | dotenvのCLI           |

miseにも環境変数を設定する機能がありますが、このリポジトリではmiseの共通`[env]`でこれらのファイルを読み込ませません。開発用の値をシェル全体に適用すると、テストにも引き継がれるためです。dotenvは既存の環境変数を既定では上書きしないため、テスト用ファイルより開発用の値が優先される可能性があります。

環境変数はコマンド単位で読み込み、開発環境とテスト環境の混在を避けます。
