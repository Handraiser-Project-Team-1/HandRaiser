import React from 'react';
import { 
    CssBaseline,
    Container,
    Button,
    DialogTitle,
    Dialog,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


export default function showStudents(props){
    const {open, setOpen} = props;

    const closeAdd = () => {
        setOpen(false);
    };
    return(
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <DialogTitle id="simple-dialog-title">
                    Hand Raiser Class
                    <Button color="primary" onClick={closeAdd}>
                        <CloseIcon/>
                    </Button>
                </DialogTitle>
                    <List>
                        <ListItem>
                            <ListItemText>Ifurung, Francisco</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText>Bandagosa, Joven</ListItemText>
                        </ListItem>
                    </List>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >   Add
                    </Button>
            </Container>
        </Dialog>
    )
}