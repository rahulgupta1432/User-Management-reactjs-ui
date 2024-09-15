import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, Box } from '@mui/material';

// Function to delete a user
const deleteUser = async (userId) => {
  const token = localStorage.getItem('token');
  
  try {
    const response = await fetch(`https://user-management-nodejs-api.vercel.app/api/v1/admin/delete/user?userId=${userId}`, {
      method: 'DELETE',
      headers: { 
        'x-authorization': JSON.parse(token),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    alert('User deleted successfully');

    // Optionally: Call a callback to refresh the list of users
  } catch (error) {
    alert('Error deleting user');
  }
};

const UserTable = ({ users, handleEditUser }) => {
  // Define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 90,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'mobile',
        header: 'Phone',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Date',
        size: 150,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 200,
        Cell: ({ row }) => {
          const isDeleted = row.original.isDeleted; // Replace with your actual property name
          const buttonColor = isDeleted ? 'default' : 'error'; // 'default' for grey, 'error' for red
          const buttonStyle = isDeleted
            ? { fontWeight: 'bold', opacity: 0.5 } // Apply bold text and lower opacity for disabled state
            : {}; // Default style for active state

          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleEditUser(row.original)}
                size="small"
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color={buttonColor}
                onClick={() => {
                  if (!isDeleted) {
                    // Call the delete function and pass the user ID
                    deleteUser(row.original.id);
                  }
                }}
                size="small"
                disabled={isDeleted} // Disable the button if the user is deleted
                sx={buttonStyle} // Apply conditional styling
              >
                Delete
              </Button>
            </Box>
          );
        },
      },
    ],
    [handleEditUser]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
      <MaterialReactTable columns={columns} data={users} />
    </Box>
  );
};

export default UserTable;
