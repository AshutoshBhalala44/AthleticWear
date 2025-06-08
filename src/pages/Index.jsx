
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Layout } from "@/components/Layout"
import { ProductFilters } from "@/components/ProductFilters"
import { products } from "@/data/products"
import { useCart } from "@/contexts/CartContext"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Index() {
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    category: '',
    gender: ''
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: ''
    });
  };

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.gender && product.gender !== filters.gender) return false;
    return true;
  });

  return (
    <Layout>
      <section className="px-4 py-12 bg-black text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Athletic Gear Store</h1>
        <p className="text-xl text-zinc-200">Premium athletic gear for your fitness journey.</p>
      </section>

      <section className="py-12 container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProductFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>
          
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.productId}>
                  <CardHeader>
                    <Link to={`/product/${product.productId}`}>
                      <div className="aspect-square bg-zinc-200 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-zinc-500">Product Image</span>
                      </div>
                      <h3 className="font-semibold">{product.name}</h3>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-muted-foreground">{product.category} • {product.gender}</p>
                      <p className="font-medium">${product.price}</p>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button variant="outline" onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
