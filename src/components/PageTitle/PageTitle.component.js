import React from 'react';
import Helmet from 'react-helmet';

const PageTitle = ({ title }) => {
    let defaultTitle =
        '252.mn';

    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export default PageTitle;
