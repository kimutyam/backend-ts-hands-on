// 型と値の両方を利用します
import { Period } from 'ch2/ex20/period.js';

const period: Period = Period.buildAt(new Date(2024, 0, 1, 0, 0, 0), 30);

console.log(period);
