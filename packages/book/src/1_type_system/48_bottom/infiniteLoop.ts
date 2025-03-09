const infiniteLoop = (): never => {
  while (true) {
    console.log('This will never end');
  }
};

infiniteLoop();
