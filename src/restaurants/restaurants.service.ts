import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  RestaurantService: Restaurant;
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    private readonly usersService: UsersService,
  ) {}

  async create(createRestaurantInput: CreateRestaurantInput) {
    const restaurant = new this.restaurantModel(createRestaurantInput);
    restaurant.createur = await this.usersService.findOne(
      createRestaurantInput.idCreateur,
    );
    return restaurant.save();
  }

  async findOne(id: string) {
    const restaurant = await this.restaurantModel.findOne({ _id: id }).exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }
    return restaurant;
  }

  async findAll() {
    return await this.restaurantModel.find();
  }

  async update(id: string, updateRestaurantInput: UpdateRestaurantInput) {
    const existingUser = await this.restaurantModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateRestaurantInput },
        { new: true },
      )
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`Restaurant ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.deleteOne();
  }
}
