import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <ul className={`${styles.menu} pb-4 pt-4`}>
                    <a className={styles.menu_link} href="/">
                        <li className={`${styles.menu_item} p-5`}>
                            <BurgerIcon type="primary" />
                            <p className="text text_type_main-default pl-2">
                                Конструктор
                            </p>
                        </li>
                    </a>
                    <a className={styles.menu_link} href="/">
                        <li className={`${styles.menu_item} p-5`}>
                            <ListIcon type="primary" />
                            <p className="text text_type_main-default pl-2">
                                Лента заказов
                            </p>
                        </li>
                    </a>
                </ul>
                <Logo />
                <span></span>
                <a className={`${styles.menu_profile_link} p-5`} href="/">
                    <ProfileIcon type="primary" />
                    <p className="text text_type_main-default pl-2">
                        Личный кабинет
                    </p>
                </a>
            </div>
        </header>
    )
}

export default AppHeader;