import { errors } from '@strapi/utils';

export default {
    async afterCreate(event) {
        const { result } = event;
        console.log(">>>> Đã bắt được sự kiện afterCreate cho:", result.email);

        try {
            // Gọi service email của Strapi
            await strapi.plugins['email'].services.email.send({
                to: process.env.EMAIL_SMTP_USER, // Thay bằng mail HR của bạn
                from: process.env.EMAIL_SMTP_USER,
                subject: `[Asia Group] Yêu cầu tư vấn mới từ ${result.full_name}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                        <h2 style="color: #13ec13;">Thông tin khách hàng mới</h2>
                        <p><strong>Họ tên:</strong> ${result.full_name}</p>
                        <p><strong>Email:</strong> ${result.email}</p>
                        <p><strong>Số điện thoại:</strong> ${result.phone_number}</p>
                        <p><strong>Loại hình bất động sản:</strong> ${result.property_type}</p>
                        <p><strong>Nội dung yêu cầu:</strong></p>
                        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
                        ${result.message}
                        </div>
                        <p style="margin-top: 20px; font-size: 0.8em; color: #777;">
                        Dữ liệu này đã được lưu tự động vào bảng Contacts trong hệ thống.
                        </p>
                    </div>
                    `,
            });

            console.log(`Email sent successfully for: ${result.email}`);
        } catch (err) {
            console.error('Lỗi khi gửi mail thông báo cho HR:', err);
            // Bạn không nên chặn việc lưu DB nếu mail lỗi, 
            // nhưng có thể log lại để kiểm tra SMTP.
        }
    },
};