try {
  // eslint-disable-next-line no-throw-literal
  throw 'example';
} catch (e) {
  // exampleと出力される
  console.log('値を捕捉', e); // 1
}
