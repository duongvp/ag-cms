export default {
    async afterCreate(event) {
        const { result } = event;

        try {
            // result.resume sẽ chứa thông tin file nếu bạn populate nó
            // Thường thì chúng ta gửi thông báo để HR vào Admin xem hoặc gửi link trực tiếp
            await strapi.plugins['email'].services.email.send({
                to: process.env.HR_EMAIL,
                from: process.env.EMAIL_SMTP_USER,
                subject: `[Asia Group] Ứng tuyển mới: ${result.position} - ${result.first_name} ${result.last_name}`,
                html: `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:40px 0;">
                        <tr>
                            <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0"
                                style="background:#ffffff;border-radius:12px;overflow:hidden;
                                    font-family:Arial,sans-serif;color:#333;">

                                <!-- Header -->
                                <tr>
                                <td style="background:#22c55e;padding:20px 28px;">
                                    <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">
                                    Asia Group – Hồ sơ ứng tuyển mới
                                    </h2>
                                </td>
                                </tr>

                                <!-- Body -->
                                <tr>
                                <td style="padding:28px;">
                                    <p style="margin-top:0;color:#444;">
                                    Bạn vừa nhận được <strong>một hồ sơ ứng tuyển mới</strong> với thông tin sau:
                                    </p>

                                    <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
                                    <tr>
                                        <td width="30%" style="font-weight:600;border-bottom:1px solid #eee;">Vị trí</td>
                                        <td style="border-bottom:1px solid #eee;">
                                        ${result.position || 'N/A'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:600;border-bottom:1px solid #eee;">Ứng viên</td>
                                        <td style="border-bottom:1px solid #eee;">
                                        ${result.first_name} ${result.last_name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-weight:600;border-bottom:1px solid #eee;">Email</td>
                                        <td style="border-bottom:1px solid #eee;">
                                        <a href="mailto:${result.email}" style="color:#15803d;text-decoration:none;">
                                            ${result.email}
                                        </a>
                                        </td>
                                    </tr>
                                    </table>

                                    <!-- Cover Letter -->
                                    <p style="margin-top:24px;font-weight:600;">Lời nhắn từ ứng viên</p>
                                    <div style="
                                    background:#f0fdf4;
                                    border-left:4px solid #22c55e;
                                    padding:14px;
                                    border-radius:6px;
                                    color:#14532d;
                                    white-space:pre-line;
                                    ">
                                    ${result.cover_letter || 'Không có'}
                                    </div>

                                    <!-- Notice -->
                                    <div style="
                                    margin-top:24px;
                                    padding:14px;
                                    background:#fafafa;
                                    border:1px dashed #e5e7eb;
                                    border-radius:8px;
                                    font-size:13px;
                                    color:#555;
                                    ">
                                    📎 Vui lòng đăng nhập vào <strong>Strapi Dashboard</strong> để xem chi tiết và tải xuống CV/Resume.
                                    </div>
                                </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                <td style="background:#fafafa;padding:14px 28px;
                                            font-size:12px;color:#777;text-align:center;">
                                    Email này được gửi tự động từ hệ thống tuyển dụng Asia Group.
                                </td>
                                </tr>

                            </table>
                            </td>
                        </tr>
                    </table>
                    `
                ,
            });
        } catch (err) {
            strapi.log.error('Lỗi gửi mail ứng tuyển:', err);
        }
    },
};