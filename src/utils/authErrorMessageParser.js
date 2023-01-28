export default function (errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi"

        case "auth/email-already-exists":
            return "Kullanıcı zaten kayıtlı"

        case "auth/email-already-in-use":
            return "Bu e-posta adresi zaten kayıtlı"

        case "auth/user-not-found":
            return "Kullanıcı bulunamadı"

        case "auth/weak-password":
            return "Parola çok zayıf"

        case "auth/network-request-failed":
            return "Lütfen internetinizi bağlayın."

        case "auth/wrong-password":
            return "Parolanız geçersiz"

        default:
            return errorCode
    }
}