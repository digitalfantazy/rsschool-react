import Image from 'next/image';
import { useRouter } from 'next/router';

// import Loading from '../Loading/Loading';
import Favorite from '../Favourite/Favourite';
// import { useGetAllRecipesQuery } from '../../api/recipeApi';
import styles from './ResultList.module.css';
import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { IRecipe } from '../../types/RecipeTypes';

interface ResultsListProps {
  recipes: IRecipe[];
  query: string;
  page: number;
}
const ResultsList: React.FC<ResultsListProps> = ({ recipes }) => {
  const router = useRouter();

  const { openDetails } = useActions();
  const { isOpen } = useAppSelector((state) => state.openDetails);

  const handleLinkClick = (id: number) => {
    openDetails();
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, details: id },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
      <div className={styles.results}>
        <ul className={styles.results_list}>
          {/* {isError && <p>Failed to load data</p>} */}
          {/* {isFetching || isLoading ? (
            <Loading />
          ) :  */}
          {recipes && recipes.length > 0 ? (
            recipes.map((item) => (
              <li className={styles.results_item} key={item.id}>
                <Favorite
                  id={item.id}
                  name={item.name}
                  ingredients={item.ingredients}
                  instructions={item.instructions}
                />
                <div className={styles.link} onClick={() => handleLinkClick(item.id)}>
                  <Image
                    src={item.image}
                    alt="dish-image"
                    width={150}
                    height={150}
                    priority={true}
                  />
                  <h3>{item.name}</h3>
                  <p>Calories: {item.caloriesPerServing}</p>
                  <p>Difficulty: {item.difficulty}</p>
                  <p>Rating: {item.rating}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No results</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResultsList;