import { TextField } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/inputFieldStyles';

const InputField = ({ ...props }) => {
  const classes = useStyles();
  return (
    <TextField {...props} className={classes.inputField} InputProps={{ disableUnderline: true }} />
  );
};

export default InputField;
