import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';

export const MuiMode = () => {
  const theme = useTheme();
  // @ts-ignore
  return <Typography component="h1">{`${theme.palette.mode} mode`}</Typography>;
};
