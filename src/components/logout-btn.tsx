"use client";

import React from 'react'
import { Button } from './ui/button';
import { logout } from '@/lib/actions/auth';

function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={(event) => {
        event.preventDefault();
        logout()
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton