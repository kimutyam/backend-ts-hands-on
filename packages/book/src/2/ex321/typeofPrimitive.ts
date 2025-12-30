const print = (value: number | string): void => {
  if (typeof value === 'string') {
    // 1
    console.log(value.toUpperCase());
  } else {
    // 2
    console.log(value.toFixed(2));
  }
};

export { print };
