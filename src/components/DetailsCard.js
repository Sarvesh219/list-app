import {
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import _ from 'lodash';

import { interestOptions } from './constants';

function DetailsCard(props) {
    const { entryDetails, onHandleSaveEntry, reloadApp, onHandleDeleteEntry } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [newForm, setNewForm] = useState({
        name: entryDetails.name,
        gender: entryDetails.gender,
        areaOfInterest: entryDetails.areaOfInterest
    })
    const areasOfInterest = [];
    entryDetails.areaOfInterest.forEach(item => {
        areasOfInterest.push(item.title);
    });
    const handleEditClick = event => {
        event.stopPropagation();
        setIsEdit(true);
    };
    const handleTextChange = event => {
        setNewForm(_.set({ ...newForm }, event.target.id, event.target.value))
    };
    const handleDropdownChange = event => {
        setNewForm(_.set({ ...newForm }, event.target.name, event.target.value));
    };
    const handleChipChange = (event, newValue) => {
        setNewForm(_.set({ ...newForm }, 'areaOfInterest', newValue));
    };
    const handleCancel = () => {
        setIsEdit(false);
    };
    return (
        <>
            {!isEdit && (
                <Card variant="outlined" style={{ margin: '15px 0', backgroundColor: "#fff5ee" }}>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            alignContent="center"
                        >
                            <Grid item xs={8}>
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">Name: </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2">
                                            {entryDetails.name !== '' ? entryDetails.name: 'NONE'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">Gender: </Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2">
                                            {entryDetails.gender}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="subtitle2">{`Area(s) of Interest: `}</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <Typography variant="body2">
                                            {areasOfInterest.toString().replace(/,/g, ", ")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="right">
                                    <Grid item xs={6} style={{ padding: 5 }}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                style={{ marginLeft: 20, marginTop: -15 }}
                                                onClick={handleEditClick}
                                            >
                                                <EditIcon style={{ color: 'green' }}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item xs={6}  style={{ padding: 5 }}>
                                        <Tooltip title="Remove">
                                            <IconButton
                                                style={{ marginTop: -15 }}
                                                onClick={() => {
                                                    onHandleDeleteEntry(entryDetails.id);
                                                }}
                                            >
                                                <DeleteIcon style={{ color: 'red' }}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
            {isEdit && (
                <Card variant="outlined" style={{ margin: '10px 0', backgroundColor: "#fff5ee" }}>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            alignContent="center"
                        >
                            <Grid item xs={8}>
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    style={{ margin: '10px 0', backgroundColor: '#fff' }}
                                    margin="dense"
                                    value={newForm.name}
                                    onChange={handleTextChange}
                                />
                                <FormControl variant="outlined" fullWidth margin="dense" style={{ margin: '5px 0', backgroundColor: '#fff' }}>
                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="gender"
                                        name="gender"
                                        value={newForm.gender}
                                        onChange={handleDropdownChange}
                                        label="Gender"
                                    >
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                        <MenuItem value='Others'>Others</MenuItem>
                                    </Select>
                                </FormControl>
                                <Autocomplete
                                    style={{ margin: '5px 0' }}
                                    multiple
                                    id="areaOfInterest"
                                    onChange={handleChipChange}
                                    options={interestOptions}
                                    value={newForm.areaOfInterest}
                                    getOptionLabel={(option) => option.title}
                                    filterSelectedOptions
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            style={{ backgroundColor: '#fff' }}
                                            margin="dense"
                                            variant="outlined"
                                            label="Area of Interest"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify="center">
                                    <Grid item xs={6} style={{ padding: 6 }}>
                                        <Tooltip title="Save">
                                            <IconButton
                                                style={{ marginLeft: 20, marginTop: -15 }}
                                                onClick={() => {
                                                    onHandleSaveEntry(entryDetails.id, { ...newForm, id: entryDetails.id});
                                                    reloadApp();
                                                    setIsEdit(false);
                                                }}
                                            >
                                                <CheckIcon style={{ color: 'green' }}/>
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                onHandleSaveEntry(entryDetails.id, { ...newForm, id: entryDetails.id});
                                                reloadApp();
                                                setIsEdit(false);
                                            }}
                                        >
                                            Save
                                        </Button> */}
                                    </Grid>
                                    <Grid item xs={6}  style={{ padding: 5 }}>
                                        <Tooltip title="Cancel">
                                            <IconButton
                                                style={{ marginTop: -15 }}
                                                onClick={handleCancel}
                                            >
                                                <CloseIcon style={{ color: 'red' }}/>
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )}
        </>
    );
}

export default DetailsCard;