import React from 'react';
import { useRouter } from 'next/router';
// import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

// import { useGetRecipesDetailsQuery } from '../../api/recipeApi';
// import Loading from '../Loading/Loading';
import styles from './RecipeDetails.module.css';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import Favorite from '../Favourite/Favourite';
import { IRecipeDetails } from '../../types/RecipeTypes';

interface RecipeDetailsProps {
  recipes: IRecipeDetails[];
  id: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ id, recipes }) => {
  const router = useRouter();
  const { closeDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);
  // const { data, isError, isFetching, isLoading } = useGetRecipesDetailsQuery(id);

  const recipesObj = recipes.reduce(
    (obj, item) => {
      obj[item.id] = item;
      return obj;
    },
    {} as Record<string, IRecipeDetails>,
  );

  const handleClose = () => {
    closeDetails();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, details: undefined },
      },
      undefined,
      { shallow: true },
    );
  };

  const recipe = recipesObj[id];

  return (
    <>
      <div className={styles.background} onClick={handleClose}></div>
      {isOpen && (
        <div className={`${styles.recipe_details} ${isOpen ? styles.open : ''}`}>
          {recipe ? (
            <>
              <div className={styles.details}>
                <Favorite
                  id={recipe.id}
                  name={recipe.name}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                />
                <Image
                  src={recipe.image}
                  className={styles.image}
                  alt="dish-image"
                  width={150}
                  height={150}
                />
                <h2>{recipe.name}</h2>
                <p>Cook time: {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>

                <h3>Instructions:</h3>
                <ol>
                  {recipe.instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>

                <button onClick={handleClose}>Close</button>
              </div>
            </>
          ) : (
            <p>No recipe details found</p>
          )}
        </div>
      )}
    </>
  );
};

export default RecipeDetails;
