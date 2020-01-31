import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
// import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ShowStudents from './actions/showStudents';
import Badge from '@material-ui/core/Badge';
import Request from './actions/request';

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

export default function Dashboard(props) {
  let history = useHistory();
  const {keys} = props
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [openR, setOpenR] = useState(false)

  useEffect(()=>{
    console.log(localStorage.getItem('key'), keys)
    if(localStorage.getItem('key') === keys){
      history.push('/admin')
    }else{
      history.push('/')
    }
  },[history, keys])
  
  const show = () => {
    setOpen(true)
  }
  const request = () => {
    setOpenR(true)
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
          <Button color="inherit" onClick={request}>
            Login Requests
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </Button>
          <Request open={openR} setOpen={setOpenR}/>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography>Mentor Robby</Typography>
            </CardContent>
            <Badge badgeContent={4} color="secondary" style={{float: 'right', bottom: '45px', left: '-15px'}}>
              <NotificationsIcon />
            </Badge>
            <CardActions>
              <Button onClick={show} size="small">Show Students</Button>
            </CardActions>
          </Card>
          <ShowStudents open={open} setOpen={setOpen}/>
        </Container>
      </main>
    </div>
    </React.Fragment>
  );
}