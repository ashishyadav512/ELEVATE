import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Simulate placing an order
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. Your order is being processed.",
    });
    
    // Clear the cart after successful order
    clearCart();
  };

  return (
    <section className="pt-32 pb-24 bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-100">Checkout</h1>
        
        {cart.length === 0 ? (
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some products to your cart to checkout.</p>
            <Link href="/shop">
              <a className="inline-block py-3 px-6 bg-cyan-400 text-gray-900 font-bold rounded-md hover:bg-cyan-300 transition-colors">
                Continue Shopping
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-100">Order Summary</h2>
                
                <div className="divide-y divide-gray-800">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="py-4 flex gap-4">
                      {item.product.imageUrls && item.product.imageUrls.length > 0 && (
                        <img 
                          src={item.product.imageUrls[0]} 
                          alt={item.product.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-100">{item.product.name}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-400 mt-1">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span>Color: {item.color}</span>}
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan-400 font-medium">
                          ${(item.product.salePrice || item.product.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6 text-gray-100">Payment Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-gray-100">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-gray-100">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax</span>
                    <span className="text-gray-100">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between font-bold">
                    <span className="text-gray-100">Total</span>
                    <span className="text-cyan-400">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                
                <motion.button 
                  className="w-full py-3 bg-cyan-400 text-gray-900 font-bold uppercase tracking-wider rounded-md hover:bg-cyan-300 transition-all duration-300"
                  onClick={handlePlaceOrder}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Place Order
                </motion.button>
                
                <Link href="/shop">
                  <a className="block text-center mt-4 text-gray-400 hover:text-cyan-400 transition-colors">
                    Continue Shopping
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;