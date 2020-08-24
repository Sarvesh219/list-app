import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

import { interestOptions } from './constants';

const useStyles = makeStyles((theme) => ({
    buttonSection: {
        paddingTop: 10,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function Form(props) {
    const classes = useStyles();
    const {
        form,
        onHandleChipChange,
        onHandleDropdownChange,
        onHandleTextChange,
        onHandleCancelClick,
        onHandleSubmitEntry
    } = props;

    return (
        <>
            <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                style={{ margin: '10px 0' }}
                margin="dense"
                value={form.name}
                onChange={onHandleTextChange}
            />
            <FormControl variant="outlined" fullWidth margin="dense" style={{ margin: '5px 0' }}>
                <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={onHandleDropdownChange}
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
                onChange={onHandleChipChange}
                options={interestOptions}
                value={form.areaOfInterest}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        margin="dense"
                        variant="outlined"
                        label="Area of Interest"
                    />
                )}
            />
            <div className={classes.buttonSection}>
                <Button
                    style={{ marginRight: 5 }}
                    variant="contained"
                    color="primary"
                    onClick={onHandleSubmitEntry}
                >
                    Submit
                </Button>
                <Button
                    style={{ marginLeft: 5 }}
                    variant="contained"
                    color="secondary"
                    onClick={onHandleCancelClick}
                >
                    Cancel
                </Button>
            </div>
        </>
    );
}

export default Form;