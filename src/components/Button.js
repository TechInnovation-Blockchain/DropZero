import { Button as MuiButton } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/buttonStyles';

const Button = ({ text, rightIcon, leftIcon, onClick = () => {} }) => {
  const classes = useStyles();
  return (
    <MuiButton className={classes.button} onClick={onClick} variant='contained' color='primary'>
      {leftIcon ? leftIcon : null}
      <span>{text}</span>
      {rightIcon ? rightIcon : null}
    </MuiButton>
  );
};

export default Button;
