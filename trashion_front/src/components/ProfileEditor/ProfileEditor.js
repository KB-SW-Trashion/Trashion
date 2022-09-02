import React from 'react';
import { useForm } from 'react-hook-form';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { radioSX, labelSX, CssTextField } from '../ProductEditor/CssInput';

export default function ProductEditor() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        닉네임
        <br />
        <CssTextField required id="standard-required" label="Required" variant="standard" focusColor="#f8bbd0" {...register('nickName')} />
      </div>

      <p>
        상의 사이즈
        <br />
        <FormControl>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
            <FormControlLabel value="XS" control={<Radio sx={radioSX} />} label="XS" />
            <FormControlLabel value="S" control={<Radio sx={radioSX} />} label="S" />
            <FormControlLabel value="M" control={<Radio sx={radioSX} />} label="M" />
            <FormControlLabel value="L" control={<Radio sx={radioSX} />} label="L" />
            <FormControlLabel value="XL" control={<Radio sx={radioSX} />} label="XL" />
            <FormControlLabel value="XXL" control={<Radio sx={radioSX} />} label="XXL" />
          </RadioGroup>
        </FormControl>
      </p>
      <p>
        하의 사이즈
        <br />
        <CssTextField required id="standard-required" label="ex. 26, 36, 28" variant="standard" focusColor="#f8bbd0" {...register('bottom_size')} />
      </p>
      <p>
        키
        <br />
        <CssTextField required id="standard-required" label="cm" variant="standard" focusColor="#f8bbd0" {...register('height')} />
      </p>
      <p>
        몸무게 <br />
        <CssTextField required id="standard-required" label="kg" variant="standard" focusColor="#f8bbd0" {...register('weight')} />
      </p>
      <br />
      <br />
      <Fab type="submit" variant="extended" sx={{ width: '8rem', bgcolor: '#f8bbd0', ml: '1rem', mr: '1rem', fontWeight: 'bolder' }}>
        프로필 수정
      </Fab>
    </form>
  );
}
