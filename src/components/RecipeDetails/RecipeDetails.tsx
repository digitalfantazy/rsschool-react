import React, { useEffect, useState } from 'react';
import { IRecipeDetails } from '../../types/RecipeTypes';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';

import { getRecipesDetails } from '../../api/getRecipesAPI';
import Loading from '../loading/loading';
import styles from './RecipeDetails.module.css';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<IRecipeDetails | null>(null);
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const query = urlParams.get('search');
  const page = urlParams.get('page');
  const { isDetailsOpen, setIsDetailsOpen } = useOutletContext<{
    isDetailsOpen: boolean;
    setIsDetailsOpen: (isOpen: boolean) => void;
  }>();

  useEffect(() => {
    setLoading(true);
    setDetails(null);
    if (id) {
      getRecipesDetails(id as string)
        .then((data) => {
          if (data && data.message) {
            setDetails(null);
          } else {
            setDetails(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
          setDetails(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleClose = () => {
    setIsDetailsOpen(false);
    navigate(`/?page=${page}&search=${query}`);
  };

  return (
    <>
      {/* <div className={styles.background} onClick={handleClose}></div> */}
      {isDetailsOpen && (
        <div className={`${styles.recipe_details} ${isDetailsOpen ? styles.open : ''}`}>
          {loading ? (
            <Loading />
          ) : details ? (
            <>
              <div className={styles.details}>
                <img
                  src={details.image}
                  className={styles.image}
                  alt="dish-image"
                  width={150}
                  height={150}
                />
                <h2>{details.name}</h2>
                <p>Cook time: {details.prepTimeMinutes + details.cookTimeMinutes} min</p>
                {details.ingredients && details.ingredients.length > 0 && (
                  <>
                    <h3>Ingredients:</h3>
                    <ul>
                      {details.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </>
                )}
                {details.instructions && details.instructions.length > 0 && (
                  <>
                    <h3>Instructions:</h3>
                    <ol>
                      {details.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </>
                )}
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
