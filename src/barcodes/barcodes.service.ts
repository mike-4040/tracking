import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_CONNECTION } from '../constants';

@Injectable()
export class BarcodesService {
  constructor(@Inject(PG_CONNECTION) private readonly pgConnection: Pool) {}

  async getBarcodes() {
    const query = `
      SELECT *
      FROM barcodes `;

    const { rows: barcodes } = await this.pgConnection.query(query);

    return barcodes;
  }

  async insertBarcode(barcode: string, scannerId: string, accountId: string) {
    const query = `
      INSERT INTO barcodes
        (barcode, scanner_id, created_at, account_id)
      VALUES ($1, $2, $3, $4)
      RETURNING * `;
    const params = [barcode, scannerId, Date.now(), accountId];

    const { rows } = await this.pgConnection.query(query, params);

    const [barcodeRecord] = rows;

    return barcodeRecord;
  }
}
