import {
  Card,
  CardContent,
  Container
} from '@material-ui/core';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import React, { useState } from 'react';
import _ from 'lodash';

import {
  createEntry,
  deleteEntry,
  editEntry,
  setAppSearchText
} from './actions';
import { interestOptions } from './components/constants';
import DetailsCard from './components/DetailsCard';
import Form from './components/Form';
import Searchbar from './components/Searchbar';

function App(props) {
  const { dispatch, entriesList, searchText } = props;
  const [editfinished, setEditFinished] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: 'Male',
    areaOfInterest: [interestOptions[0]]
  });

  const handleChipChange = (event, newValue) => {
    setForm(_.set({ ...form }, 'areaOfInterest', newValue));
  };

  const handleDropdownChange = event => {
    setForm(_.set({ ...form }, event.target.name, event.target.value));
  };

  const handleTextChange = event => {
    setForm(_.set({ ...form }, event.target.id, event.target.value));
  };

  const handleCancelClick = () => {
    setForm({
        name: '',
        gender: 'Male',
        areaOfInterest: [interestOptions[0]]
    });
  };

  const handleSubmitEntry = () => {
    dispatch(createEntry({...form, id: v4()}));
  };

  const handleSaveEntry = (id, body) => {
    dispatch(editEntry(id, body));
  };
  const handleDeleteEntry = id => {
    dispatch(deleteEntry(id));
  };
  const reloadApp = () => {
    setEditFinished(!editfinished);
  };
  const handleSearchTextChange = event => {
    dispatch(setAppSearchText(event.target.value));
  };
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Searchbar
            searchText={searchText}
            onHandleSearchTextChange={handleSearchTextChange}
          />
          <Form
            form={form}
            onHandleChipChange={handleChipChange}
            onHandleDropdownChange={handleDropdownChange}
            onHandleTextChange={handleTextChange}
            onHandleCancelClick={handleCancelClick}
            onHandleSubmitEntry={handleSubmitEntry}
          />
          {entriesList.length > 0 && entriesList.map((item, index) =>
            <DetailsCard
              key={index}
              entryDetails={item}
              onHandleSaveEntry={handleSaveEntry}
              onHandleDeleteEntry={handleDeleteEntry}
              reloadApp={reloadApp}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

const select = state => ({
  entriesList: state.entriesReducer.entrieslist,
  searchText: state.entriesReducer.searchText
});

export default connect(select)(App);
