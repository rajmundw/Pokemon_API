export const CHANGE_PAGE='page'
export const changePage=(newPage)=>{
    return {
        type: CHANGE_PAGE,
        payload:{
            page: newPage
        }
    }
}
