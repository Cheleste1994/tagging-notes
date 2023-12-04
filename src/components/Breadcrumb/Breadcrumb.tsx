import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function Breadcrumb({ nameActive }: { nameActive?: string }) {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    event.preventDefault();
    navigate(path || '/');
  };

  const breadcrumb = pathname
    .split('/')
    .slice(0, -1)
    .map((path) => (
      <Link
        underline="hover"
        color="inherit"
        href={path}
        onClick={(e) => handleClick(e, path)}
        key={path}
      >
        {!path ? 'Home' : `${path[0].toUpperCase()}${path.slice(1)}`}
      </Link>
    ));

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumb}
      {nameActive && <Typography color="text.primary">{nameActive}</Typography>}
    </Breadcrumbs>
  );
}
