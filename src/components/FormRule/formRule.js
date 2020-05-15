import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import allActions from '../../actions';
import Select from 'react-select';
const FormRule = () => {
  const { handleSubmit, register, errors } = useForm();
  const dispatch = useDispatch();
  const { sid } = useParams();
  const { ruleEditing } = useSelector((state) => state.rule);
  const [rule, setRule] = React.useState(ruleEditing ? ruleEditing.rule : '');
  const onSubmit = (values) => {
    if (ruleEditing && ruleEditing.id) dispatch(allActions.ruleActions.updateRule(values.rule));
    else dispatch(allActions.ruleActions.createRule(sid, values.rule));
  };
  const Samples = [
    {
      id: 1,
      name: 'PING',
      content:
        'alert icmp any any -> $HOME_NET any (classtype:icmp-event; sid:10000001; rev:1;priority:1; msg:"ICMP  test";gid:1;)',
    },
    {
      id: 4,
      name: 'TCP ATTACK',
      content:
        'alert tcp any any -> $HOME_NET !21 (classtype:tcp-connection; sid:10000002; rev:1;priority:2; msg:"TCP  test";gid:1;)',
    },
    {
      id: 5,
      name: 'UDP ATTACK',
      content:
        'alert udp any any -> $HOME_NET any (classtype:icmp-event; sid:10000001; rev:1;priority:1; msg:"UDP  test";gid:1;)',
    },
  ];
  const renderSample = () => {
    let xhtml = null;
    xhtml = Samples.map((item) => <option value={item.id}>{item.name}</option>);
    return xhtml;
  };
  const handleChangeRuleSample = (event) => {
    let value = event.target.value;

    setRule(Samples.find((item) => item.id == value) ? Samples.find((item) => item.id == value).content : '');
  };
  const handleRuleChange = (event) => {
    setRule(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label style={{ width: '60px' }} for="inputState">
            Sample:
          </label>
          <select id="inputState" className="form-control" onChange={handleChangeRuleSample} name="ruleSample">
            <option value=""></option>
            {renderSample()}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label for="rule" style={{ width: '60px' }}>
            Rule:
          </label>
          <textarea
            class="form-control"
            name="rule"
            rows="5"
            id="rule"
            onChange={handleRuleChange}
            value={rule}
            ref={register({})}
          ></textarea>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
export default FormRule;
