type DoorStatus = 'open' | 'close';

function handle(status: DoorStatus) {
  switch (status) {
    case 'open':
      // openの場合の処理
      break;
    case 'close':
      // closeの場合の処理
      break;
    default: {
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
    }
  }
}

export { handle };
