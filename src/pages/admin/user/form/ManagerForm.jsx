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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios, { privateAxios } from '../../../../service/axios';
var phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const getInitialValue = (user) => {
  return {
    username: user?.username ? user.username : '',
    roleId: 3,
    email: user?.email ? user.email : '',
    fullName: user?.fullName ? user.fullName : '',
    address: user?.address ? user.address : '',
    gender: user?.gender ? user.gender : 'female',
    phone: user?.phone ? user.phone : '',
    managerDto: {
      description: '',
    },
    dob: user?.dob ? user.dob : new Date(),
    avatar: user?.avatar ? user.avatar : [],
  };
};
export default function ManagerForm({ reload, setReload }) {
  const dispatch = useDispatch();
  const { openAddManager, user } = useSelector((state) => state.userForm);
  const token = JSON.parse(localStorage.getItem('token'));

  const schema = yup.object().shape({
    managerDto: yup.object().shape({
      description: yup.string().required(),
    }),
    fullName: yup.string().required(),
    phone: yup
      .string()
      .matches(phoneRegEx, 'Phone number is not valid')
      .required(),
    address: yup.string().required(),
    username: yup.string().required(),

    email: yup.string().email('Wrong email format!').required(),
    avatar: yup.array().min(1, 'Please select one file'),
    dob: yup
      .date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .required(),
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
    const parseDob = newUser.dob.toLocaleDateString();
    const inputUser = { ...newUser, dob: parseDob };
    console.log(inputUser);
    // privateAxios
    //   .post('user', formData)
    //   .then((res) => {
    //     console.log(res);
    //     alert(res.data.message.toUpperCase());
    //     dispatch(resetForm());
    //     reset(getInitialValue());
    //     setReload(!reload);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // dispatch(resetForm());
    //     // reset(getInitialValue());
    //   });
  };
  return (
    <>
      <Dialog
        open={openAddManager}
        onClose={() => dispatch(close('ADD_MANAGER'))}
        fullWidth
        maxWidth={'900px'}
      >
        <DialogTitle>MANAGER</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container gap={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  {...register('managerDto.description')}
                  margin='dense'
                  label='Description'
                  type='text'
                  fullWidth
                  error={!!errors.managerDto?.description}
                  helperText={errors?.managerDto?.description?.message}
                />
              </Grid>
              <Divider orientation='vertical' flexItem />
              <Grid item xs={12} md={7}>
                <Grid item>
                  <TextField
                    {...register('username')}
                    margin='dense'
                    label='User Name'
                    type='text'
                    fullWidth
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                  />
                </Grid>
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
                              value={'female'}
                              control={<Radio />}
                              label='Female'
                            />
                            <FormControlLabel
                              value={'male'}
                              control={<Radio />}
                              label='Male'
                            />
                          </RadioGroup>
                        </>
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Controller
                    name='dob'
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          {...field}
                          label='Date of Birth'
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.dob,
                              helperText: errors?.dob?.message,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
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
            <Button onClick={() => dispatch(close('ADD_MANAGER'))}>
              Cancel
            </Button>
            <Button type='submit'>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}