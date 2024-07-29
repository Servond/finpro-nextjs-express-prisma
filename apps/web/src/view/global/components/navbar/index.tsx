import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

import Image from 'next/image';
import { getSession } from '@/utils/actions/authentication';
import { NavbarWrapper } from './navbar.style';
import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const Navbar = async () => {
  const user = await getSession();

  return (
    <NavbarWrapper>
      <Box
        sx={{
          margin: '0 200px 0 200px',
          paddingLeft: '2rem',
          paddingRight: '2rem',
        }}
      >
        <Box
          display="flex"
          sx={{
            height: '4rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            display="flex"
            sx={{
              alignItems: 'center',
            }}
          >
            <Image src="/logo.png" alt="Icon" width={60} height={60} />
            <Typography>MProject</Typography>
          </Box>
          {!user ? (
            <Stack direction="row" spacing={1}>
              <form
                action={async () => {
                  'use server';
                  await signIn();
                }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    border: 'none',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'white',
                      border: 'none',
                    },
                  }}
                >
                  Login
                </Button>
              </form>

              <form
                action={async () => {
                  'use server';
                  redirect('/auth/register');
                }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    border: 'none',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'rgb(238 46 36)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '999px',
                    },
                  }}
                >
                  Register
                </Button>
              </form>
            </Stack>
          ) : (
            <div className="flex gap-4">
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <Button type="submit" variant="outlined">
                  Logout
                </Button>
              </form>
              <Link href="/dashboard">
                <Button variant="outlined">Dashboard</Button>
              </Link>
            </div>
          )}
        </Box>
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;
