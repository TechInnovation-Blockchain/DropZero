import { Button as MuiButton } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/buttonStyles';

const Button = ({ className, children, disabled, ...props }) => {
  const classes = useStyles();
  return (
    <MuiButton
      {...props}
      classes={{
        root: `${classes.button} ${className ? className : ''} ${disabled ? classes.disabled : ''}`,
      }}
      variant='contained'
      color='primary'
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
