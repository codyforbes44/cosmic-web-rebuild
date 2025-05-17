
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

interface ProductType {
  title: string;
  href: string;
  color: string;
  description: string;
}

interface ProductsHeaderProps {
  products: ProductType[];
  selectedProduct: ProductType;
  onTabChange: (value: string) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ products, selectedProduct, onTabChange }) => {
  return (
    <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-12">
      <CardContent className="p-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Package className="h-6 w-6 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Product Suite
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-4">
            Innovative solutions designed specifically for the transportation and logistics industry. 
            Our products help streamline operations, improve driver experiences, and boost overall efficiency.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm rounded-full px-4 py-1">
            <span className="h-2 w-2 bg-accent rounded-full"></span>
            Trusted by top transportation companies
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="mt-10 mb-4">
          <Tabs 
            value={selectedProduct.href.split('#')[1]} 
            onValueChange={onTabChange}
            className="justify-center"
          >
            <TabsList className="bg-gray-800/60 inline-flex flex-wrap gap-2 h-auto p-2 rounded-xl">
              {products.map((product) => (
                <TabsTrigger 
                  key={product.href} 
                  value={product.href.split('#')[1]}
                  className="data-[state=active]:text-white text-sm px-4 py-2 rounded-md transition-colors duration-200"
                  style={{ 
                    borderBottom: selectedProduct.href === product.href ? `2px solid ${product.color}` : 'none',
                    color: selectedProduct.href === product.href ? product.color : 'inherit'
                  }}
                >
                  {product.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-400 mt-4"
        >
          Select a product above to learn more or <a href="/get-quote" className="underline text-accent hover:text-accent/80">contact us</a> for a demo
        </motion.p>
      </CardContent>
    </Card>
  );
};

export default ProductsHeader;
