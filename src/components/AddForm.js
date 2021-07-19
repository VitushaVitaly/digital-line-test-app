import { Paper, Grid, Box } from "@material-ui/core";
import ButtonDefault from "./Button";
import Fields from "./Fields";

const AddForm = ({ fields, onSubmit, columns = 1 }) => {
  const isValid = Object.values(fields).map(field => field.isValid(field.value)).filter(isValid => !isValid).length === 0;
  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={1}>
          <Fields fields={fields} columns={columns}/>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <ButtonDefault disabled={!isValid} onClick={onSubmit}>ADD</ButtonDefault>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddForm;