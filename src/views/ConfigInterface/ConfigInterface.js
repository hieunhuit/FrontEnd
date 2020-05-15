import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import GlobalLoading from 'components/GlobalLoading/GlobalLoading.js';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select';
import allActions from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import './ConfigInterface.css';
import { useHistory } from 'react-router-dom';
ConfigInterface.propTypes = {};
const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};
const useStyles = makeStyles(styles);
function ConfigInterface(props) {
  const classes = useStyles();
  const history = useHistory();
  const { interfacesConfigured, interfacesAvailable } = useSelector((state) => state.interfaces);
  const { loading, callSuccess } = useSelector((state) => state.ui);
  const [sensor, setSensor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    function handleRouting() {
      if (callSuccess) {
        history.push('/admin/interface');
      }
    }
    handleRouting();
  }, [callSuccess]);
  const renderSensor = () => {
    let xhtml = null;
    if (interfacesAvailable)
      xhtml = interfacesAvailable.map((sensor, index) => {
        return (
          <option key={index} value={sensor.interfaceName}>
            {sensor.interfaceName}
          </option>
        );
      });
    return xhtml;
  };
  const renderHomeNet = () => {
    let xhtml = null;
    if (interfacesAvailable) {
      let index = interfacesAvailable.findIndex((item) => item.interfaceName === sensor);
      if (index > -1) {
        xhtml = (
          <option>{`${interfacesAvailable[index].ipAddress}/${interfacesAvailable[index].subnetMask}, 127.0.0.1`}</option>
        );
      }
    }
    return xhtml;
  };
  const renderExternalNet = () => {
    let xhtml = null;
    if (interfacesAvailable) {
      let index = interfacesAvailable.findIndex((item) => item.interfaceName === sensor);
      if (index > -1) {
        xhtml = (
          <option>{`!${interfacesAvailable[index].ipAddress}/${interfacesAvailable[index].subnetMask}, !127.0.0.1`}</option>
        );
      }
    }
    return xhtml;
  };
  const handleSensorChange = (event) => {
    setSensor(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(allActions.interfaceActions.createInterface({ interfaceName: sensor, description: description }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>General infomation</h4>
        </CardHeader>
        <CardBody>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputState">Interface</label>
              <select id="inputState" className="form-control" onChange={handleSensorChange} value={sensor}>
                <option value=""></option>
                {renderSensor()}
              </select>
              {/* <Select id="inputState" className="form-control" name="ruleSample" /> */}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputAddress">Description</label>
              <input type="text" className="form-control" id="inputAddress" onChange={handleDescriptionChange} />
            </div>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Setting variable</h4>
        </CardHeader>
        <CardBody>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputState">Home Net</label>
              <select id="inputState" className="form-control">
                {renderHomeNet()}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputState">External Net</label>
              <select id="inputState" className="form-control">
                {renderExternalNet()}
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>
        Create
      </button>
      {loading && <GlobalLoading />}
    </form>
  );
}

export default ConfigInterface;
