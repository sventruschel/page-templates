(() => ({
  name: 'BottomNavigation',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { BottomNavigation } = window.MaterialUI.Core;
    const { env, Children } = B;
    const isDev = env === 'dev';
    const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    //   console.log(newValue);
    // };

    const bottomNavComponent = (
      <div className={isDev ? classes.dev : classes.root}>
        <BottomNavigation
          value={value}
          showLabels
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log('JOEEEE');
          }}
        >
          {React.Children.map(children, (child, index) => (
            <Children>{React.cloneElement(child)}</Children>
          ))}
        </BottomNavigation>
      </div>
    );

    return isDev ? <div>{bottomNavComponent}</div> : bottomNavComponent;
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);
    return {
      root: {
        position: 'fixed',
        bottom: '0px',
        width: '100%',
        zIndex: '1201 !important',
        '& .MuiBottomNavigation-root': {
          height: ({ options: { height } }) => height,
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      },
      dev: {
        position: 'fixed',
        bottom: '0px',
        right: '0px',
        left: '329px',
        zIndex: '1201 !important',
        '& .MuiBottomNavigation-root': {
          height: ({ options: { height } }) => height,
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      },
    };
  },
}))();
