

import { ResetPasswordGeneral } from "../ResetPasswordGeneral";

export function ResetPassword() {
    return (<>
        <ResetPasswordGeneral endpoint="http://127.0.0.1:8000/api/auth/reset-password" />
    </>)
}