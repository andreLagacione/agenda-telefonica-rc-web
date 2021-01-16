import styled from 'styled-components';

export const Nav = styled.nav`
    width: 100%;

    header {
        background-color: #2F333D;
    }

    li, a {
        display: block;
    }

    a {
        padding: 10px;
        color: #fff;

        &:hover {
            text-decoration: none;
            background-color: #333946;
        }
    }
`;