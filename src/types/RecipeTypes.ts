export interface IRecipe {
  id: number;
  name: string;
  difficulty: string;
  caloriesPerServing: number;
  image: string;
  rating: number;
}

export interface IRecipeDetails extends IRecipe {
  name: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  message: string;
}

export interface IRecipeData {
  recipes: IRecipe[];
  limit: number;
  skip: number;
  total: number;
}
