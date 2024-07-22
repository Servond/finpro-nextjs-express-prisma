import { Box } from '@mui/material';
import HomeView from '@/view/home';
import ProductView from '@/view/products/product';
import Footer from '@/view/footer/footer';

export default function HomePage() {
  return (
    <Box>
      <HomeView />
      <ProductView />
      <Footer />
    </Box>
  );
}
