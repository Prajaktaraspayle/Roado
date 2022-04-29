import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function MediaCard(props) {
    return (
        <Card>
            <CardActionArea onClick={props.handleClick}>
                <CardContent>
                   {
                          props.word.word ? <Typography variant="h5" component="h2">
                                {props.word.word}
                            </Typography> : <Typography variant="h5" component="h2">
                                <h2>Word is Not valid</h2>
                            </Typography>

                   }
                    <Typography variant="body2" color="textSecondary" component="div">
                        {props.word.entries && props.word.entries.map((entry, index) => (
                            <p style={{ marginTop: 10 }} key={index}>({entry.partOfSpeech}) {entry.definitions[0]}</p>
                        ))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}