(() => ({
  name: 'BottomNavigation',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      AppBar,
      Toolbar,
      IconButton,
      Typography,
      BottomNavigation,
      BottomNavigationAction,
      Menu,
    } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { Menu: MenuIcon } = window.MaterialUI.Icons;
    const {
      position,
      title,
      logoSource,
      endpoint,
      appBarVariant,
      toolbarVariant,
      square,
      elevation,
      icon,
    } = options;
    const { Link, env, useText } = B;
    const isDev = env === 'dev';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = !!anchorEl;
    const titleText = useText(title);

    const logo = useText(logoSource);
    const LogoCmp = logo && <img src={logo} className={classes.logo} alt="" />;
    const LogoComponent = endpoint.id ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link endpoint={endpoint}>{LogoCmp}</Link>
    ) : (
      LogoCmp
    );

    const AppBarComponent = (
      <div className={classes.root}>
        <BottomNavigation value="recents" showLabels>
          <BottomNavigationAction
            label="Recents"
            icon={React.createElement(Icons[icon])}
          />
          <BottomNavigationAction
            label="Recents"
            icon={React.createElement(Icons[icon])}
          />
          <BottomNavigationAction
            label="Recents"
            icon={React.createElement(Icons[icon])}
          />
          {children}
        </BottomNavigation>
      </div>
    );

    return isDev ? <div>{AppBarComponent}</div> : AppBarComponent;
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        height: ({ options: { height } }) => height,
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        color: ({ options: { color } }) => [
          style.getColor(color),
          '!important',
        ],
        zIndex: '1201 !important',
        '& .MuiBottomNavigation-root': {
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
        },
      },
    };
  },
}))();
