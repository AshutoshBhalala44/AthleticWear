
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProductFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = ["All", "Footwear", "Apparel"];
  const genders = ["All", "Men", "Women", "Unisex"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onFilterChange('category', category === 'All' ? '' : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Gender</h4>
          <div className="space-y-2">
            {genders.map((gender) => (
              <Button
                key={gender}
                variant={filters.gender === gender ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onFilterChange('gender', gender === 'All' ? '' : gender)}
              >
                {gender}
              </Button>
            ))}
          </div>
        </div>

        <Button variant="outline" onClick={onClearFilters} className="w-full">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
};
