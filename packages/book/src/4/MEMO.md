# Either

- map/flatMap/filterなどができる。
- 複数のResultを合成できる


## 論点: Nominal以外でもSpecが欲しくない？

- 単一な値は、Nominal型にしてSpecも導入してー
- 2値間のSpecの場合は、オブジェクトをNominalにしてそれを
  - なぜNominalに? -> SpecがNominalに依存しているから -> 依存させる理由はvalueだけである..
  - valueの型がたまたま一緒だったら強い型制約でなくね..?
    - いや、TransformとModifyのサブルーチンで利用するから、Nominal型に依存させる方が都合がいい

- Nominal以外のSpec使いたいじゃん?
  - それはそう。
  - どちらにせよ、TransformやModifyの実装が必要になるし、Nominalのサブルーチンでやってしまっていい。
  - Specが必要ならNominalが必要になるが大したオーバーヘッドでない。
  - またはドメイン制約を表現せずに全てvalidationやassertionに寄せるのも1つの手。オーバーヘッドが気になるならあり。

# 4章

- 公称型
  - ボイラープレートが増えるから、unique symbolをうまく抽象化する。 -> Nominal
  - バリデーションロジック
    - 失敗ならthrow Error
    - throwすると、型に現れない。クライアントでエラーハンドリングするかもしれない
    - Result型を定義する
    - バリデーションロジックとドメインロジック
    - ドメイン制約を担保しないとインスタンス化できない
    - 複数のバリデーションロジックの細かいエラー分岐の対応はできない.. -> zodがあると便利..
  - 公証型のデメリット
    - serializeしないと中身を取り出せない。(もしくはvalueを指定)
    - 本来は操作は振る舞いに含めてあげる
    - modifyとか欲しくなる -> Iso / Prism
- コンパニオンオブジェクト (TypeScript公式で明確な命名がなされていない..JavaやScalaの概念)
  - 公開するものだけをコンパニオンオブジェクトに入れる
    - 言い換え、どの振る舞いが型と同じ凝集となるか。
    - 便宜上、staticっぽいものも含める
    - 振る舞いは、pipeするために、カリー化
  - (pros) 内部関数をIDEで変更しても、コンパニオンオブジェクト内の関数(外からみたI/F)は書き変わらない
- クラス方式でも記載できる
  - 複数の値のドメイン制約を表すときなど。
  - 型制約が弱いがtypeで指定して、deserializeする方法もある

## memo

SpecErrorはライブラリ化したいのでApplicationErrorから派生しない。
Result型はkind矯正なので、Resultで引き回す指針である以上、kindで共用Union型として扱える。
外部ライブラリのエラー型でもApplicationErrorを介することでkind矯正に書き直すことができる。
