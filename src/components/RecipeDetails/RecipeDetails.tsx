import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useGetRecipesDetailsQuery } from '../../api/recipeApi';
import Loading from '../Loading/loading';
import styles from './RecipeDetails.module.css';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import Favorite from '../Favourite/Favourite';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const query = urlParams.get('search');
  const page = urlParams.get('page');

  const { closeDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);

  const { data, isError, isFetching, isLoading } = useGetRecipesDetailsQuery(id as string);

  const handleClose = () => {
    closeDetails();
    navigate(`/?page=${page}&search=${query}`);
  };

  return (
    <>
      <div className={styles.background} onClick={handleClose}></div>
      {isOpen && (
        <div className={`${styles.recipe_details} ${isOpen ? styles.open : ''}`}>
          {isError && <p>Failed to load data</p>}
          {isLoading || isFetching ? (
            <Loading />
          ) : data ? (
            <>
              <div className={styles.details}>
                <Favorite
                  id={data.id}
                  name={data.name}
                  ingredients={data.ingredients}
                  instructions={data.instructions}
                />
                <img
                  src={data.image}
                  className={styles.image}
                  alt="dish-image"
                  width={150}
                  height={150}
                />
                <h2>{data.name}</h2>
                <p>Cook time: {data.prepTimeMinutes + data.cookTimeMinutes} min</p>
                <h3>Ingredients:</h3>
                <ul>
                  {data.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>

                <h3>Instructions:</h3>
                <ol>
                  {data.instructions.map((instruction, index) => (
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
