import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TrainService } from './train.service';
import type { Response } from 'express';
import * as JSONStream from 'JSONStream';

@Controller("train")
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  async getTrains() {
    return await this.trainService.getTrains();
  }

  @Get("stream")
  getTrainsStream(@Res() res: Response) {
    const stream = this.trainService.getTrainsStream();

    res.setHeader('Transfer-Encoding', 'chunked');

    stream
      .pipe(JSONStream.stringify())
      .pipe(res);
  }

  @Post(":amount")
  async createTrains(@Param("amount") param: string) {
    const amount = Number(param);
    return await this.trainService.createTrains(amount);
  }
}
