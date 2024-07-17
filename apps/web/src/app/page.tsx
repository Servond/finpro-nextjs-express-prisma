import { Box } from "@mui/material";

import HomeView from "@/view/home";
import ProductView from "@/view/products/product";

export default function HomePage() {
  return (
    <Box>
      <HomeView />
      <ProductView />
    </Box>
  );
}
