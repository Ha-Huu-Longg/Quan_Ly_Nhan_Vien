export function ListStatus({ record }) {
    if (record.status === 1) {
        return 'Lưu mới';
    } else if (record.status === 2) {
        return 'Chờ';
    } else if (record.status === 3) {
        return 'Chờ xử lý';
    } else if (record.status === 4) {
        return 'Yêu cầu bổ sung';
    } else if (record.status === 5) {
        return 'Đã duyệt';
    } else if (record.status === 6) {
        return 'Từ chối';
    } else if (record.status === 7) {
        return 'Đang hoạt động';
    } else if (record.status === 8) {
        return 'Chờ xử lý kết thúc';
    } else if (record.status === 9) {
        return 'Yêu cầu bổ sung';
    } else if (record.status === 10) {
        return 'Kết thúc';
    } else if (record.status === 11) {
        return 'Từ chối kết thúc';
    } else if (record.status === 12) {
        return 'Đã kết thúc';
    } else if (record.status === 13) {
        return 'Đã lưu hồ sơ';
    } else if (record.status === 15) {
        return 'Lưu mới';
    } else if (record.status === 16) {
        return 'Chờ duyệt';
    } else if (record.status === 17) {
        return 'Yêu cầu bổ sung';
    } else if (record.status === 18) {
        return 'Đã duyệt';
    } else if (record.status === 19) {
        return 'Từ chối';
    }
}
