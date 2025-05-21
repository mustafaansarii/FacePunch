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
  Breadcrumbs,
  Link,
  TablePagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Delete as Trash2, Edit } from "@mui/icons-material";

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
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
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
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
    } catch ( error) {
      toast.error("Failed to update user");
      console.error(error);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Card sx={{ border: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: 3, maxWidth: '1000px', margin: '0 auto', mt: 10 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Registered Users</Typography>
        </Breadcrumbs>
      </Box>
      
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
            sx={{ border: 1, borderColor: 'divider', overflowX: 'auto' }}
          >
            <Table
              sx={{ minWidth: isSmallScreen ? 650 : 750 }}
              aria-label="registered users table"
            >
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
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
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
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          color="error"
                          startIcon={<Trash2 />}
                          onClick={() => openDeleteConfirmation(user)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>

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
    </Card>
  );
};

export default AllRegisteredUsers;
