import { useState } from 'react';
import {
  Card,
  Image,
  Text,
  Button,
  Box,
  ActionIcon,
  NumberInput
} from '@mantine/core';
import { IconShoppingCart, IconPlus, IconMinus } from '@tabler/icons-react';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleIncrement = () => setQuantity((q) => Math.min(99, q + 1));
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > 99) {
      alert('Количество должно быть от 1 до 99');
      return;
    }

    dispatch(addToCart({ product, quantity }));
    setQuantity(1); 
  };

  const handleQuantityChange = (value: string | number) => {
    const numValue = Number(value);
    if (numValue >= 1 && numValue <= 99) {
      setQuantity(numValue);
    }
  };

  return (
    <Card
      padding={16}
      radius={24}
      withBorder
      w={302}
      h={414}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
      }}
    >

      <Box
        style={{
          width: 276,
          height: 276,
          borderRadius: '16px',
          overflow: 'hidden',
          margin: '0 auto',
          marginBottom: 16,
        }}
      >
        <Image
          src={product.image}
          width={276}
          height={276}
          alt={product.name}
          fit="cover"
        />
      </Box>


      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: 8,
        }}
      >

        <Box
          style={{
            width: 270,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: '0 auto',
            gap: 8,
            marginBottom: 12,
          }}
        >
        
          <Text
            style={{
              flex: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '20px',
              whiteSpace: 'normal',
              overflow: 'visible',
              wordBreak: 'break-word',
            }}
          >
            {product.name}
          </Text>

        
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'transparent',
              padding: 0,
              borderRadius: 8,
              flexShrink: 0,
            }}
          >
            <ActionIcon
              onClick={handleDecrement}
              disabled={quantity <= 1}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: '#F1F3F5',
                border: '1px solid #DEE2E6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <IconMinus size={16} style={{ display: 'block', lineHeight: 0 }} />
            </ActionIcon>

            <NumberInput
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={99}
              hideControls
              styles={{
                root: { width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' },
                input: {
                  width: 36,
                  height: 36,
                  minHeight: 36,
                  textAlign: 'center',
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#343A40',
                  outline: 'none',
                },
              }}
            />

            <ActionIcon
              onClick={handleIncrement}
              style={{
                width: 36,
                height: 36,
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
              <IconPlus size={16} style={{ display: 'block', lineHeight: 0 }} />
            </ActionIcon>
          </Box>
        </Box>

     
        <Box
          style={{
            width: 270,
            height: 44,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            margin: '0 auto',
            marginTop: 'auto',
          }}
        >
          {/* Цена */}
          <Text
            style={{
              width: 54,
              height: 24,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 18,
              lineHeight: '24px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {product.price} $
          </Text>

     
          <Button
            style={{
              width: 204,
              height: 44,
              padding: '10px 16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 16,
              lineHeight: '24px',
              letterSpacing: '0%',
              borderRadius: 8,
              backgroundColor: '#DBF2E0',
              color: '#3B944E',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DBF2E0';
              e.currentTarget.style.color = '#3B944E';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = '#54B46A';
              e.currentTarget.style.color = 'white';
            }}
            onClick={handleAddToCart}
          >
            <span>Add to cart</span>
            <IconShoppingCart
              size={16}
              style={{
                color: 'inherit',
                position: 'absolute',
                right: '30px',
                top: '15px',
              }}
            />
          </Button>
        </Box>
      </Box>
    </Card>
  );
}