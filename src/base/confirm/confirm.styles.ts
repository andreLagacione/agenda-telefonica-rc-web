import styled, { css } from 'styled-components';

interface OverlayParam {
    visible: boolean;
}

interface ConfirmParam {
    visible: boolean;
}

const Overlay = styled.div<OverlayParam>`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    position: fixed;
    left: 0;
    top: -120%;
    z-index: 10;
    opacity: 0;
    transition: all .3s ease-in-out;

    ${props => props.visible && css`
      opacity: 1;
      top: 0;
    `}
`;

const Confirm = styled.div<ConfirmParam>`
    width: 100%;
    position: fixed;
    top: -120%;
    left: 0;
    z-index: 11;
    opacity: 0;
    transition: all .3s ease-in-out;

    ${props => props.visible && css`
      opacity: 1;
      top: 50px;
    `}

    .container {
        width: 100%;
        max-width: 350px;
        margin: 0 auto;

        .header {
            height: 50px;
            background-color: #2F333D;
            border-radius: 7px 7px 0 0;

            .title {
                font-size: 16px;
                line-height: 50px;
                color: #fff;
                margin-left: 15px;
            }

            .btn-remove {
                width: 50px;
                height: 50px;
                cursor: pointer;
                border-radius: 0 7px 0 0;

                &:hover {
                    background-color: #535456;
                }
            }
        }

        .content {
            background-color: #fff;
            border: 1px solid #2F333D;
            border-top: 0;
            padding: 15px;
            border-radius: 0 0 7px 7px;

            .text {
                color: #2F333D;
                margin-bottom: 15px;
                text-align: center;
                line-height: 24px;
            }
        }
    }
`;

export { Overlay, Confirm };
