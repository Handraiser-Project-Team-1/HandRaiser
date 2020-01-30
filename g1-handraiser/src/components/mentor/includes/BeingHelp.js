import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles(theme => ({
    Card: {
        marginTop: 5,
    },
   
}));

function BeingHelp() {
    const classes = useStyles();
    return (
        <Card className={classes.Card}>
            <CardContent>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={2} >
                            <FaceIcon fontSize="large" />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Vanessa Dulva
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                <hr />
                Being Helped
            </CardContent>
        </Card>
    )
}

export default BeingHelp
