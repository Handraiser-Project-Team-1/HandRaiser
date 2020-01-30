import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    Card: {
        marginTop: 5,
    }
  }));

function BeingHelp() {
    const classes = useStyles();
    return (
        <Card className={classes.Card}>
            <CardContent>
                <Typography variant="body" component="p">
                    Being Helped: Vanessa Dulva
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BeingHelp
