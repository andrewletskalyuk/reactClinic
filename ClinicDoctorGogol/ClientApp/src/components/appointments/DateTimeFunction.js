//підключаємо матеріал UA
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

//для дати і часу запису на прийом
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DateAndTimePickers() {
    const classes = useStyles();
  
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label=""
          type="datetime-local"
          defaultValue="2021-11-11T12:00"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }
        }
        />
      </form>
    );
  }
