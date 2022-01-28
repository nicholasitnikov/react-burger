import { useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

const IngredientsTabs = (props) => {

    const tabClickHandler = useCallback((slug) => {
      props.onClick(slug);
    }, [props.onClick]);
    
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={props.currentType === 'bun'} onClick={tabClickHandler}>
            Булки
        </Tab>
        <Tab value="sauce" active={props.currentType === 'sauce'} onClick={tabClickHandler}>
            Соусы
        </Tab>
        <Tab value="main" active={props.currentType === 'main'} onClick={tabClickHandler}>
            Начинки
        </Tab>
      </div>
    )
  }

  IngredientsTabs.propTypes = {
    onClick: PropTypes.func.isRequired,
    currentType: PropTypes.string.isRequired
  }

export default IngredientsTabs;