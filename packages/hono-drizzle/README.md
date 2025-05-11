# README

dotenv/direnvを利用して環境変数を管理します。

```schell
cp .env.example .env.dev
cp .envrc.example .envrc
```

```zsh
eval "$(direnv hook zsh)"
```

# エッセンス

- (コラム) drizzle-kitでcommonjs


# TODO

- generate / migrate / push のワークロード
- ショッピングカートのロジックを移植
- migrate で insert
  - https://orm.drizzle.team/docs/kit-custom-migrations
- RLS
  - https://orm.drizzle.team/docs/rls
- drizzle/metaを環境毎に切り替える

# MEMO

- packages/bookの構成を模倣した
- tsconfig.drizzle-kit.jsonのワークアラウンド
  - https://github.com/drizzle-team/drizzle-orm/issues/1561
