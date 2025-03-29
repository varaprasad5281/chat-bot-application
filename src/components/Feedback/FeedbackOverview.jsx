// src/components/Feedback/FeedbackOverview.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAllConversations } from "../../redux/slices/conversationsSlice";
import Rating from "@mui/material/Rating";

const FeedbackOverview = () => {
  const allConversations = useSelector(selectAllConversations);
  const conversationsWithFeedback = allConversations.filter(
    (conv) => conv.feedback && conv.feedback.submitted
  );

  const [sortField, setSortField] = useState("rating");
  const [sortDirection, setSortDirection] = useState("desc");
  const [ratingFilter, setRatingFilter] = useState("all");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredConversations = conversationsWithFeedback.filter((conv) => {
    if (ratingFilter === "all") return true;
    return conv.feedback.rating === parseInt(ratingFilter);
  });

  const sortedConversations = [...filteredConversations].sort((a, b) => {
    let comparison = 0;

    if (sortField === "date") {
      comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
    } else if (sortField === "rating") {
      comparison = a.feedback.rating - b.feedback.rating;
    } else if (sortField === "title") {
      comparison = a.title.localeCompare(b.title);
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Feedback Overview
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="body1">
          {filteredConversations.length} conversation
          {filteredConversations.length !== 1 ? "s" : ""} with feedback
        </Typography>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="rating-filter-label">Filter by rating</InputLabel>
          <Select
            labelId="rating-filter-label"
            value={ratingFilter}
            label="Filter by rating"
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <MenuItem value="all">All ratings</MenuItem>
            <MenuItem value="5">5 stars</MenuItem>
            <MenuItem value="4">4 stars</MenuItem>
            <MenuItem value="3">3 stars</MenuItem>
            <MenuItem value="2">2 stars</MenuItem>
            <MenuItem value="1">1 star</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredConversations.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "title"}
                    direction={sortField === "title" ? sortDirection : "asc"}
                    onClick={() => handleSort("title")}
                  >
                    Conversation
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "rating"}
                    direction={sortField === "rating" ? sortDirection : "asc"}
                    onClick={() => handleSort("rating")}
                  >
                    Rating
                  </TableSortLabel>
                </TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "date"}
                    direction={sortField === "date" ? sortDirection : "asc"}
                    onClick={() => handleSort("date")}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedConversations.map((conversation) => (
                <TableRow key={conversation.id}>
                  <TableCell>{conversation.title}</TableCell>
                  <TableCell>
                    <Rating
                      value={conversation.feedback.rating}
                      readOnly
                      precision={1}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {conversation.feedback.text || "No written feedback"}
                  </TableCell>
                  <TableCell>
                    {new Date(conversation.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
          No feedback found with the selected filter.
        </Typography>
      )}
    </Box>
  );
};

export default FeedbackOverview;
