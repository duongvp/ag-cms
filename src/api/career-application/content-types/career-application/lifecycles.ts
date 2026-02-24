import path from 'path';

export default {
    async afterCreate(event) {
        const { result } = event;

        try {
            const attachments = [];

            // Kiểm tra nếu có dữ liệu resume và url
            if (result.resume && result.resume.url) {
                // Xây dựng đường dẫn tuyệt đối đến file trong thư mục public
                // process.cwd() trỏ đến thư mục gốc của dự án Strapi
                const filePath = path.join(process.cwd(), 'public', result.resume.url);

                attachments.push({
                    filename: result.resume.name, // Tên file gốc: ĐỀ XUẤT IN ẤN QUẢNG CÁO...
                    path: filePath,
                    contentType: result.resume.mime
                });
            }

            await strapi.plugins['email'].services.email.send({
                to: process.env.HR_EMAIL || process.env.EMAIL_SMTP_USER,
                from: process.env.EMAIL_SMTP_USER,
                subject: `[Asia Group] Ứng tuyển mới: ${result.position || 'N/A'} - ${result.first_name} ${result.last_name}`,
                attachments: attachments, // Đính kèm file vào đây
                html: `
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:40px 0;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif;color:#333;">
                                    <tr>
                                        <td style="background:#22c55e;padding:20px 28px;">
                                            <h2 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Asia Group – Hồ sơ ứng tuyển mới</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:28px;">
                                            <p>Bạn vừa nhận được hồ sơ ứng tuyển mới:</p>
                                            <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;">
                                                <tr>
                                                    <td width="30%" style="font-weight:600;border-bottom:1px solid #eee;">Ứng viên</td>
                                                    <td style="border-bottom:1px solid #eee;">${result.first_name} ${result.last_name}</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-weight:600;border-bottom:1px solid #eee;">Vị trí</td>
                                                    <td style="border-bottom:1px solid #eee;">${result.position || 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-weight:600;border-bottom:1px solid #eee;">Email</td>
                                                    <td style="border-bottom:1px solid #eee;">${result.email}</td>
                                                </tr>
                                            </table>
                                            
                                            <p style="margin-top:24px;font-weight:600;">Lời nhắn từ ứng viên:</p>
                                            <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:14px;border-radius:6px;color:#14532d;white-space:pre-line;">
                                                ${result.cover_letter || 'Không có lời nhắn'}
                                            </div>

                                            <div style="margin-top:24px;padding:14px;background:#fff9c4;border-radius:8px;font-size:13px;color:#856404;border: 1px solid #ffeeba;">
                                                📎 <strong>File đính kèm:</strong> CV/Hồ sơ đã được gửi kèm trực tiếp trong email này. Bạn có thể tải xuống ngay phía dưới.
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background:#fafafa;padding:14px 28px;font-size:12px;color:#777;text-align:center;">
                                            Email được gửi tự động từ hệ thống Asia Group.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                `
            });

            strapi.log.info(`Email kèm CV của ${result.first_name} đã được gửi thành công.`);
        } catch (err) {
            strapi.log.error('Lỗi khi xử lý đính kèm hoặc gửi mail:', err);
        }
    },
};