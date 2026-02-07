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
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:40px 0;">
                        <tr>
                            <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;font-family:Arial,sans-serif;color:#333;">
                                
                                <!-- Header -->
                                <tr>
                                    <td style="background:#2edd6e;padding:20px 30px;">
                                        <h2 style="margin:0;color:#ffffff;font-size:20px;">
                                        Asia Group – Yêu cầu tư vấn mới
                                        </h2>
                                    </td>
                                </tr>

                                <!-- Body -->
                                <tr>
                                <td style="padding:30px;">
                                    <p style="margin-top:0;">
                                    Bạn vừa nhận được <strong>yêu cầu tư vấn mới</strong> từ khách hàng:
                                    </p>

                                    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
                                    <tr>
                                        <td width="30%" style="font-weight:bold;border-bottom:1px solid #eee;">Họ tên</td>
                                        <td style="border-bottom:1px solid #eee;">${result.full_name}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold;border-bottom:1px solid #eee;">Email</td>
                                        <td style="border-bottom:1px solid #eee;">${result.email}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold;border-bottom:1px solid #eee;">Số điện thoại</td>
                                        <td style="border-bottom:1px solid #eee;">${result.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:bold;border-bottom:1px solid #eee;">Loại BĐS</td>
                                        <td style="border-bottom:1px solid #eee;">${result.property_type}</td>
                                    </tr>
                                    </table>

                                    <!-- Message -->
                                    <p style="margin-top:25px;font-weight:bold;">Nội dung yêu cầu</p>
                                    <div style="background:#f6f8fa;border-left:4px solid #2edd6e;padding:15px;border-radius:4px;white-space:pre-line;">
                                    ${result.message}
                                    </div>
                                </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                <td style="background:#fafafa;padding:15px 30px;font-size:12px;color:#777;text-align:center;">
                                    Dữ liệu được gửi từ website và đã lưu tự động vào hệ thống CRM.
                                </td>
                                </tr>

                            </table>
                            </td>
                        </tr>
                    </table>
                    `
                ,
            });

            console.log(`Email sent successfully for: ${result.email}`);
        } catch (err) {
            console.error('Lỗi khi gửi mail thông báo cho HR:', err);
            // Bạn không nên chặn việc lưu DB nếu mail lỗi, 
            // nhưng có thể log lại để kiểm tra SMTP.
        }
    },
};