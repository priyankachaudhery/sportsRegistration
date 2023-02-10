import { createTheme } from '@mui/material/styles';

let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});

export default theme;

