# 🫒 backend-ts-hands-on 🫒

[![pre-commit](https://github.com/kimutyam/backend-ts-hands-on/actions/workflows/pre-commit.yml/badge.svg)](https://github.com/kimutyam/backend-ts-hands-on/actions/workflows/pre-commit.yml)
[![ec-example](https://github.com/kimutyam/backend-ts-hands-on/actions/workflows/ec-example.yml/badge.svg)](https://github.com/kimutyam/backend-ts-hands-on/actions/workflows/ec-example.yml)

『[実践TypeScriptバックエンド開発：データと関数によるドメインモデリングで堅牢性を高める](https://gihyo.jp/book/2026/978-4-297-15725-8)』（木村 彰宏 著、技術評論社）のサンプルコードです。  
モノレポ構成で、サンプルコードは`packages/ec-example`に格納しています。

ライブラリの更新やコードの改善により、最新のコードは書籍の内容と異なる場合があります。  
書籍掲載時点のコードは、[book-v1.0.0](https://github.com/kimutyam/backend-ts-hands-on/tree/book-v1.0.0)を参照してください。

初版に掲載したサンプルコードの不具合と修正情報は、[書籍版のIssue一覧](https://github.com/kimutyam/backend-ts-hands-on/issues?q=is%3Aissue%20label%3Abook-v1.0)で案内します。  
`book-v1.0`ラベルで、書籍掲載版とそのパッチ修正版（`book-v1.0.x`）に関するIssueをまとめます。  
一覧には修正済みのIssueも含まれます。

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

PostgreSQLを利用する場合は、「DBの起動とスキーマ反映」の手順でアプリ用DBを準備してください。  
テスト用DBの起動は不要です。

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

## サンプルコードの動作確認

管理用CLIで商品を登録し、ショッピング用WebサーバーのHTTP APIでカートを操作します。  
事前に開発環境をセットアップし、「DBの起動とスキーマ反映」の手順でアプリ用DBを準備してください。  
テスト用DBは使用しません。

CLIとWebサーバーは、`.env.local`の`DATABASE_URL`で同じアプリ用DBに接続します。  
`DATABASE_URL`が未設定の場合はプロセスごとのメモリ上に保存されるため、CLIで登録した商品をWebサーバーから参照できません。

### 1. CLIで商品を登録する

リポジトリのルートでビルドします。

```bash
mise run //ec-example:build
```

商品名と価格を指定して、商品登録タスクを実行します。

```bash
mise run //ec-example:register-product -- \
  --name "サンプル商品" --price 1000
```

成功すると`ProductRegistered`イベントが表示されます。  
出力の`aggregateId`が商品IDです。次のAPI操作で使用するので手元に控えてください。  
同じ商品名は重複登録できないため、再実行する場合は別の商品名を指定してください。

### 2. Webサーバーを起動する

続けて、ショッピング用Webサーバーを起動します。

```bash
mise run //ec-example:start
```

サーバーを起動したまま、別のターミナルで以降のコマンドを実行してください。  
`EC_EXAMPLE_PRODUCT_ID`はCLIで表示された商品IDに置き換えます。  
カートIDにはULIDを指定し、この例では次の値を使用します。

```bash
EC_EXAMPLE_PRODUCT_ID='CLIで表示された商品ID'
EC_EXAMPLE_CART_ID='01KAN6MY2AJFPVGQATAS6CK9XX'
```

### 3. カートにカート項目を追加する

```bash
curl -i -X POST 'http://localhost:3000/carts/items' \
  -H 'Content-Type: application/json' \
  --data "{
    \"cartId\": \"${EC_EXAMPLE_CART_ID}\",
    \"productId\": \"${EC_EXAMPLE_PRODUCT_ID}\",
    \"quantity\": 1
  }"
```

初回の追加ではHTTPステータス`201`と`CartItemAdded`イベントが返ります。  
レスポンスの`item`で商品ID・価格・数量を確認できます。

### 4. カートを閲覧する

```bash
curl -i "http://localhost:3000/carts/${EC_EXAMPLE_CART_ID}"
```

HTTPステータス`200`とカート項目の配列が返ります。  
登録した商品が含まれていることを確認してください。

### 5. カート項目を取り除く

```bash
curl -i -X DELETE "http://localhost:3000/carts/${EC_EXAMPLE_CART_ID}/items/${EC_EXAMPLE_PRODUCT_ID}"
```

成功するとHTTPステータス`204`が返り、レスポンス本文はありません。  
もう一度カートを閲覧し、対象の商品が取り除かれていることを確認してください。  
この例の商品のみを追加した場合、カート項目の配列は`[]`になります。

APIドキュメント（ `http://localhost:3000/scalar` ）からも同じ操作を確認できます。

### 6. 動作確認で使用した変数を解除する

動作確認が終わったら、変数を設定したターミナルで次のコマンドを実行してください。

```bash
unset EC_EXAMPLE_PRODUCT_ID EC_EXAMPLE_CART_ID
```

## ライセンス

このリポジトリのサンプルコードと付随するドキュメントは[MITライセンス](LICENSE)で提供します。  
このライセンスは書籍本文には適用されません。依存ライブラリには、それぞれのライセンスが適用されます。
