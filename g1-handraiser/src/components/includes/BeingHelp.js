import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, Box } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Tag } from "antd";

import { Typography } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 5,
    fontSize: "15px",
    color: "gray"
  },
  userBackground: {
    background: "#f3f5f7"
  },
  typo: {
    color: "#42b0fe ",
    paddingTop: theme.spacing(2)
  },
  header: {
    display: "flex"
  }
}));

export default function CardClass(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography style={{ color: "gray" }}>Being Help</Typography>
        </CardContent>
        <CardHeader
          avatar={
            <Avatar src="https://lh3.googleusercontent.com/-Iz0GB_0aegI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdpGPFMg9S0oPVKaXyXnGH20xeeWQ.CMID/s192-c/photo.jpg"></Avatar>
          }
          title="Marcial M. Norte Jr"
          subheader={[<Tag key="tag">Cant merge my dev branch</Tag>]}
        />
        <CardContent style={{ paddingBottom: 16 }}>
          <Typography component="div">
            <Box textAlign="right">
              <Button
                size="small"
                variant="contained"
                color="primary"
                endIcon={<CheckCircleOutlineIcon />}
                disableElevation
              >
                Resolved
              </Button>
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
