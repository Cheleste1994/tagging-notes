import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';

export default function Breadcrumb({ nameActive }: { nameActive: string }) {
  const navigate = useNavigate();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/" onClick={handleClick}>
        Home
      </Link>
      <Typography color="text.primary">{nameActive}</Typography>
    </Breadcrumbs>
  );
}
