import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";

const SearchPage = props => {
  const { data } = props;

  return (
    <Main>
      <Article>
        <PageHeader title="Search by" algolia={true} />
      </Article>
    </Main>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;
