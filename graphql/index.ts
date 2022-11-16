import { MutationUpdaterFn } from '@apollo/client';



interface UpdateHandlerByName {
    [key: string]: MutationUpdaterFn;
}


const updateHandlerByName: UpdateHandlerByName = {}

export{
    updateHandlerByName
}