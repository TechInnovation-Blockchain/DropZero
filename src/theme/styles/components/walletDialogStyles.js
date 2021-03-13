import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
  dropdown: {
    background: theme.palette.background.dialog,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    position: 'relative',
  },
  dropdownIcon: {
    color: theme.palette.text.secondary,
    position: 'absolute',
    right: 0,
    fontWeight: 900,
  },
  closeBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.text.secondary,
  },
  clearSearch: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.disabled,
  },
  dialogPaper: {
    maxWidth: 400,
    width: '100vw',
    borderRadius: 0,
  },
  dialog: {
    textAlign: 'center',
    padding: theme.spacing(2),
    paddingBottom: 0,

    '&>*': {
      marginBottom: theme.spacing(2),
    },
    background: theme.palette.background.primary,
    '@media(max-width:330px)': {
      padding: theme.spacing(1),
    },
  },
  dialogHeading: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    padding: '5px 0',
    fontSize: '14px',
  },
  textField: {
    background: theme.palette.background.secondary,
    '& .MuiInputBase-input': {
      height: 36,
      fontWeight: '700 !important',
      padding: theme.spacing(0, 1),
      lineHeight: 1.5,
      textAlign: 'center',
      color: theme.palette.text.secondary,
      fontSize: '14px',
    },
  },
  list: {
    maxHeight: 500,
    overflowY: 'hidden',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    filter: 'grayscale(1)',
    '&:hover': {
      backgroundColor: theme.palette.background.main,
      color: theme.palette.text.primary,
      '& img': {
        filter: 'grayscale(0%)',
      },
      '& p': {
        color: theme.palette.text.primary,
      },
    },
  },
  selectedListItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.background.main,
      color: theme.palette.text.primary,
      '& img': {
        filter: 'grayscale(0%)',
      },
      '& p': {
        color: theme.palette.text.primary,
      },
    },
  },
  listItemText: {
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    fontSize: '14px',
    '& img': {
      filter: 'grayscale(100%)',
    },
  },
  loadingIcon: {
    marginRight: 5,
  },
  secondaryText: {
    color: theme.palette.text.secondary,
    fontWeight: 700,
  },
}));
