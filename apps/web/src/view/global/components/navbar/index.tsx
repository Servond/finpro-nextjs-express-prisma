"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { signOut } from "@/lib/features/auth/authSlice";

import Image from "next/image";

const NavbarWrapper = styled(Box)(() => ({
  minHeight: "100%",
  backgroundColor: "rgb(255 255 255)",
  boxShadow: "0 4px 4px -4px gray",
}));

const Navbar = () => {
  const router = useRouter();
  const { isLogin } = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();

  return (
    <NavbarWrapper>
      <Box
        sx={{
          margin: "0 200px 0 200px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <Box
          display="flex"
          sx={{
            height: "4rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            display="flex"
            sx={{
              alignItems: "center",
            }}
          >
          <Image
              src="/logo.png"
              alt="Icon"
              width={60}
              height={60}
          />
<<<<<<< HEAD
            <Typography>Mini Project</Typography>
=======
            <Typography>MProject</Typography>
>>>>>>> main
          </Box>
          {isLogin == false ? (
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={() => router.push("/login")}
                sx={{
                  border: 'none',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: "white",
                    border: 'none'
                  }
                }}
                >
                Login
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/register")}
                sx={{
                  border: 'none',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: "rgb(238 46 36)",
                    color: 'white',
                    border: 'none',
                    borderRadius: '999px'
                  }
                }}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Button

              variant="outlined"
              onClick={() => {
                dispatch(signOut());
                router.push("/");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;
