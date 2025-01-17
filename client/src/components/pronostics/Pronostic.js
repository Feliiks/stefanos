import React from 'react'
import { Col } from 'react-bootstrap'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';

import { Telegram } from '@mui/icons-material'
import moment from 'moment'
import twitterAvatar from "../../assets/B_q1uKVM_400x400.jpg"

const Pronostic = ({ title, image, content, created_at }) => {

    let created_at_format = moment(new Date(created_at))

    return (
        <Col lg={6} className="mb-5">
            <Card className="mx-auto" sx={{ maxWidth: 500 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ border: "1px solid black" }} aria-label="recipe" src={twitterAvatar} />
                    }
                    title={title}
                    subheader={created_at_format.format('DD/MM/YYYY') + " à " + created_at_format.format('HH:mm')}
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
                    <Typography variant="body2" style={{ color: "#000"}}>
                        { content }
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <a href="https://twitter.com/StefanosAces" target="_blank" rel="noreferrer">
                        <IconButton aria-label="add to favorites">
                            <TwitterIcon />
                        </IconButton>
                    </a>

                    <IconButton aria-label="share">
                        <a href="https://t.me/+WyoF9Q4ybo9jOGI0" target="_blank" rel="noreferrer">
                            <Telegram />
                        </a>
                    </IconButton>
                </CardActions>
            </Card>
        </Col>
    )
}

export default Pronostic