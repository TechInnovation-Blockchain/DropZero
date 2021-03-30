import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  mainContainer: {
    textAlign: 'center',
    minHeight: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& button[disabled]': {
      color: theme.palette.text.secondary,
    },
  },
  heading: {
    fontWeight: 'bolder',
    marginBottom: '10px',
  },
  tabsWrapper: {
    background: theme.palette.background.secondary,
    width: '100%',
    minHeight: '280px',
    borderRadius: 10,
  },
  tabs: {
    display: 'flex',
    // borderBottom: `1px solid ${theme.palette.text.disabled}`,
    '& p': {
      width: '50%',
      padding: theme.spacing(2, 0),
      cursor: 'pointer',
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  },
  activeTab: {
    color: `${theme.palette.text.primary} !important`,
  },
}));
