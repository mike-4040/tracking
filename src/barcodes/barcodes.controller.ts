import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { BarcodesService } from './barcodes.service';
import { CreateBarcodeDto } from './create-barcode.dto';

@Controller('barcodes')
export class BarcodesController {
  constructor(private readonly barcodesService: BarcodesService) {}

  @Post(':accountId')
  async post(@Param() params: any, @Body() createBarcodeDto: CreateBarcodeDto) {
    const { accountId } = params;
    const { barcode, scannerId } = createBarcodeDto;

    const { id } = await this.barcodesService.insertBarcode(
      barcode,
      scannerId,
      accountId,
    );

    return { id };
  }

  @Get()
  async get() {
    return await this.barcodesService.getBarcodes();
  }
}
