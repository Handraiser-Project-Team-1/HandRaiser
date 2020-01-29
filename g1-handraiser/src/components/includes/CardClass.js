import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red, green } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: green[500],
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  avatarRed: {
    backgroundColor: red[500],
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

export default function CardClass(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { title, date, description, mentor } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.card} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={date ? classes.avatar : classes.avatarRed}
          >
            {title.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={title}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="outlined" size="small" color="primary">
          {date ? "Enter" : "Click to join the class"}
        </Button>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph={false}>Mentor: {mentor}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
