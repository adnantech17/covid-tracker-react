import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total, active, ...props }) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className="infoBox__cases">+({cases})</h2>
        <Typography color="textSecondary">{total} Total</Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
