import { Text, ActionIcon, Image, Box, NumberInput, Button } from '@mantine/core';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateQuantity, removeFromCart, clearCart } from '../../store/slices/cartSlice';

export function CartPopup() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cart.items.length === 0) {
    return (
      <Box
        w={301}
        h={226.71}
        p={24}
        style={{
          borderRadius: 16,
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24
        }}
      >
        <Image
          src="/src/assets/cart_empty.png"
          width={117.9}
          height={106.7}
          alt="Empty cart"
          style={{
            display: 'block',
            margin: '0 auto'
          }}
        />
        <Text
          size="sm"
          c="dimmed"
          style={{
            textAlign: 'center',
            width: '100%'
          }}
        >
          Your cart is empty!
        </Text>
      </Box>
    );
  }

  return (
    <Box 
      w={444} 
      p={24}
      style={{
        backgroundColor: 'white',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text fw={600} size="lg">Корзина ({cart.totalItems})</Text>
        <Button 
          variant="subtle" 
          color="red" 
          size="xs"
          leftSection={<IconTrash size={14} />}
          onClick={handleClearCart}
        >
          Очистить корзину
        </Button>
      </Box>
      
      {cart.items.map((item, index) => (
        <Box key={item.product.id} style={{ marginBottom: 16 }}>
          <Box style={{ display: 'flex', height: '100%' }}>
            <Image
              src={item.product.image}
              width={64}
              height={64}
              radius={6}
              alt={item.product.name}
              style={{ marginRight: 12 }}
            />

            <Box style={{ flex: 1 }}>
              <Box style={{ marginBottom: 4 }}>
                <Text size="sm" fw={500} style={{ lineHeight: '28px' }}>
                  {item.product.name}
                </Text>
              </Box>

              <Box style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Text size="sm" fw={600}>
                  {item.product.price} $
                </Text>

                <Box style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <ActionIcon
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: '#F1F3F5',
                      border: '1px solid #DEE2E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>

                  <NumberInput
                    value={item.quantity}
                    onChange={(value) => handleUpdateQuantity(item.product.id, Number(value))}
                    min={1}
                    max={99}
                    hideControls
                    styles={{
                      root: { width: 40 },
                      input: {
                        width: 40,
                        height: 30,
                        textAlign: 'center',
                        padding: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                    }}
                  />

                  <ActionIcon
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: '#F1F3F5',
                      border: '1px solid #DEE2E6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      cursor: 'pointer',
                    }}
                  >
                    <IconPlus size={14} />
                  </ActionIcon>
                  
                  <ActionIcon
                    onClick={() => handleRemoveFromCart(item.product.id)}
                    color="red"
                    variant="subtle"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      marginLeft: 8,
                    }}
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Box>
              </Box>
              
              <Text size="sm" c="dimmed" mt={4}>
                Итого: {(item.product.price * item.quantity).toFixed(2)} $
              </Text>
            </Box>
          </Box>

          {index < cart.items.length - 1 && (
            <Box
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#E9ECEF',
                marginTop: 16,
                marginBottom: 16
              }}
            />
          )}
        </Box>
      ))}

      <Box
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: '#E9ECEF',
          marginTop: 16,
          marginBottom: 16
        }}
      />

      <Box style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text fw={600}>Итого</Text>
        <Text fw={600} size="lg">
          {cart.totalPrice.toFixed(2)} $
        </Text>
      </Box>
      
      <Button
        fullWidth
        mt="md"
        color="green"
      >
        Оформить заказ
      </Button>
    </Box>
  );
}