import { ProductId } from '../../domain_model/999_fully/productId.js';

interface Item {
  readonly productId: string;
  readonly quantity: number;
}

interface Cart {
  readonly items: ReadonlyArray<Item>;
}

const validateItem = (item: Item): boolean => item.quantity > 0;

const addItem =
  (targetItem: Item) =>
  (cart: Cart): Cart => {
    validateItem(targetItem);
    return { items: [...cart.items, targetItem] };
  };

const updateItem = (targetItem: Item) => (cart: Cart) => {
  cart.items.map((item) =>
    ProductId.equals(item.productId, targetItem.productId)
      ? { ...item, quantity: targetItem.quantity + item.quantity }
      : item,
  );
};

export { addItem, updateItem };
