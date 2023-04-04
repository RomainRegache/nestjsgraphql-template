import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './entities/restaurant.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Restaurant.name,
        schema: RestaurantSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [RestaurantsService, RestaurantsResolver],
})
export class RestaurantsModule {}
