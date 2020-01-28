import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 400,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function QueueContainer() {
    const classes = useStyles();
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="h2" component="h2">
                           15
                        </Typography><br />
                        <Typography variant="body1" component="p">
                            Student on Queue
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}