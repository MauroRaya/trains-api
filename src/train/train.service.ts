import { Injectable } from '@nestjs/common';
import { TrainRepository } from './train.repository';
import QueryStream from 'pg-query-stream';

@Injectable()
export class TrainService {
  constructor(private readonly trainRepository: TrainRepository) {}

  async getTrains() {
    return await this.trainRepository.getTrains();
  }

  getTrainsStream(): QueryStream {
    return this.trainRepository.getTrainsStream();
  }

  async createTrains(amount: number) {
    return await this.trainRepository.createTrains(amount);
  }
}
