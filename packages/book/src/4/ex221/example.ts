const step3 = () => {
  throw new Error('問題が発生しました');
};

const step2 = () => {
  step3();
};

const step1 = () => {
  step2();
};

try {
  step1();
} catch (e) {
  console.error(e); // 1
}
