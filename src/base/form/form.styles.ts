import styled, { css } from 'styled-components';

interface FormParams {
    withoutLabel?: boolean;
}

const Form = styled.div<FormParams>`
    .validate-message {
        font-size: 13px;
    }

    .icon {
        position: absolute;
        right: 25px;
        top: 34px;

        ${props => props.withoutLabel && css `
            top: 10px;
        `}
    }

    .btn-save {
        width: 75px;
    }
`;

export default Form;