import styled from 'styled-components';

export const AppComponent = styled.div`
    background-color: #6C717D;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

export const Asside = styled.aside`
    background-color: #444A58;
    height: 100%;
    width: 250px;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
`;

export const Main = styled.main`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 25px;
    overflow-y: auto;
`;
