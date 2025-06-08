
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/Layout"
import { useParams } from "react-router-dom"
import { products, isAvailable } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { useState } from "react"

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.productId === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    return (
      <Layout>
        <div className="container py-12">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({ ...product, selectedSize });
    } else {
      addToCart(product);
    }
  };

  const productAvailable = isAvailable(product.productId);

  return (
    <Layout>
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-zinc-200 rounded-lg flex items-center justify-center">
            <span className="text-zinc-500">Product Image</span>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold mt-2">${product.price}</p>
              <p className="text-muted-foreground mt-2">{product.category} • {product.gender}</p>
              <div className="mt-2">
                {productAvailable ? (
                  <p className="text-sm text-green-600">
                    {product.stock} in stock
                    {product.stock <= 5 && product.stock > 0 && (
                      <span className="text-orange-600 ml-2">• Only {product.stock} left!</span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-red-600 font-medium">Out of Stock</p>
                )}
              </div>
            </div>
            
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Size</h3>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      disabled={!productAvailable}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleAddToCart}
              disabled={
                !productAvailable || 
                (product.sizes && product.sizes.length > 0 && !selectedSize)
              }
            >
              {!productAvailable 
                ? "Out of Stock" 
                : `Add to Cart ${selectedSize ? `(Size: ${selectedSize})` : ''}`
              }
            </Button>
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
