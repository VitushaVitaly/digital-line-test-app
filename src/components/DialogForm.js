import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Fields from "./Fields";
import ButtonDefault from "./Button";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogForm = ({ fields, open, onClose, onSave }) => {
  const [isAgree, setIsAgree] = useState(false);

  const classes = useStyles();
  const isValid = Object.values(fields).map(field => field.isValid(field.value)).filter(isValid => !isValid).length === 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.root}>
        Edit name
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Fields fields={fields} columns={fields.length} />
          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAgree}
                  onChange={() => setIsAgree(!isAgree)}
                  color="primary"
                />
              }
              label="Totally agree"
            />
          </Grid>
          <Grid item xs={8}>
            <ButtonDefault disabled={!isValid || !isAgree} fullWidth onClick={onSave}>SAVE</ButtonDefault>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;