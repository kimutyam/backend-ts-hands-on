const recursiveFn = () => {
  recursiveFn(); // 無限再帰
};
recursiveFn(); // 実行時にスタックオーバーフロー

console.log('手前で例外が送出されるため、到達しない');

export { recursiveFn };
