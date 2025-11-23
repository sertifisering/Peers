import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
} from "@mui/material";
import { MyEventsContainer, SectionBox } from "./index.styles";

import { getEvents } from "@api/events";

const MyEvents = () => {
  const userId = 1;
  const [events, setEvents] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Initialize
  useEffect(() => {
  getEvents(userId).then(setEvents);
}, []);

  // Function
  const onHandleChangePage = (_:any, newPage: number) =>{
    setPage(newPage);
  }

  return (
    <MyEventsContainer>
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        My Events
      </Typography>

      {/* Create Section */}
      <SectionBox>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create a New Event
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
          Start creating your next sports event by clicking the button below.
        </Typography>

        <Button variant="contained" size="large">
          New Event
        </Button>
      </SectionBox>

      {/* Events List */}
      <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
        Recent Events
      </Typography>

      <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Sport</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Athletes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {events
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event) => (
                  <TableRow key={event.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {event.name?.charAt(0)}
                        </Avatar>
                        {event.name}
                      </Box>
                    </TableCell>
                    <TableCell>{event.sport || "-"}</TableCell>
                    <TableCell>{event.start_date || "-"}</TableCell>
                    <TableCell>{event.athletes || 0}</TableCell>
                    <TableCell align="right">
                      <Button size="small">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={events.length}
          page={page}
          onPageChange={onHandleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </MyEventsContainer>
  );
};

export default MyEvents;
