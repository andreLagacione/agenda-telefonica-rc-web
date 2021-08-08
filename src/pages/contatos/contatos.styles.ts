import styled, { css } from 'styled-components';

interface SpinnerParams {
    backgroundTransparent?: boolean;
}

export const Container = styled.div`
    height: 100vh;
    overflow: hidden;

    .btn-add-contact {
        width: 200px;
    }
`;

export const Spinner = styled.div<SpinnerParams>`
    background-color: rgba(0, 0, 0, .3);

    ${props => props.backgroundTransparent && css `
        background-color: transparent;
    `}

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
      
        to {
            transform: rotate(360deg);
        }
    }

    .loader {
        animation: spin infinite 1.5s linear;
    }
`;