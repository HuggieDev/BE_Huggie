export const getToday = () => {
    const date = new Date()
    const yyyy = date.getFullYear()
    const mm = (date.getMonth() + 1 + '').padStart(2, '0')
    const dd = (date.getDate() + '').padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
}

export const getPagination = ({
    page = 1,
    pageSize = 24,
}: {
    page: number
    pageSize: number
}): number => {
    let start = 0
    if (page <= 0) page = 1
    else start = (page - 1) * pageSize

    return start
}

export const getRefreshTokenInCookie = (cookies: string) => {
    return cookies.split('refreshToken=')[1]?.split(';')[0]
}
