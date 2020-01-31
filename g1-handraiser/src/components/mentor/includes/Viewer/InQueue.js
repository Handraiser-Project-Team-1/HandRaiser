import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import HelpIcon from '@material-ui/icons/Help';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  userBackground: {
    background: '#d6d6d6'
  },
  Card: {
    '@media (max-width:768px)': {
      hidden: true
    }
  }

}));

function InQueue() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <div className={classes.root}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>Error Handling</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} className={classes.Card}>
          <Card>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={3} >
                      <FaceIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Vincent
                        </Typography>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Help
              </Button>
              <Button size="small" color="primary">
                Remove
              </Button>
              <Button size="small" color="primary">
                <HelpIcon onClick={handleClick('bottom')} />
              </Button>
              <Typography>
                1
              </Typography>


            </CardActions>
          </Card>
        </Grid>


        <Grid item xs={12} sm={4}>
          <Card>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <FaceIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Vincent
                        </Typography>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Help
              </Button>
              <Button size="small" color="primary">
                Remove
              </Button>
              <Button size="small" color="primary">
                <HelpIcon onClick={handleClick('bottom')} />
              </Button>
              <Typography>
                2
              </Typography>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <FaceIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Vincent
                        </Typography>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Help
              </Button>
              <Button size="small" color="primary">
                Remove
              </Button>
              <Button size="small" color="primary">
                <HelpIcon onClick={handleClick('bottom')} />
              </Button>
              <Typography>
                3
              </Typography>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card>
            <CardActionArea className={classes.userBackground}>
              <CardContent>
                <div className={classes.root}>
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <FaceIcon fontSize="large" />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Vincent
                        </Typography>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Help
              </Button>
              <Button size="small" color="primary">
                Remove
              </Button>
              <Button size="small" color="primary">
                <HelpIcon onClick={handleClick('bottom')} />
              </Button>
              <Typography>
                4
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default InQueue