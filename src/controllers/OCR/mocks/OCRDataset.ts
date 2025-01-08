const OCRDataset = `Convert image to text?. After converting to image, you will have a text like this (or just similar to this): 
|Toán|85|94|86|94|8,0|Giỏi|Giỏi
|Vật lí|86|84|89|84|8,0|Giỏi|Giỏi
|Hóa học|80|82|86|81|8,0|Giỏi|Giỏi
|Sinh học|80|74|84|76|8,0|Giỏi|Giỏi
|Ngữ văn|80|81|74|81|8,0|Giỏi|Giỏi
|Lịch sử|84|86|89|86|8,0|Giỏi|Giỏi
|Địa lí|80|83|84|81|8,0|Giỏi|Giỏi
|Công nghệ|94|90|96|90|9,0|Xuất sắc|Xuất sắc
|Âm nhạc|84|89|83|85|8,0|Giỏi|Giỏi
|Mỹ thuật|84|89|83|85|8,0|Giỏi|Giỏi
|Thể dục|84|89|83|85|8,0|Giỏi|Giỏi
|Ngoại ngữ|1|0|1|0|1,0|Kém|Kém. 
Please extract the subject names and their corresponding average scores for the entire year (the collumn at the end of array). 
For example, extract "Toán" with the average score "8,0", "Vật lí" with the average score "8,0", and so on.
After this, please give me response at this format: 
Toán:8,0 
Vật lí:8,0
Hóa học:8,0
Sinh học:8,0
Ngữ văn:8,0
Lịch sử:8,0
Địa lí:8,0
Công nghệ:9,0
Tin học:9,0
Giáo dục công dân: 8,0
If a number equal 8,0 then convert to 8.0
Please use data in image not in dataset!!
`;
export default OCRDataset;
