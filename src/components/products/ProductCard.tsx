
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ProductPackagesDialog from '@/components/packages/ProductPackagesDialog';
import { Link } from 'react-router-dom';

interface ProductFeature {
  id: string;
  title: string;
  color: string;
  description: string;
  fullDescription: string;
  features: string[];
  image: string;
}

interface ProductCardProps {
  product: ProductFeature;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isEven = index % 2 === 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col md:flex-row gap-8 items-center"
    >
      <div className={`w-full md:w-1/2 order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 shadow-xl">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4" 
            style={{ color: product.color }}
          >
            {product.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            {product.fullDescription}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {product.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="text-green-500 h-5 w-5" />
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  View Pricing
                </Button>
              </DialogTrigger>
              <ProductPackagesDialog productId={product.id} productName={product.title} />
            </Dialog>
            <Link to="/contact#top">
              <Button variant="outline" size="lg" className="border-gray-700 hover:bg-gray-800">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className={`w-full md:w-1/2 order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-2xl opacity-30" 
            style={{ 
              background: `radial-gradient(circle, ${product.color}40 0%, transparent 70%)`,
              filter: 'blur(20px)'
            }} 
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
