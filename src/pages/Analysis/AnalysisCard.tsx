import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { IAnalysisCardProps } from './types';

const useStyles = makeStyles({
  root: {
    minWidth: 220,
    minHeight: 100,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    width: '100%',
    height: '100%',
  },
});

const AnalysisCard = (props: IAnalysisCardProps) => {
  const { title, cardType, groupId, landscapeId } = props;

  const classes = useStyles();

  return (
    <Box mr={6}>
      <Card className={classes.root} variant="outlined">
        <Button
          className={classes.title}
          color="secondary"
          component={Link}
          to={`/${cardType}/${groupId}/${landscapeId}`}
        >
          <CardContent style={{ justifyContent: 'center', display: 'flex' }}>{title}</CardContent>
        </Button>
      </Card>
    </Box>
  );
};

export default AnalysisCard;
