import { IsString} from 'class-validator';

export class updateOrderUrl{
    @IsString()
    url : string
}