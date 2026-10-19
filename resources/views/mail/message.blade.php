<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }}</title>
</head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
                    <tr><td style="padding:0 0 20px;text-align:center;font-size:24px;font-weight:bold;color:#0f766e;">Eduforce</td></tr>
                    <tr>
                        <td style="padding:32px;background:#ffffff;border-top:4px solid #0f766e;border-radius:8px;">
                            <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;">{{ $title }}</h1>
                            @isset($name)
                                <p style="margin:0 0 16px;line-height:1.6;">Hi {{ $name }},</p>
                            @endisset
                            <p style="margin:0;white-space:pre-line;font-size:16px;line-height:1.7;color:#475569;">{{ $messageBody }}</p>
                            @if(!empty($actionText) && !empty($actionUrl))
                                <p style="margin:28px 0;">
                                    <a href="{{ $actionUrl }}" style="display:inline-block;padding:14px 24px;background:#0f766e;border-radius:6px;color:#ffffff;text-decoration:none;font-weight:bold;">{{ $actionText }}</a>
                                </p>
                                <p style="margin:0;font-size:12px;line-height:1.6;color:#64748b;">If the button does not work, copy this link into your browser:</p>
                                <p style="margin:8px 0 0;font-size:12px;line-height:1.6;overflow-wrap:anywhere;"><a href="{{ $actionUrl }}" style="color:#0f766e;">{{ $actionUrl }}</a></p>
                            @endif
                            @isset($note)
                                <p style="margin:24px 0 0;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;line-height:1.6;color:#64748b;">{{ $note }}</p>
                            @endisset
                        </td>
                    </tr>
                    <tr><td style="padding:20px;text-align:center;font-size:12px;color:#64748b;">&copy; {{ date('Y') }} Eduforce</td></tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
