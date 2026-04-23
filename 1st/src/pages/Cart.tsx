import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlices';
import { useToast } from '../components/ToastContainer';
import { useState } from 'react';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { addToast } = useToast();
  const { items, totalPrice } = useAppSelector(state => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
    addToast('Item removed from cart', 'info');
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      addToast('Cart is empty', 'error');
      return;
    }
    
    setOrderPlaced(true);
    addToast('Order placed successfully!', 'success');
    
    setTimeout(() => {
      dispatch(clearCart());
      setOrderPlaced(false);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed!</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Product</th>
                    <th className="px-6 py-3 text-center">Price</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-center">Total</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="font-medium line-clamp-2">{item.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">₹{item.price}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  Total: ₹{totalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Continue Shopping
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
