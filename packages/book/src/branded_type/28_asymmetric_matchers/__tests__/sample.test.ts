it('objectContaining', () => {
  expect({ name: 'Apple', price: 1000 }).toEqual(expect.objectContaining({ price: 1000 }));
});

it('arrayContaining', () => {
  expect(['Apple', 'Banana']).toEqual(expect.arrayContaining(['Banana']));
});
