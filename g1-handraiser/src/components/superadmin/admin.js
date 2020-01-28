import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShowStudents from './actions/showStudents';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
    backgroundColor: '#42B0FF',
  },
  
  title: {
    flexGrow: 1,
    fontSize: 14,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    position: 'absolute',
    marginTop: '5%',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
  },
  card: {
    minWidth: 275,
    margin: '20px',
  },
  cardContent: {
    display: 'flex'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  
  const show = () => {
    setOpen(true)
  }
  return (
    <React.Fragment>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>Mentor Robby</Typography>
            </CardContent>
            <IconButton color="inherit" style={{float: 'right', bottom: '55px'}}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <CardActions>
              <Button onClick={show} size="small">Show Students</Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>Mentor Dan</Typography>
            </CardContent>
            <IconButton color="inherit" style={{float: 'right', bottom: '55px'}}>
              <Badge badgeContent={6} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <CardActions>
              <Button size="small">Show Students</Button>
            </CardActions>
          </Card>
          <ShowStudents open={open} setOpen={setOpen}/>
        </Container>
      </main>
    </div>
    </React.Fragment>
  );
}