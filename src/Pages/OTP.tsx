import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { isInvalidDataClear, sendValidate } from '@/store/actions/login';
import InvalidDataPopup from '@/Components/InvalidDataPopup';
import { selectInvalidDataMessage } from '@/store/selectors/login';

interface Props extends RouteComponentProps<{
  code: string;
  email: string;
}> {}

const OTP: React.FC<Props> = ({ match }) => {
  const { code, email } = match.params;
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [invalidData, setInvalidData] = useState(false);
  const validateErrorMessage = useSelector(selectInvalidDataMessage);

  useEffect(() => {
    dispatch(sendValidate(email, code));
  }, []);

  useEffect(() => {
    let timer: any;

    if (invalidData) {
      timer = setTimeout(() => {
        setInvalidData(false);
        history.push('/login');
        dispatch(isInvalidDataClear());
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [invalidData]);

  useEffect(() => {
    if (validateErrorMessage) setInvalidData(true);
  }, [validateErrorMessage]);

  return (
    <>
      <div className={classes.popup}>
        {
                    invalidData ? <InvalidDataPopup text={validateErrorMessage} /> : null
                }
      </div>
    </>
  );
};

export default OTP;
const useStyles = makeStyles({
  popup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    height: '30px',
    top: 0,
  },
});
