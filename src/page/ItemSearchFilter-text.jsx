import React from 'react';
import PropTypes from 'prop-types';
 import { useNavigate } from 'react-router-dom';
// import Api from '../Api';

// import Text from '../../../doit-ui/Text';
import Input from '../component/Input';
import Form, { FormContext } from '../component/Form';
// import Select, { Option } from '../../../doit-ui/Select';

// Form 내부에서 사용할 컴포넌트
function SearchForm({ initValues }) {
  const { onChange, values = {} } = React.useContext(FormContext);
  
  return (
    <>
      <Input
        name="searchKeyword"
        label="검색어"
        onChange={onChange}
        value={values['searchKeyword']}
        autoFocus={true}
      />
      <button type="submit">
        검색
      </button>
    </>
  );
}

function ItemSearchFilter({ setFilter, initValues }) {
  const navigate = useNavigate();

  const handleSubmit = (params) => {
    const querystring = Object.entries(params)
      .filter(([, value]) => !!value)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    navigate(`/?${querystring}`);
    console.log(querystring);
  };

  return (
    <Form onSubmit={handleSubmit} initValues={initValues}>
      <SearchForm initValues={initValues} />
    </Form>
  );
}

ItemSearchFilter.propTypes = {
  setFilter: PropTypes.func,
  initValues: PropTypes.object,
};

export default ItemSearchFilter;