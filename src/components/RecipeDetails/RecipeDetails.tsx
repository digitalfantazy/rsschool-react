import React from 'react';
import { useRouter } from 'next/router';
// import { useSearchParams, useParams } from 'next/navigation';
import Image from 'next/image';
// import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useGetRecipesDetailsQuery } from '../../api/recipeApi';
import Loading from '../Loading/Loading';
import styles from './RecipeDetails.module.css';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import Favorite from '../Favourite/Favourite';

interface RecipeDetailsProps {
  id: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ id }) => {
  // const { id } = useParams<{ id: string }>();

  const router = useRouter();
  // const urlParams = useSearchParams();
  // const query = urlParams.get('search');
  // const page = urlParams.get('page');

  const { closeDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);

  const { data, isError, isFetching, isLoading } = useGetRecipesDetailsQuery(id);
  console.log(data);

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
                <Image
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
