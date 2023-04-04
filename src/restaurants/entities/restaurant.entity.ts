import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
@Schema()
@ObjectType()
export class Restaurant {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Prop()
  @Field(() => String, { description: 'Nom du restaurant ' })
  nom: string;
  @Prop()
  @Field(() => String, { description: 'Adresse ' })
  adresse: string;
  @Prop()
  @Field(() => Number, { description: 'Code postal ' })
  codePostal: number;
  @Prop()
  @Field(() => String, { description: 'Commentaire ' })
  commentaire: string;
  @Prop()
  @Field(() => User, { description: "Utilisateur l'ajoutant" })
  createur: User;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
