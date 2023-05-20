import moment from 'moment';

export const required = {
    required: true,
    message: 'Bắt buộc phải nhập trường này!',
};

export const number = {
    pattern: new RegExp(/^[0-9]*$/),
    message: 'Trường này phải là số',
};

export const minLength = {
    min: 9,
    message: 'Tối thiểu 9 kí tự',
};

export const maxLength = {
    max: 12,
    message: 'Tối đa 12 kí tự',
};

export const whiteSpace = {
    whitespace: true,
    message: 'không được để trắng',
};

export const unsignedLetters = {
    pattern: '^([a-zA-Z ])*$',
    message: 'Chỉ chứa chữ không dấu',
};

export const email = {
    type: 'email',
    message: 'Không đúng định dạng email!',
};

export function formatDate(data) {
    return moment(data).format('DD-MM-YYYY');
}

export const listTeam = [
    { value: 1, name: 'Back-End' },
    { value: 2, name: 'Front-End' },
    { value: 3, name: 'Tester' },
];

export const listGender = [
    { value: 0, name: 'Nam' },
    { value: 1, name: 'Nữ' },
];

export const defaultPageSize = 10;
export const pageSizeOptions = ['5', '10', '20'];

export const resCode = {
    success: 200,
};

export const newStatus = 1;
export const waitingStatus = 3;
export const additionalStatus = 4;
export const rejectedStatus = 6;
export const WaitingToFinishStatus = 8;
export const replenishmentStatus = 9;
export const rejectedToEndStatus = 11;
export const recordedStatus = 13;

export const today = new Date();
