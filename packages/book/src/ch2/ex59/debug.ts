class Example {
  // private static プロパティ
  private static secretCount = 0;

  static publicCount = 0; // public 静的プロパティ

  // private static メソッド
  private static incrementSecretCount(): void {
    // eslint-disable-next-line no-plusplus
    Example.secretCount++;
    console.log(`Secret count incremented. Current secretCount: ${Example.secretCount}`);
  }

  // public static メソッド
  static incrementPublicCount(): void {
    // eslint-disable-next-line no-plusplus
    Example.publicCount++;
    console.log(`Public count incremented. Current publicCount: ${Example.publicCount}`);

    // private static メソッドをクラス内で使用
    Example.incrementSecretCount();
  }

  // インスタンスの private プロパティ
  private instanceValue: number;

  constructor(value: number) {
    this.instanceValue = value;

    // private インスタンスプロパティをクラス内で使用
    console.log(`Instance created with value: ${this.instanceValue}`);
  }

  // public インスタンスメソッド
  public showInstanceValue(): void {
    console.log(`Instance value is: ${this.instanceValue}`);

    // private インスタンスメソッドをクラス内で使用
    this.updateInstanceValue(this.instanceValue * 2);
    console.log(`Updated instance value is: ${this.instanceValue}`);
  }

  // private インスタンスメソッド
  private updateInstanceValue(newValue: number): void {
    this.instanceValue = newValue;
  }
}

type ExampleType = typeof Example;

type ExampleType1 = {
  new (value: number): Example; // コンストラクタシグネチャ
  publicCount: number; // public 静的プロパティのみ含む
  incrementPublicCount: () => void; // public 静的メソッドのみ含む
};

type X = ExampleType extends ExampleType1 ? true : false;
type Y = ExampleType1 extends ExampleType ? true : false;

// Output:
// Instance created with value: 10
// Instance value is: 10
// Updated instance value is: 20

// privateメンバーにはクラス外部からアクセスできない
// exampleInstance.instanceValue; // エラー
// Example.secretCount;           // エラー
// Example.incrementSecretCount(); // エラー

export type { X, Y };
