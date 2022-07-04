import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbNavigation = (props: IBreadcrumbNavigationProps) => {
  const { data } = props;

  const breadcrumbLinks = data.map((item, index) => {
    if (item.isActive && item.isActive === true)
      return <Typography key={`${item.label}-${item.path}`}>{item.label}</Typography>;

    if (!item.path)
      return (
        <Typography color="primary" key={`${item.label}-${item.path}`}>
          {item.label}
        </Typography>
      );

    return (
      <Link
        key={`${item.label}-${item.path}`}
        component={RouterLink}
        to={{
          pathname: item.path,
          state: item.state,
        }}
        title={item.toolTip}
      >
        {item.label || ''}
      </Link>
    );
  });

  return (
    <>
      <Breadcrumbs aria-label="Breadcrumb" separator=">">
        {breadcrumbLinks}
      </Breadcrumbs>
    </>
  );
};

export interface IBreadcrumbNavigationProps {
  data: IBreadcrumbData[];
}

export interface IBreadcrumbData {
  path: string;
  label: string;
  toolTip: string;
  state: any | null;
  isActive: boolean | null;
}

export default BreadcrumbNavigation;
