import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TrainService } from './train.service';
import type { Response } from 'express';
import * as JSONStream from 'JSONStream';
import { pipeline } from 'stream/promises';

@Controller("train")
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Get()
  async getTrains() {
    return await this.trainService.getTrains();
  }

  @Get("stream")
  async getTrainsStream(@Res() res: Response) {
    const stream = this.trainService.getTrainsStream();

    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    await pipeline(stream, JSONStream.stringify(), res);
  }

  @Post(":amount")
  async createTrains(@Param("amount") param: string) {
    const amount = Number(param);
    return await this.trainService.createTrains(amount);
  }
}
