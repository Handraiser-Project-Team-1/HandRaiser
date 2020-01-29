import React from "react";
import { Grid } from "@material-ui/core";
import CardClass from "../includes/CardClass";
import Layout from "../includes/TopBar";

export default function Select(props) {
  return (
    <Layout {...props}>
      <Grid container spacing={2}>
        <Grid item>
          <CardClass
            title="BoomCamp 2019"
            date="Joined: September 14, 2016"
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like"
            mentor="Daniel Nebreja"
          />
        </Grid>
        <Grid item>
          <CardClass
            title="Python Programming"
            date={false}
            description="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like"
            mentor="Roby Eslava"
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
