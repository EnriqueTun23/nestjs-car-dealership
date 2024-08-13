import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interface/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Carolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  create({ brand, model }: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      brand,
      model,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, data: UpdateCarDto) {
    let carDb = this.findOneById(id);

    if (data.id && data.id !== id) {
      throw new BadRequestException('Car id us not valid inside body');
    }
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...data,
          id,
        };
        return carDb;
      }

      return car;
    });

    return carDb;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
