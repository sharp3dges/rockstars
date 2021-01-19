import React from "react";

import './HorizontalWrapper.scss';

type Props = {
  children: React.ReactNode;
};

const HorizontalWrapper = ({children}: Props) => (
    <div className="horizontal-wrapper">{children}</div>
);

export default HorizontalWrapper;
