import cookie from "cookie";
import jwtDecode from "jwt-decode";
import { isBrowser } from "./isBrowser";
import redirect from "./redirect";


export const privateRouteAdmin = (context) => {

    const cookies = cookie.parse(context.req ? context.req.headers.cookie || "" : document.cookie);

    if (!isBrowser && cookies.rsht === undefined) {
        redirect(context.res, '/backoffice/signin');
    } 

    const {role}:any = jwtDecode(cookies.rsht)
     
    try{
        if (!isBrowser && role != 'ADMIN' && !isBrowser && role != 'SUPER_ADMIN') {
            redirect(context.res, '/backoffice/signin')
        }
    }catch(err){
        redirect(context.res, '/backoffice/signin');
    }
    
}