import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  button: {
    minWidth: "100px",
    height: "40px"
  }
}));

const ButtonDefault = (props) => {
  const classes = useStyles();

  return (
    <Button size="small" variant="contained" color="primary" className={classes.button} {...props}/>
  );
};

export default ButtonDefault;