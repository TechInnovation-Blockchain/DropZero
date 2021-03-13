import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  snackbarStyles: {
    width: 250,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.border.lightBorder}`,
    '& .MuiAlert-icon': {
      color: theme.palette.primary.main,
    },
  },
  // link: {
  //   textDecoration: 'none',
  //   display: 'flex',
  //   alignItems: 'center',
  //   color: theme.palette.xioRed.main,
  // },
  // linkIcon: {
  //   color: theme.palette.xioRed.main,
  //   paddingRight: 5,
  //   marginTop: 2,
  //   alignItems: 'flex-start',
  // },
}));
