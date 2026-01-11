import { useEffect } from 'react';
import { Loader, Notification, AppShell } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchProducts, clearError } from './store/slices/productsSlice';
import { Header } from './components/Header/Header';
import { ProductList } from './components/ProductList/ProductList';

function App() {
  const dispatch = useAppDispatch();
  

  const { loading, error } = useAppSelector((state) => state.products);

  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 
  const handleCloseError = () => {
    dispatch(clearError());
  };

  return (
    <AppShell header={{ height: 59 }}>
      <AppShell.Header>
       
        <Header />
      </AppShell.Header>

      <AppShell.Main style={{
        marginTop: 59,
        minHeight: 'calc(100vh - 59px)',
        backgroundColor: '#F7F7F7',
        padding: 0,
      }}>
        {error && (
          <Notification
            icon={<IconX size="1.1rem" />}
            color="red"
            title="Ошибка"
            onClose={handleCloseError}
            style={{ margin: '20px auto', maxWidth: 1280, width: 'calc(100% - 40px)' }}
          >
            {error}
          </Notification>
        )}

        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}>
            <Loader size="xl" />
          </div>
        ) : (
          
          <ProductList />
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;