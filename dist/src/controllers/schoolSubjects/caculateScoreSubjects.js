"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.caculateScoreSubjects = void 0;
const caculateScoreSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scores } = req.body;
    //console.log("score", scores);
    const Unit_Score = new Map([
        [
            "A00",
            (+scores.Math.value + +scores.Physics.value + +scores.Biology.value) / 3,
        ],
        [
            "A01",
            (+scores.Math.value + +scores.Physics.value + +scores.English.value) / 3,
        ],
        [
            "A02",
            (+scores.Math.value + +scores.Physics.value + +scores.Biology.value) / 3,
        ],
        [
            "A03",
            (+scores.Math.value + +scores.Physics.value + +scores.History.value) / 3,
        ],
        [
            "A04",
            (+scores.Math.value + +scores.Physics.value + +scores.Geography.value) /
                3,
        ],
        [
            "A05",
            (+scores.Math.value + +scores.Chemistry.value + +scores.History.value) /
                3,
        ],
        [
            "A06",
            (+scores.Math.value + +scores.Chemistry.value + +scores.Geography.value) /
                3,
        ],
        [
            "A07",
            (+scores.Math.value + +scores.History.value + +scores.Geography.value) /
                3,
        ],
        [
            "A08",
            (+scores.Math.value +
                +scores.History.value +
                +scores.CivicEducation.value) /
                3,
        ],
        [
            "A09",
            (+scores.Math.value +
                +scores.Geography.value +
                +scores.CivicEducation.value) /
                3,
        ],
        [
            "A10",
            (+scores.Math.value +
                +scores.Physics.value +
                +scores.CivicEducation.value) /
                3,
        ],
        [
            "A11",
            (+scores.Math.value +
                +scores.Chemistry.value +
                +scores.CivicEducation.value) /
                3,
        ],
        [
            "B00",
            (+scores.Math.value + +scores.Biology.value + +scores.Chemistry.value) /
                3,
        ],
        [
            "B01",
            (+scores.Math.value + +scores.Biology.value + +scores.History.value) / 3,
        ],
        [
            "B02",
            (+scores.Math.value + +scores.Geography.value + +scores.Biology.value) /
                3,
        ],
        [
            "B03",
            (+scores.Math.value + +scores.Biology.value + +scores.Literature.value) /
                3,
        ],
        [
            "B04",
            (+scores.Math.value +
                +scores.Biology.value +
                +scores.CivicEducation.value) /
                3,
        ],
        [
            "C00",
            (+scores.Math.value + +scores.Geography.value + +scores.History.value) /
                3,
        ],
        [
            "C01",
            (+scores.Math.value +
                +scores.Literature.value +
                +scores.Geography.value) /
                3,
        ],
        [
            "C02",
            (+scores.Math.value + +scores.Biology.value + +scores.Literature.value) /
                3,
        ],
        [
            "D01",
            (+scores.Math.value + +scores.Literature.value + +scores.English.value) /
                3,
        ],
    ]);
    const Result = new Map([
        [
            "A",
            "Khối A phát triển tới 18 tổ hợp môn, trong đó luôn có môn Toán là 1 trong 3 môn thi. Tuy nhiên, khối A0 và A01 là hai khối thi phổ biến và nhiều trường lựa chọn nhất. Các khối thi còn lại tuy vẫn có trường tuyển sinh nhưng không nhiều.\nKhi lựa chọn điểm thi khối A để xét tuyển đại học, thí sinh có rất nhiều sự lựa chọn để nộp hồ sơ vào các ngành như:\n- Các ngành kỹ thuật, công nghệ thông tin: Cơ khí, Kỹ thuật phần mềm\n- Các ngành kinh tế, tài chính, quản lý, pháp luật: quản trị kinh doanh, kinh doanh quốc tế, quản trị nhân lực, tài chính - ngân hàng, Kế toán, luật kinh tế…\n- Các ngành dịch vụ, du lịch: quản trị nhà hàng, khách sạn…\n- Các ngành truyền thông, marketing: quan hệ công chúng, truyền thông…\n- Các ngành công an, quân đội.",
        ],
        [
            "B",
            "Khối B được nhiều người biết tới với các ngành về y, dược: Y đa khoa, Y học dự phòng, Y học cổ truyền, Điều dưỡng, Răng - hàm - mặt, Kỹ thuật hình ảnh y học, Dược học, Dinh dưỡng...\nTuy nhiên, còn rất nhiều ngành khác lựa chọn điểm thi khối B để xét tuyển như:\n- Các ngành về môi trường: Công nghệ kỹ thuật môi trường, Kỹ thuật trắc địa - bản đồ, Quản lý đất đai, Quản lý tài nguyên và môi trường, Khí tượng và Khí hậu học, Công nghệ kỹ thuật tài nguyên nước...\n- Các ngành nông - lâm nghiệp: Công nghệ sinh học, Bảo vệ thực vật, Khoa học cây trồng…\n- Các ngành chăn nuôi, thú y…",
        ],
        [
            "C",
            "Tổ hợp môn khối C luôn bắt buộc có Ngữ văn là 1 trong 3 môn thi. Đây là khối thi nghiêng về các ngành khoa học xã hội như: báo chí, khoa học xã hội và nhân văn, sư phạm, luật, triết học, chính trị học, tâm lý học, công an, quân đội…",
        ],
        [
            "D",
            "Khi đăng ký xét tuyển điểm thi khối D, thí sinh có thể lựa chọn các ngành như:\n- Các ngành ngôn ngữ: Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Ngôn ngữ Hàn Quốc…\n- Các ngành tài chính, kinh tế, luật: Quản trị kinh doanh, tài chính ngân hàng, kinh doanh quốc tế…\n- Các ngành khoa học xã hội và nhân văn, sư phạm: Triết học, báo chí, quan hệ quốc tế, giáo dục mầm non, giáo dục tiểu học, …\n- Các ngành nông - lâm - ngư nghiệp: Quản lý tài nguyên rừng, quản lý đất đai, khuyến nông…\n- Các ngành công an, quân đội.",
        ],
    ]);
    const maxValue = Math.max(...Unit_Score.values());
    if (maxValue === 0)
        return res.send({
            code: 200,
            data: [],
        });
    const keys = [];
    Unit_Score.forEach((value, key) => {
        var _a;
        if (value === maxValue) {
            console.log(value, maxValue);
            if (keys.findIndex((item) => item.title.includes(key[0])) === -1)
                keys.push({
                    title: key[0],
                    description: (_a = Result.get(key[0])) !== null && _a !== void 0 ? _a : "",
                });
        }
    });
    return res.send({
        code: 200,
        data: keys,
    });
});
exports.caculateScoreSubjects = caculateScoreSubjects;
