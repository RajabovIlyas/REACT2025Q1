import { SiteTheme } from '../../entities/theme';
import { useTheme } from '../../app/providers/theme';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();

    const changeTheme = () => {
        const newTheme =
            theme === SiteTheme.LIGHT ? SiteTheme.DARK : SiteTheme.LIGHT;
        toggleTheme(newTheme);
    };

    return (
        <div className="toggle-switch">
            <label className="switch-label">
                <input
                    type="checkbox"
                    checked={theme === SiteTheme.LIGHT}
                    className="checkbox"
                    onChange={changeTheme}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

export default ThemeSwitch;
