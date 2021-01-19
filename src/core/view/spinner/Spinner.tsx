import React from 'react';
import './Spinner.scss';

const Spinner = () => (
    <div className="spinner">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{margin:'auto', display:'block'}}
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                r="32"
                strokeWidth="8"
                stroke="#3e6d8d"
                strokeDasharray="50.26548245743669 50.26548245743669"
                fill="none"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                />
            </circle>
        </svg>
    </div>
);

export default Spinner;
