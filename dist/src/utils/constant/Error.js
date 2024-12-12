"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorUtils = new Map([
    [
        "ERROR_INVALID",
        {
            code: "ERROR_INVALID",
            message: "Dữ liệu không phù hợp",
            data: {},
        },
    ],
    [
        "ADD_FAIL",
        {
            code: "ADD_FAIL",
            message: "Thêm mới thất bại",
            data: {},
        },
    ],
    [
        "SERVER_ERROR",
        {
            code: "SERVER_ERROR",
            message: "Lỗi hệ thống",
            data: {},
        },
    ],
    [
        "NEW_EMPTY",
        {
            code: "NEW_EMPTY",
            message: "Dữ liệu rộng",
            data: {},
        },
    ],
    [
        "EXAM_ID_DELETE_NOT_FOUND",
        {
            code: "EXAM_ID_DELETE_NOT_FOUND",
            message: "Id bài kiểm tra cần xóa không tồn tại",
            data: {},
        },
    ],
    [
        "SUBJECT_ID_DELETE_NOT_FOUND",
        {
            code: "SUBJECT_ID_DELETE_NOT_FOUND",
            message: "Id môn học cần xóa không tồn tại",
            data: {},
        },
    ],
    [
        "PROMT_IS_EMPTY",
        {
            code: "PROMT_IS_EMPTY",
            message: "Câu hỏi rỗng",
            data: {},
        },
    ],
    [
        "LOCK_AI",
        {
            code: "LOCK_AI",
            message: "Chức năng AI bị khoá",
            data: {},
        },
    ],
    [
        "CONCLUSION_NOT_EXIST",
        {
            code: "CONCLUSION_NOT_EXIST",
            message: "Kết luận không tồn tại",
            data: {},
        },
    ],
    [
        "DICTIONARY_ID_DELETE_NOT_FOUND",
        {
            code: "DICTIONARY_ID_DELETE_NOT_FOUND",
            message: "Id từ điển cần xoá không tồn tại",
            data: {},
        },
    ],
    [
        "DICTIONARY_ID_OR_ENTRY_ID_DELETE_NOT_FOUND",
        {
            code: "DICTIONARY_ID_OR_ENTRY_ID_DELETE_NOT_FOUND",
            message: "Id từ điển hoặc id ngành nghề không tồn tại",
            data: {},
        },
    ],
    [
        "UPDATED_DICTIONARY_NOT_FOUND",
        {
            code: "UPDATED_DICTIONARY_NOT_FOUND",
            message: "Không tìm thấy từ điển cần thay đổi",
            data: {},
        },
    ],
    [
        "OCR_ERROR",
        {
            code: "OCR_ERROR",
            message: "Lỗi OCR",
            data: {},
        },
    ],
    [
        "DUPLICATE_EMAIL",
        {
            code: "DUPLICATE_EMAIL",
            message: "Email đã tồn tại",
            data: {},
        },
    ],
    [
        "DUPLICATE_USER_NAME",
        {
            code: "DUPLICATE_USER_NAME",
            message: "Tên tài khoản đã tồn tại",
            data: {},
        },
    ],
    [
        "EMPTY_DATA",
        {
            code: "EMPTY_DATA",
            message: "Dữ liệu không tồn tại",
            data: {},
        },
    ],
    [
        "EMPTY_EMAIL",
        {
            code: "EMPTY_EMAIL",
            message: "Email không tồn tại!",
            data: {},
        },
    ],
    [
        "INVALID_USERNAME_PASSWORD",
        {
            code: "INVALID_USERNAME_PASSWORD",
            message: "Mật khẩu hoặc tài khoản không đúng",
            data: {},
        },
    ],
    [
        "INVALID_TOKEN",
        {
            code: "INVALID_TOKEN",
            message: "Token hết hạn",
            data: {},
        },
    ],
    [
        "UNVERIFY_EMAIL",
        {
            code: "UNVERIFY_EMAIL",
            message: "Email chưa xác thực",
            data: {},
        },
    ],
    [
        "ACCOUNT_INVALID",
        {
            code: "ACCOUNT_INVALID",
            message: "Tài khoản không tồn tại",
            data: {},
        },
    ],
    [
        "INVALID_PERMISSION",
        {
            code: "INVALID_PERMISSION",
            message: "Tính năng không được cấp quyền",
            data: {},
        },
    ],
    [
        "PERMISSION_DENIED",
        {
            code: "PERMISSION_DENIED",
            message: "Không có quyền truy cập",
        },
    ],
    [
        "EXAM_NOT_FOUND",
        {
            code: "EXAM_NOT_FOUND",
            message: "Bài kiểm tra không tồn tại",
        },
    ],
    [
        "GROUP_NOT_FOUND",
        {
            code: "GROUP_NOT_FOUND",
            message: "Nhóm không tồn tại",
        },
    ],
    [
        "DATA_NOT_FOUND",
        { code: "DATA_NOT_FOUND", message: "Dữ liệu không tồn tại" },
    ],
    [
        "FORGOT_PASSWORD_SUCCESS",
        {
            code: "FORGOT_PASSWORD_SUCCESS",
            message: "Email xác thực mật khẩu mới đã được gửi về email. Vui lòng kiểm tra!",
        },
    ],
]);
exports.default = ErrorUtils;
