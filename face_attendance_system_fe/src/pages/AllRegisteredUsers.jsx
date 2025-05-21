import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import config from "../config";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  TableContainer,
} from "@mui/material";
import { Delete as Trash2, Edit } from "@mui/icons-material";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: 3 }}>
          <CardHeader
            title="Registered Users"
            subheader="Manage all registered users in the system"
            titleTypographyProps={{ variant: 'h4', fontWeight: 700 }}
          />
          <CardContent>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={160}>
                <Box className="animate-spin" width={32} height={32} border={2} borderColor="primary.main" borderRadius="50%" borderBottomColor="transparent" />
              </Box>
            ) : (
              <TableContainer 
                component={Paper} 
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell>{new Date(user.dob).toLocaleDateString()}</TableCell>
                        <TableCell align="right">
                          <Box display="flex" justifyContent="flex-end" gap={1}>
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<Edit />}
                              onClick={() => openEditModal(user)}
                            />
                            <Button
                              variant="text"
                              size="small"
                              color="error"
                              startIcon={<Trash2 />}
                              onClick={() => openDeleteConfirmation(user)}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                size="small"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                size="small"
              />
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={editForm.gender}
                onChange={handleEditChange}
                size="small"
              />
              <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={editForm.dob}
                onChange={handleEditChange}
                size="small"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEdit} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Layout>
  );
};

export default AllRegisteredUsers;
