# 要点

- `$type` で独自型を指定できる。Branded Typesも可能
- スキーマを利用して実装上で型を利用できる
- リポジトリのテスト
- $infer
- vitest 
  - describe(testでも可)ブロック内の直列 https://vitest.dev/api/#describe-sequential
  - vitestで直列にするには、Vitest はデフォルトでファイル単位では並列実行されますが、テスト関数 (test(...)) は直列で実行されます。 一方、test.concurrent(...) を使うと同一ファイル内でも並列になります。まず、次の点を確認してください。
- すべてのテーブルを取得してからtruncateするhelperを作る
- ロガーの設定 drizzle-orm/logger

# TODO

- 行レベルセキュリティ
- 
- seed

- snake
  - https://orm.drizzle.team/docs/sql-schema-declaration#camel-and-snake-casing

# 楽観ロック


```typescript
import { and, eq } from 'drizzle-orm';

class OptimisticLockError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OptimisticLockError';
  }
}

const updateCartWithOptimisticLock = async (
  db: Db,
  customerId: string,
  newSequenceNumber: number,
  currentVersion: number,
) => {
  const result = await db
    .update(cartTable)
    .set({
      sequenceNumber: newSequenceNumber,
      version: currentVersion + 1, // バージョン番号をインクリメント
    })
    .where(
      and(
        eq(cartTable.customerId, customerId),
        eq(cartTable.version, currentVersion), // 現在のバージョン番号を条件に追加
      ),
    );

  if (result.rowCount === 0) {
    throw new OptimisticLockError('他のトランザクションによってデータが更新されました');
  }
};

const handleCartUpdate = async (
  db: Db,
  customerId: string,
  newSequenceNumber: number,
  currentVersion: number,
) => {
  try {
    await updateCartWithOptimisticLock(db, customerId, newSequenceNumber, currentVersion);
  } catch (error) {
    if (error instanceof OptimisticLockError) {
      console.error(error.message);
      // 必要に応じて再試行やエラー通知を実装
    } else {
      throw error; // その他のエラーは再スロー
    }
  }
};
```

- 集約のバージョンを取得。
