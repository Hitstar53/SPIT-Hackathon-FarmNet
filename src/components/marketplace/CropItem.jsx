import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CropItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 3,
        border: "2px solid #ccc",
      }}
    >
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        image={props.cropImg}
        title={props.cropName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.cropName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.cropDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Buy $200</Button>
        <Button size="large">Learn More</Button>
      </CardActions>
    </Card>
  );
}
