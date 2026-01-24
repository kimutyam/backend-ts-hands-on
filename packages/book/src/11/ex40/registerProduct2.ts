import * as R from 'remeda';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

type StoreProduct = (name: string, price: number) => Promise<void>;
type RegisterProduct = (name: string, price: number) => Promise<void>;
type RegisterProductHandler = (args: {
  name: string;
  price: number;
}) => Promise<void>;

const ProductRepositoryOnMemory = {
  create: (): { store: StoreProduct } => ({
    store: async () => {
      // stub
    },
  }),
} as const;

const RegisterProductUseCase = {
  create:
    (store: StoreProduct): RegisterProduct =>
    async (name, price) => {
      await store(name, price);
    },
} as const;

const RegisterProductHandler = {
  create:
    (registerProduct: RegisterProduct): RegisterProductHandler =>
    async (args) => {
      await registerProduct(args.name, args.price);
    },
} as const;

const execute =
  <Args>(handler: (args: Args) => Promise<void>) =>
  async (args: Args): Promise<void> => {
    await handler(args);
  };

// 1
const productRepository = ProductRepositoryOnMemory.create();
const registerProduct = RegisterProductUseCase.create(productRepository.store);
const registerProductHandler = RegisterProductHandler.create(registerProduct);

// 2
const argv = yargs(hideBin(process.argv))
  .strict()
  .demandOption('name')
  .demandOption('price')
  .string('name')
  .number('price')
  .parseSync();

// 3
await R.pipe(argv, execute(registerProductHandler));
