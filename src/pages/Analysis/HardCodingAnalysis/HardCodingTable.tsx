import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { tabularData } from './mockData';

const HardCodingTable = (props: any) => {
  const [data, setData] = useState(tabularData);
  const { setDomainSelected } = props;

  const handleSearch = (e: any) => {
    const filteredData = tabularData.filter((x) => x.Domain.toLowerCase().includes(e.target.value.toLowerCase()));
    setData(filteredData);
  };

  return (
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        Hard Coded Literals
      </Typography>
      <br />
      <Box>
        <TextField
          variant="standard"
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
          fullWidth
        />
      </Box>
      <br />
      <TableContainer component={Paper}>
        <Table
          aria-label="Hard Coding Analysis Table"
          size="small"
          sx={{
            '& .MuiTableRow-root:hover': {
              backgroundColor: '#EFF7FA',
            },
          }}
        >
          <TableHead>
            <TableRow hover>
              <TableCell align="center" colSpan={1}></TableCell>
              <TableCell align="center" colSpan={2}>
                Number of Literals
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Domain</TableCell>
              <TableCell align="right">Full Repository</TableCell>
              <TableCell align="right">Used Repository</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.Domain}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => setDomainSelected(row.Domain)}
              >
                <TableCell component="th" scope="row" sx={{ color: '#376FD0', cursor: 'pointer' }}>
                  {row.Domain}
                </TableCell>
                <TableCell align="right">{row.FullRepository}</TableCell>
                <TableCell align="right">{row.UsedRepository}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  );
};

export default HardCodingTable;
