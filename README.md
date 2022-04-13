# file_Handler_BaseNodejs

This is my first basic NodeJS project without ExpressJS

 Viết 1 nodejs cli xử lý file với yêu cầu như sau: 

Giả sử app của chúng ta được viết vào file index thì nó sẽ nhận được các tham số option và input như sau:


- context để xử lý file: ví dụ .  hoặc ./folder hoặc ./folder/file.jpg đây là input bắt buộc

- loại file nên xử lý: giới hạn gồm (image, txt, bash, others), --type 

- phân loại chi tiết theo tên, --name

- phân loại chi tiết theo ngày tạo file, --modify at

- phân loại chi tiết theo dung lượng file., --size

App nhận tối đa là 3/4 tham số (optional), nếu nhiều hơn sẽ thông báo lỗi, in lỗi ra màn hình, tham số input bắt buộc không có cũng sẽ thông báo ra màn hình.

App sẽ xử lý tuần tự các tham số nhận vào và phân loại theo cấp thư mục.

Dưới đây là bảng xử lý chi tiết:

![image](https://user-images.githubusercontent.com/77932499/163224792-4a3f0169-b448-4b0f-ac2a-c2a2201bea68.png)


---------- Một vài case---------------

![image](https://user-images.githubusercontent.com/77932499/163225672-d96df810-5423-4ea2-9fcf-29eeac29788b.png)

