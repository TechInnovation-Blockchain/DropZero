import { TextField } from '@material-ui/core';

import { useStyles } from '../theme/styles/components/inputFieldStyles';

const InputField = ({ placeholder }) => {
  const classes = useStyles();
  return (
    <TextField
      placeholder={placeholder}
      className={classes.inputField}
      InputProps={{ disableUnderline: true }}
    />
  );
};

export default InputField;
