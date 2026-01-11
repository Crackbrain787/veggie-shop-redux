import { useEffect } from 'react';
import { Text, Box, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productsSlice';
import { ProductCard } from '../ProductCard/ProductCard';

export function ProductList() {
  const dispatch = useAppDispatch();
  const { items: products, loading, error } = useAppSelector((state) => state.products);


  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  if (loading) {
    return (
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh'
      }}>
        <Loader size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ padding: '20px' }}>
        <Alert color="red" title="Ошибка">
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box style={{ 
      width: '100%',
      minHeight: '100vh',
      padding: '20px 0',
    }}>
      <Box style={{ 
        width: '100%',
        maxWidth: 1280,
        margin: '0 auto',
        position: 'relative',
        padding: '120px 40px 0 40px', 
      }}>
   
        <Text
          style={{
            position: 'absolute',
            top: 0,
            left: 30,
            width: 121,
            height: 40,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 32,
            lineHeight: '40px',
            letterSpacing: '0%',
            opacity: 1,
            color: 'black',
            zIndex: 10,
          }}
        >
          Catalog
        </Text>
        
       
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 302px)',
            gap: '16px',
            justifyContent: 'center', 
          }}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))
          ) : (
            <Box style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              color: '#666'
            }}>
              <Text size="lg">Продукты не найдены</Text>
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
}