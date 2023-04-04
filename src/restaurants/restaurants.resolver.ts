import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantsService.update(
      updateRestaurantInput._id,
      updateRestaurantInput,
    );
  }

  @Mutation(() => Restaurant)
  removeRestaurant(@Args('_id', { type: () => String }) id: string) {
    return this.restaurantsService.remove(id);
  }
}
