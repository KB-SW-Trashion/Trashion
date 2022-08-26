import { pink } from '@mui/material/colors';
import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

export const radioSX = { '&.Mui-checked': { color: pink[200] } };
export const labelSX = { '&.Mui-focused': { color: pink[200] }, color: 'black' };
// const inputSX = { '&.Mui-focused': { color: pink[200] } };
export const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== 'focusColor',
})((p) => ({
  // input label when focused
  '& label.Mui-focused': {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: p.focusColor,
    },
  },
}));
