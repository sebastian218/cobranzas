import { SET_TABLEPARAMS } from "../constants/tableParams.constants";

// SET TABLE PARAMS
export function setTableParams(page,per_page,filters){
    return { 
        type: SET_TABLEPARAMS, 
        
        payload: {
        page:page,
        per_page:per_page,
        filters: filters
    } 
};
}