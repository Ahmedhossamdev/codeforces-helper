import {SetMetadata} from "@nestjs/common";


// fucntion return true of false
export const Public = () => SetMetadata('isPublic' , true)