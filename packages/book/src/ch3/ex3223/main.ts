try {
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw 'example';
} catch (e) {
  // exampleと出力される
  console.log('値を捕捉', e); // 1
}
