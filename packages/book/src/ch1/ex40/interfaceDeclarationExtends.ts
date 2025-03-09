interface Clothes {
  size: number;
}

interface Clothes {
  color: string;
}

{
  const clothes: Clothes = {
    size: 10,
    color: 'red',
  };

  console.log(clothes);
}

export type { Clothes };
