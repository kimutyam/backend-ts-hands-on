export class BankAccount {
  // 静的メンバー
  private static totalAccounts = 0; // 全体での口座数を管理

  static getTotalAccounts(): number {
    // 静的メソッドで口座数を取得
    return BankAccount.totalAccounts;
  }

  // インスタンスメンバー
  private balance: number; // 残高 (privateプロパティ)

  protected accountHolder: string; // 口座所有者名 (protectedプロパティ)

  public readonly accountNumber: string; // 口座番号 (publicプロパティ、readonly)

  constructor(accountHolder: string, initialBalance: number) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
    this.accountNumber = this.generateAccountNumber();

    BankAccount.totalAccounts += 1; // 口座数をインクリメント
  }

  // publicメソッド
  public deposit(amount: number): void {
    if (amount <= 0) {
      console.log('Deposit amount must be positive.');
      return;
    }
    this.balance += amount;
    console.log(`${amount} has been deposited. New balance: ${this.balance}`);
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      console.log('Withdrawal amount must be positive.');
      return;
    }
    if (amount > this.balance) {
      console.log('Insufficient funds.');
      return;
    }
    this.balance -= amount;
    console.log(`${amount} has been withdrawn. New balance: ${this.balance}`);
  }

  public checkBalance(): void {
    console.log(
      `The balance for account ${this.accountNumber} is ${this.balance}`,
    );
  }

  // protectedメソッド
  protected getAccountHolder(): string {
    return this.accountHolder;
  }

  // privateメソッド
  private generateAccountNumber(): string {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  }

  // アクセサプロパティ
  get accountInfo(): string {
    return `Number: ${this.accountNumber}, Holder: ${this.accountHolder}`;
  }
}

type BankAccountType = typeof BankAccount;
declare function BankAccountType(): BankAccountType;
export type { BankAccountType };
