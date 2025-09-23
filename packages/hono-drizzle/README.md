# README

# エッセンス

- (コラム) drizzle-kitでcommonjs

# TODO

- generate / migrate / push のワークロード
- ショッピングカートのロジックを移植
  - ch7/ex2/__tests__/extractCartItems.di.test.ts (移植後にtyped-injectの依存を消す)
  - chx
- migrate で insert
  - https://orm.drizzle.team/docs/kit-custom-migrations
- RLS
  - https://orm.drizzle.team/docs/rls
- drizzle/metaを環境毎に切り替える

# MEMO

- packages/bookの構成を模倣した
- tsconfig.drizzle-kit.jsonのワークアラウンド
  - https://github.com/drizzle-team/drizzle-orm/issues/1561
