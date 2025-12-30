const infiniteLoop = (): never => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('This will never end');
  }
};

infiniteLoop();
