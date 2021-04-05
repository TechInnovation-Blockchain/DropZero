import { TextField } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/inputFieldStyles';

const InputField = ({ className, InputProps, ...props }) => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      className={`${classes.inputField} ${className}`}
      error={true}
      InputProps={{ disableUnderline: true, ...InputProps }}
    />
  );
};

export default InputField;
