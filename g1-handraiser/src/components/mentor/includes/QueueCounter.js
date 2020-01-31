import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function QueueCounter() {
    return (
        <Card >
            <CardContent>
                <Typography variant="h2" component="h2">
                    15
                </Typography>
                <Typography variant="body1" component="p">
                    Student on Queue
                </Typography>
            </CardContent>
        </Card>
    )
}