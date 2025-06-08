const printValue = (value: string | null): void => {
  // 1
  if (value === null) {
    console.log('null');
  } else {
    console.log(value);
  }
};

export { printValue };
