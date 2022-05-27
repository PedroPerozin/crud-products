export interface IGenerated<T> {
  list?: T[];
  item?: T;
}
// // funcao que gera uma lista de produtos

// const productGenerate = (count) => {
//   const product = new ProductEntity();
//   product.name = 'Product';
//   product.price = 50;
//   product.userId = 'ea8550f5-9dd2-4975-baf9-df833042960e';
//   if (count > 1) {
//     const products = Array.from({length: count}, productGenerate);
//     return products;
//   } else {
//     return product;
//   }
// };

export class BaseGenerator {
  static generator<T>(chamada: () => T, count = 1): IGenerated<T> {
    if (count > 1) {
      const list: T[] = Array.from({ length: count }, chamada);
      return { list };
    } else {
      const item: T = chamada();
      return { item };
    }
  }
}
