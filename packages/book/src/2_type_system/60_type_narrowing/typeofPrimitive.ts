const print = (value: number | string): void => {
  if (typeof value === 'string') {
    // 変数valueの型をstring型に絞り込みます
    console.log(value.toUpperCase());
  } else {
    // 制御フロー解析によって、変数valueの型はnumber型に推論されます
    console.log(value.toFixed(2));
  }
};

export { print };
