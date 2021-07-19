import { Grid } from "@material-ui/core";
import TextInput from "./TextInput";

const title = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Fields = ({ fields, columns = 1 }) => {
  const xs = Math.max(1, Math.round(12 / columns));

  return (
    <>
      {
        fields.map(field => (
          <Grid key={field.key} item xs={xs}>
            <TextInput
              type="text"
              name={field.key}
              value={field.value}
              placeholder={title(field.key)}
              onChange={field.onChange}
              error={field.value.length !== 0 && !field.isValid(field.value)}
            />
          </Grid>
        ))
      }
    </>
  );
};

export default Fields;