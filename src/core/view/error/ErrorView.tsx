import React from 'react';

import './ErrorView.scss';

type Props = {
    error?: Error | null;
}

const ErrorView = ({ error }: Props) => {
    return error ? (<div className="exception-view">{error.message}</div>) : null;
};

export default ErrorView;
