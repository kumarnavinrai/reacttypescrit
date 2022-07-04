import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeading: {
      color: '#043D72',
      flexGrow: 1,
    },
    heading: {
      display: 'flex',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    button: {
      margin: '0 4px',
    },
    filler: {
      flexGrow: 1,
    },
    map: {
      textAlign: 'left',
      width: '100%',
      font: '13px',
    },
  })
);

// FileUploader Styles
const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: unknown) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
