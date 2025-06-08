
import { ProductStore } from '../stores/ProductStore.js';

// Export products from the centralized store
export const products = ProductStore.getAllProducts();

// Inventory management functions now use the ProductStore
export const checkStock = (productId, quantity = 1) => {
  return ProductStore.checkProductStock(productId, quantity);
};

export const updateStock = (productId, quantity) => {
  ProductStore.updateProductStock(productId, quantity);
};

export const isAvailable = (productId) => {
  return ProductStore.isProductAvailable(productId);
};
