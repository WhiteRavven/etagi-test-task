const fs = require('fs');
import {parse} from 'csv-parse';

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

const strToNumber = (str: string) => +str.replace(',', '.')

async function main() {
    const data = await new Promise<any[]>((resolve, reject) => {
        let data = <any>[];

        fs.createReadStream("flats-data.csv")
            .pipe(parse({delimiter: ",", from_line: 2}))
            .on("data", function (row: any) {
                data.push(row);
            }).on('end', function () {
            resolve(data);
        }).on('error', function (error: any) {
            reject(error);
        });
    });

    const records = data.map(row => ({
        id: strToNumber(row[0]),
        floor: strToNumber(row[1]),
        pos_on_floor: strToNumber(row[2]),
        price: strToNumber(row[3]),
        rooms: strToNumber(row[4]),
        area_total: strToNumber(row[5]),
        area_kitchen: strToNumber(row[6]),
        area_live: strToNumber(row[7]),
        layout_image: row[8],
    }));

    await prisma.flats.deleteMany();

    await prisma.flats.createMany(
        {data: records}
    );
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })