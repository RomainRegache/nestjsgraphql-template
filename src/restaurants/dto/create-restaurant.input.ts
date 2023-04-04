import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => String, { description: 'Nom du restaurant' })
  nom: string;
  @Field(() => String, { description: 'Adresse' })
  adresse: string;
  @Field(() => Number, { description: 'Code postal' })
  codePostal: number;
  @Field(() => String, { description: 'Commentaire' })
  commentaire: string;
  @Field(() => String, { description: "ID de l'utilisateur créateur" })
  idCreateur: string;
}
