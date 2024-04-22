import { Container } from "@chakra-ui/react";
import Footer from "@components/layout/Footer";
import Navbar from "@components/layout/Navbar";
import CartDrawer from "@components/ui/Drawer/CartDrawer";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Default = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <Container
        maxW={"8xl"}
        as="main"
        minHeight={{ base: "100vh", md: "85vh" }}
        maxHeight={"100vh"}
        overflow={"auto"}
        py={"2rem"}
      >
        <Outlet />
        <ScrollRestoration getKey={(location) => location.pathname} />
      </Container>

      <Footer />
    </>
  );
};

export default Default;
