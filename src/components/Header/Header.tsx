import { useState } from 'react';
import { Text, Button, Box } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useAppSelector } from '../../store/hooks';
import { CartPopup } from '../CartPopup/CartPopup';

export function Header() {
  const [cartOpened, setCartOpened] = useState(false);
  const cart = useAppSelector((state) => state.cart);

  return (
    <Box
      component="header"
      style={{
        width: '100%',
        height: 59,
        backgroundColor: 'var(--card-bg)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      
      <Box
        style={{
          width: '100%',
          maxWidth: 1440,
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          margin: '0 auto',
        }}
      >
      
        <Box style={{ display: 'flex', alignItems: 'center', position: 'relative', height: 33 }}>
         
          <Box
            style={{
              backgroundColor: '#F7F7F7',
              borderRadius: 31,
              width: 209,
              height: 33,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 15,
              position: 'relative',
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '22px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: 'var(--text-black)',
              }}
            >
              Vegetable
            </Text>
            
          
            <Box
              style={{
                backgroundColor: 'var(--green-primary)',
                borderRadius: 31,
                width: 80,
                height: 33,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: 'var(--text-white)',
                  verticalAlign: 'middle',
                }}
              >
                SHOP
              </Text>
            </Box>
          </Box>
        </Box>

 
        <Box style={{ position: 'relative' }}>
          <Button
            styles={{
              root: {
                backgroundColor: 'var(--green-primary)',
                color: 'var(--text-white)',
                width: cart.totalItems > 0 ? 174 : 144, 
                height: 44,
                padding: '10px 40px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0%',
                borderRadius: 8,
                position: 'relative',
                '&:hover': {
                  backgroundColor: 'var(--green-dark)',
                }
              }
            }}
            onClick={() => setCartOpened((o) => !o)}
          >
       
            {cart.totalItems > 0 && (
              <Box
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 12,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'black',
                }}
              >
                {cart.totalItems}
              </Box>
            )}
            
     
            <Text 
              span 
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0%',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              Cart
            </Text>
            
    
            <Box
              style={{
                position: 'absolute',
                right: 12,
                top: 12,
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconShoppingCart size={20} />
            </Box>
          </Button>

         
          {cartOpened && (
            <Box
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--gray-light)',
                padding: 20,
                zIndex: 1001,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: 'var(--border-radius-lg)',
                minWidth: 350,
                marginTop: 8,
              }}
            >
              <CartPopup />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}