import './App.css';
import { Container, Grid, IconButton } from '@material-ui/core';
import TablePeople from './components/Table';
import { useState } from 'react';
import AddForm from './components/AddForm';
import DialogForm from './components/DialogForm';
import ButtonDefault from './components/Button';
import CloseIcon from '@material-ui/icons/Close';
import { isValidName, isValidAge } from './components/validators';


const toFields = (fieldsInfo, validators) => {
  const makeEventHandler = (setState) => e => setState(e.currentTarget.value);
  
  return Object.entries(fieldsInfo).map(([k, [state, setState]]) => {
    return { key: k, value: state, onChange: makeEventHandler(setState), isValid: validators[k] || (() => true) };
  });
}

const removeKey = (key, { [key]: _, ...rest }) => rest;

const App = () => {
  const name = useState('');
  const surname = useState('');
  const age = useState('');
  const city = useState('');
  
  const [editedName, setEditedName] = useState('');
  const [editedSurname, setEditedSurname] = useState('');
  const [editedCity, setEditedCity] = useState('');
  
  const [entriesCounter, setEntriesCounter] = useState(0);
  const [tablesCounter, setTablesCounter] = useState(1);
  const [tables, setTables] = useState({ 0: {} });
  const [editedIdx, setEditedIdx] = useState(null);
  
  const { 0: primaryTable, ...secondaryTables } = tables;
  const validators = { name: isValidName, surname: isValidName, age: isValidAge, city: isValidName };
  
  const onSubmit = () => {
    const newRow = [name, surname, age, city].map(a => a[0]);

    setTables({ ...tables, 0: { ...primaryTable, [entriesCounter]: newRow } });
    setEntriesCounter(entriesCounter + 1);
  };

  const onRemove = (tableIdx, rowIdx) => setTables({ ...tables, [tableIdx]: removeKey(rowIdx, tables[tableIdx]) });

  const onChangeBegin = (tableIdx, rowIdx) => {
    setEditedIdx([tableIdx, rowIdx]);
    const [name, surname, , city] = tables[tableIdx][rowIdx];
    setEditedName(name);
    setEditedSurname(surname);
    setEditedCity(city);
  };

  const onChangeCommit = () => {
    const newRow = [editedName, editedSurname, age[0], editedCity];
    const [tableIdx, rowIdx] = editedIdx;
    setTables({ ...tables, [tableIdx]: { ...tables[tableIdx], [rowIdx]: newRow } });
    setEditedIdx(null);
  };

  const onChangeAbort = () => setEditedIdx(null);

  const copyTable = () => {
    setTables({ ...tables, [tablesCounter]: { ...primaryTable } });
    setTablesCounter(tablesCounter + 1);
  }

  const deleteTable = (tableIdx) => setTables(removeKey(tableIdx, tables));


  return (
    <div className="App">
      <Container maxWidth="md" style={{ height: "100vh", padding: "24px" }}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={6}>
              <AddForm fields={toFields({ name, surname, age, city }, validators)} onSubmit={onSubmit} />
            </Grid>
            <Grid item xs={6}>
              <AddForm fields={toFields({ name, age, surname, city }, validators)} columns={2} onSubmit={onSubmit} />
            </Grid>
          </Grid>
          <Grid container item spacing={1} justifyContent="flex-end">
            <Grid item>
              <ButtonDefault onClick={copyTable}>Copy table</ButtonDefault>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TablePeople tableIdx={0} data={primaryTable} onRemove={onRemove} onChange={onChangeBegin} />
          </Grid>
          {
            Object.entries(secondaryTables).map(([tableIdx, table]) => (
              <Grid container item key={tableIdx}>
                <Grid container item spacing={1} justifyContent="flex-end">
                  <Grid item>
                    <IconButton onClick={() => deleteTable(tableIdx)}>
                      <CloseIcon color="secondary" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TablePeople tableIdx={tableIdx} data={table} onRemove={onRemove} onChange={onChangeBegin} />
                </Grid>
              </Grid>
            ))
          }
        </Grid>
      </Container>

      <DialogForm
        fields={toFields({
          name: [editedName, setEditedName],
          surname: [editedSurname, setEditedSurname],
          city: [editedCity, setEditedCity],
        },
        validators)}
        open={editedIdx !== null}
        onSave={onChangeCommit}
        onClose={onChangeAbort}
      />
    </div>
  );
};

export default App;
