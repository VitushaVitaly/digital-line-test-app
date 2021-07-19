import { TextField } from "@material-ui/core";

const TextInput = (props) => {
  return (
    <TextField fullWidth variant="outlined" size="small" {...props} />
  );
};

export default TextInput;