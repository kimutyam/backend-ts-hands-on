# 🫒 backend-ts-hands-on 🫒

『[実践TypeScriptバックエンド開発：データと関数によるドメインモデリングで堅牢性を高める](https://gihyo.jp/book/2026/978-4-297-15725-8)』（木村 彰宏 著、技術評論社）のサンプルコードです。
モノレポ構成で、サンプルコードは`packages/ec-example`に格納しています。

ライブラリの更新やコードの改善により、最新のコードは書籍の内容と異なる場合があります。
書籍掲載時点のコードは、[book-v1.0.0](https://github.com/kimutyam/backend-ts-hands-on/tree/book-v1.0.0)を参照してください。

## 開発環境のセットアップ

Node.jsとpnpmのバージョン管理、および開発用タスクの実行にはmiseを使用します。
[miseをインストール](https://mise.jdx.dev/installing-mise.html)してから、リポジトリのルートで次のコマンドを実行してください。

```bash
mise trust
mise install
mise run deps:install
```

ツールのバージョンと共通タスクはルートの`mise.toml`、パッケージごとのタスクは`packages/ec-example/mise.toml`で管理しています。

### 開発用コマンド

`//ec-example`は`packages/ec-example`のパスエイリアスです。
次のタスクは、リポジトリ内のどこからでも実行できます。

```bash
# lint・formatのチェック
mise run //ec-example:lint
mise run //ec-example:format

# 通常テストを1回実行
mise run //ec-example:test

# ファイルの変更を監視してテストを実行
mise run //ec-example:test:watch
```

`packages/ec-example`内では、`mise run :lint`のようにパッケージ名を省略できます。
タスク一覧は`mise tasks --all`で確認できます。

### シェル連携（任意）

[miseのシェル連携](https://mise.jdx.dev/cli/activate.html)を設定すると、`pnpm`を直接実行するときにも指定したバージョンを使用できます。
zshの場合は、`~/.zshrc`に次の行を追加し、シェルを再起動してください。

```bash
eval "$(mise activate zsh)"
```

### DBの起動とスキーマ反映

Dockerを起動してから、次のコマンドを実行してください。
アプリ用DB（ポート5432）とテスト用DB（ポート5433）は、それぞれ独立して起動・スキーマ反映できます。

アプリ用DBを準備する場合:

```bash
# アプリ用DBだけを起動
mise run //ec-example:db:up

# アプリ用DBにスキーマを反映（.env.localを使用）
mise run //ec-example:db:push
```

DBテストを実行する場合:

```bash
# テスト用DBだけを起動
mise run //ec-example:test:db:up

# テスト用DBにスキーマを反映（.env.test.dbを使用）
mise run //ec-example:test:db:push

# DBテストを実行
mise run //ec-example:test:db
```

停止・削除には、次のタスクを使用します。これらはアプリ用・テスト用の両方が対象です。

```bash
# コンテナとネットワークを削除（DBデータは保持）
mise run //ec-example:db:down

# コンテナ・ネットワーク・イメージ・ボリューム・孤立したコンテナを削除（DBデータも削除）
mise run //ec-example:db:clean
```

### Webサーバーの起動

PostgreSQLを利用する場合は、「DBの起動とスキーマ反映」の手順でアプリ用DBを準備してください。テスト用DBの起動は不要です。

次のコマンドでビルドし、Webサーバーを起動します。

```bash
mise run //ec-example:build
mise run //ec-example:start
```

起動後は `http://localhost:3000/scalar` でAPIドキュメントを確認できます。

### 環境変数の管理

環境変数は、各コマンドがdotenv本体のCLI（`dotenv run -f <ファイル> -- <コマンド>`）で読み込みます。
`packages/ec-example`配下で、用途に応じて次のファイルを使い分けます。

| 用途                       | ファイル       |
| -------------------------- | -------------- |
| Webサーバーの起動          | `.env.local`   |
| アプリ用DBの操作           | `.env.local`   |
| 通常テスト                 | `.env.test`    |
| DBテスト・テスト用DBの操作 | `.env.test.db` |

miseの共通`[env]`では、これらのファイルを読み込ませません。
開発用の環境変数をシェル全体に適用すると、テストにも引き継がれます。
dotenvは既存の環境変数を既定では上書きしないため、開発用の値がテスト用ファイルの値より優先される可能性があります。
環境変数をコマンド単位で読み込み、開発環境とテスト環境の混在を避けます。

## ライセンス

このリポジトリのサンプルコードと付随するドキュメントは[MITライセンス](LICENSE)で提供します。

このライセンスは書籍本文には適用されません。依存ライブラリには、それぞれのライセンスが適用されます。
