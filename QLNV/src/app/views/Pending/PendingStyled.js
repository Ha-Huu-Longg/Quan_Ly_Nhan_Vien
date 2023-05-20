import styled from 'styled-components';
import { Modal } from 'antd';

export const HeaderStyled = styled.div`
    .ant-table-thead .ant-table-cell {
        background-color: #373e58;
        color: #fff;
    }
`;

export const ImageMaskCircle = styled.div`
    .ant-image-mask {
        border-radius: 50%;
    }
`;

export const StyledModal = styled(Modal)`
    .ant-modal-content {
        overflow: hidden;
        height: 440;
    }
    .ant-modal-body {
        height: 440;
        overflow: hidden;
    }

    .ant-modal-footer {
        position: absolute;
        bottom: 0;
    }
`;

// export const StyledModal = styled(Modal)`
// .ant-modal-content{
//     overflow: hidden;
//     height: 90vh;
// }
// .ant-modal-body{
//     min-height: 76vh;
//     overflow: hidden;
// }

// .ant-modal-footer{
//     position: absolute;
//     bottom: 0;
// }
// `;

export const StyleButton = (backgroundColor) => {
    return { backgroundColor: backgroundColor, color: 'white', margin: 0 };
};
