import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper 
} from "@material-ui/core";
import ButtonDefault from "./Button";

const TablePeople = ({data, tableIdx, onChange, onRemove}) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>City</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          Object.entries(data).map(([rowId, rowValues]) =>
            <TableRow key={rowId}>
              {
                rowValues.map((cell, idx) => <TableCell key={idx}>{cell}</TableCell>)
              }
              <TableCell>
                <ButtonDefault variant="text" onClick={() => {onChange(tableIdx, rowId)}}>Edit</ButtonDefault>
                <ButtonDefault variant="text" color="secondary" onClick={() => {onRemove(tableIdx, rowId)}}>Delete</ButtonDefault>
              </TableCell>
            </TableRow>
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePeople;