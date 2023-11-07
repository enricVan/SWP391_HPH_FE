import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { close, resetForm } from '../../../../features/userFormSlice';
import Dropzone from 'react-dropzone';
import Close from '@mui/icons-material/Close';
import CloudUpload from '@mui/icons-material/CloudUpload';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import axios, { privateAxios } from '../../../../service/axios';
var phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const getInitialValue = (user) => {
  return {
    username: user?.username ? user.username : '',
    password: user?.password ? user.password : '',
    roleId: 2,
    email: '',
    fullName: '',
    address: '',
    gender: 0,
    phone: '',
    studentDto: {
      parentName: '',
      rollNumber: '',
    },
    avatar: [],
  };
};
export default function StudentForm() {
  const dispatch = useDispatch();
  const { openAddStudent, user } = useSelector((state) => state.userForm);
  const token = JSON.parse(localStorage.getItem('token'));

  const schema = yup.object().shape({
    studentDto: yup.object().shape({
      rollNumber: yup.string().required('Roll Number cannot be empty'),
    }),
    fullName: yup.string().required(),
    phone: yup
      .string()
      .matches(phoneRegEx, 'Phone number is not valid')
      .required(),
    address: yup.string().required(),
    username: yup.string().required(),
    password: yup
      .string()
      .matches('admin', "Password must be 'admin'!")
      .required(),
    email: yup.string().email('Wrong email format!').required(),
    avatar: yup.array().min(1, 'Please select one file'),
  });
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: getInitialValue(user),
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const newUser = Object.fromEntries(
      Object.entries(data).filter((entry) => entry[0] !== 'avatar')
    );
    const { avatar } = data;
    const formData = new FormData();
    const userDataJson = JSON.stringify(newUser);
    const blob = new Blob([userDataJson], { type: 'application/json' });
    formData.append('file', avatar[0]);
    formData.append('userDto', blob);
    // For JSON, we create a new Blob with type 'application/json'
    // console.log([...formData]);
    console.log(newUser);
    privateAxios
      .post('user', formData)
      .then((res) => {
        // dispatch(resetForm());
        // reset();
      })
      .catch((err) => {
        console.log(err);
        // dispatch(resetForm());
        // reset(getInitialValue());
      });
    // const results = await fetch('http://localhost:8888/api/v1/user', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: formData,
    // })
    //   .then((r) => r.json())
    //   .catch((err) => err);
    // console.log(results);
  };
  return (
    <>
      <Dialog
        open={openAddStudent}
        onClose={() => dispatch(close('ADD_STUDENT'))}
        fullWidth
        maxWidth={'900px'}
      >
        <DialogTitle>STUDENT</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container gap={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  {...register('username')}
                  margin='dense'
                  label='User Name'
                  type='text'
                  fullWidth
                  error={!!errors.username}
                  helperText={errors?.username?.message}
                />
                <TextField
                  {...register('password')}
                  margin='dense'
                  label='Password'
                  type='text'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                />
              </Grid>
              <Divider orientation='vertical' flexItem />
              <Grid item xs={12} md={7}>
                <Grid container item gap={2}>
                  <Grid item xs>
                    <TextField
                      {...register('fullName')}
                      margin='dense'
                      label='Full Name'
                      type='text'
                      fullWidth
                      error={!!errors.fullName}
                      helperText={errors?.fullName?.message}
                    />
                  </Grid>
                  <Grid item xs>
                    <Controller
                      name='gender' // Replace with your form field name
                      control={control} // Pass the form control from react-hook-form
                      render={({ field }) => (
                        <>
                          <FormLabel>Gender</FormLabel>
                          <RadioGroup
                            {...field}
                            row
                            sx={{ alignItems: 'center' }}
                          >
                            <FormControlLabel
                              value={0}
                              control={<Radio />}
                              label='Female'
                            />
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label='Male'
                            />
                          </RadioGroup>
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container item gap={2}>
                  <Grid item xs>
                    <TextField
                      {...register('studentDto.parentName')}
                      margin='dense'
                      label='Parent Name (Mom or Dad)'
                      type='text'
                      fullWidth
                      error={!!errors.studentDto?.parentName}
                      helperText={errors?.studentDto?.parentName?.message}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      {...register('studentDto.rollNumber')}
                      margin='dense'
                      label='Roll Number'
                      type='text'
                      fullWidth
                      error={!!errors.studentDto?.rollNumber}
                      helperText={errors?.studentDto?.rollNumber?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    {...register('address')}
                    margin='dense'
                    label='Address'
                    type='text'
                    fullWidth
                    error={!!errors.address}
                    helperText={errors?.address?.message}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    {...register('phone')}
                    margin='dense'
                    label='Phone'
                    type='text'
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    {...register('email')}
                    margin='dense'
                    label='Email'
                    type='text'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid>
                  <div>
                    <Controller
                      control={control}
                      name='avatar'
                      defaultValue={[]}
                      render={({
                        field: { onBlur, onChange, name, value },
                      }) => (
                        <>
                          <Dropzone onDrop={onChange} multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                              <Paper
                                variant='outlined'
                                {...getRootProps()}
                                sx={{
                                  backgroundColor: '#eee',
                                  textAlign: 'center',
                                  cursor: 'pointer',
                                  color: '#333',
                                  padding: '10px',
                                  marginTop: '20px',
                                  border: !!errors.avatar
                                    ? '1px solid red'
                                    : '',
                                }}
                              >
                                <CloudUpload
                                  sx={{
                                    marginTop: '16px',
                                    color: '#333',
                                    fontSize: '42px',
                                  }}
                                />
                                <input
                                  {...getInputProps()}
                                  name={name}
                                  onBlur={onBlur}
                                />
                                <p>
                                  Drag 'n' drop files here, or click select
                                  files
                                </p>
                              </Paper>
                            )}
                          </Dropzone>
                          <List>
                            {value.map((f, index) => (
                              <ListItem key={index}>
                                <ListItemIcon>
                                  <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText
                                  primary={f.name}
                                  secondary={f.size}
                                />
                                <IconButton
                                  onClick={() => {
                                    resetField('avatar', { defaultValue: [] });
                                  }}
                                >
                                  <Close />
                                </IconButton>
                              </ListItem>
                            ))}
                            {errors.avatar && (
                              <ListItem>
                                <ListItemText
                                  sx={{ color: 'red' }}
                                  primary={errors.avatar.message + '!'}
                                />
                              </ListItem>
                            )}
                          </List>
                        </>
                      )}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(close('ADD_STUDENT'))}>
              Cancel
            </Button>
            <Button type='submit'>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
