import React from 'react';
import './Header.scss';
import HorizontalWrapper from "../layout/HorizontalWrapper";
import logo from './logo_team_rockstars_it.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router";

type Props = {
   title: string;
   subtitle?: string | null;
   canGoBack?: boolean;
};

const Header = ({title, subtitle, canGoBack = false}: Props) => {
    const history = useHistory();
    const backClasses = ['back'];
    if (canGoBack) {
        backClasses.push('active');
    }

    return (
        <div className="header">
            <FontAwesomeIcon
                size="2x"
                className={backClasses.join(' ')}
                onClick={() => history.goBack()}
                icon={faArrowLeft}
            />
            <HorizontalWrapper>
                <h1>{title}</h1>
                {subtitle && (<h5>{subtitle}</h5>)}
            </HorizontalWrapper>
            <img className="main-logo" alt="Logo - Team Rockstars IT" src={logo}/>
        </div>
    );
};
export default Header;
