import React from 'react'

import { Wrapper, Content } from './Header.styles'

import Logout from '../Logout';

const Header = () => (

    <Wrapper>
        <Content>
            <h1>Budget Track</h1>
            { localStorage.getItem('userid') ? 
            <Logout /> : null
            }
        </Content>
    </Wrapper>
);

export default Header