import { Button as MuiButton, CircularProgress } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/buttonStyles';

const Button = ({ className, children, disabled, loading, ...props }) => {
  const classes = useStyles();
  return (
    <MuiButton
      {...props}
      classes={{
        root: `${classes.button} ${className ? className : ''} ${
          loading || disabled ? classes.disabled : ''
        }`,
      }}
      variant='contained'
      color='primary'
      disabled={loading ? loading : disabled}
    >
      {loading && <CircularProgress className={classes.progress} size={15} />}
      {children}
    </MuiButton>
  );
};

export default Button;
