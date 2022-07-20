import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TwitterIcon from '@mui/icons-material/Twitter';

import siteBg from "../../assets/website-bg.jpg"

const Pronostic = ({ title, image, content, created_at }) => {
    return (
        <Col lg={4} className="mb-5">
            <Card className="mx-auto" sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            S
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={new Date(created_at).toLocaleString()}
                />
                <a href={image.url} target="_blank" rel="noreferrer">
                    <CardMedia
                        component="img"
                        height="194"
                        image={image.url}
                        alt="Paella dish"
                    />
                </a>
                <CardContent>
                    <Typography variant="body2" color="text.dark" className="fw-bold">
                        { content }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Col>
    )
}

export default Pronostic