import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Layout from "../components/Layout";

const AllRegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `${config.backend_api}/api/features/users/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch users");
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.delete(
        `${config.backend_api}/api/features/users/${selectedUser.id}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("User deleted successfully");
      fetchUsers();
      setOpenDeleteDialog(false);
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  const handleEdit = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await axios.put(
        `${config.backend_api}/api/features/users/${selectedUser.id}/`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("User updated successfully");
      fetchUsers();
      setOpenEditDialog(false);
    } catch (err) {
      toast.error("Failed to update user");
      console.error(err);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const openDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      gender: user.gender,
      dob: user.dob,
    });
    setOpenEditDialog(true);
  };

  return (
    <Layout>
      <Box className="w-full p-6">
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: 700, color: "primary.main" }}
        >
          Registered Users
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <TableContainer
            component={Paper}
            elevation={4}
            className="rounded-xl backdrop-blur-sm"
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>
                      {new Date(user.dob).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => openEditModal(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openDeleteConfirmation(user)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedUser?.name}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={editForm.gender}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editForm.dob}
              onChange={handleEditChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default AllRegisteredUsers;
