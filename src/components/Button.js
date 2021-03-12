import { Button as MuiButton } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/buttonStyles';

const Button = ({ className, children, ...props }) => {
  const classes = useStyles();
  return (
    <MuiButton
      {...props}
      className={`${classes.button} ${className ? className : ''}`}
      variant='contained'
      color='primary'
    >
      {children}
    </MuiButton>
  );
};

export default Button;
