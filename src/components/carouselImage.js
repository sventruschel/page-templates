(() => ({
  name: 'CarouselImage',
  type: 'STEP_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env } = B;
    const isDev = env === 'dev';
    const isEmpty = children.length === 0;
    const { label, icon } = options || {};
    const { stepLabelData, setStepLabelData, active, isFirstRender } = parent;

    const StepContent =
      isEmpty && isDev ? (
        <div className={classes.root}>
          <img src={options.imageSource} alt="carousel" />
        </div>
      ) : (
        <div className={classes.root}>
          <img src={options.imageSource} alt="carousel" />
        </div>
      );

    const StepCmp = <>{active ? StepContent : null}</>;

    useEffect(() => {
      if (active && !isFirstRender) {
        B.triggerEvent('OnStepActive');
      } else if (!active && !isFirstRender) {
        B.triggerEvent('OnStepInactive');
      }
    }, [active, isFirstRender]);

    useEffect(() => {
      if (setStepLabelData) {
        setStepLabelData({
          ...stepLabelData,
          [`label${index}`]: label,
          [`icon${index}`]: icon,
        });
      }
    }, [setStepLabelData, index, label, icon]);

    return isDev ? <div className={classes.wrapper}>{StepCmp}</div> : StepCmp;
  })(),
  styles: () => () => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        width: ({ options: { width } }) => (width === '' ? '100%' : width),
        height: ({ options: { height } }) => (height === '' ? 'auto' : height),
        objectFit: 'cover',
      },
    },
  }),
}))();
