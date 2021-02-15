import styled from 'styled-components';

export const Nav = styled.nav`
    width: 100%;

    header {
        background-color: #2F333D;
    }

    .icon {
        display: inline-block;
        width: 30px;
        text-align: center;
        cursor: pointer;
    }

    li {
        display: block;
    }

    a {
        display: flex;
        align-items: center;
        padding: 15px 10px;
        color: #fff;

        &:hover {
            text-decoration: none;
            background-color: #333946;
        }
    }
`;