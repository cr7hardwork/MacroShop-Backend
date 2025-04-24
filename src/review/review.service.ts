import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { Reviews } from './review';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService  extends BaseService<Reviews> {
    constructor(protected readonly repository : ReviewRepository){
        super(repository)
    }


     async getAll(){
        return this.repository.findAllSorted();
     }


    async createReview(username: string,text : string) : Promise<Reviews>{
         return this.repository.createReview(username,text)
    }
}