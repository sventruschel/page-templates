(() => ({
  name: 'DetailView',
  type: 'CONTAINER_COMPONENT',
  allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      Children,
      env,
      GetMe,
      InteractionScope,
      ModelProvider,
      useAllQuery,
      getIdProperty,
    } = B;
    const isDev = env === 'dev';
    const {
      model,
      authProfile,
      pagination,
      showError,
      currentRecord,
      filter,
    } = options;
    // const repeaterRef = React.createRef();
    // const ref = React.createRef();
    // const containerRef = React.createRef();
    const displayError = showError === 'built-in';
    const skipAppend = useRef(false);
    const [results, setResults] = useState([]);

    const getFilter = React.useCallback(() => {
      debugger;
      if (isDev || !currentRecord || !model) {
        return filter;
      }

      const idProperty = getIdProperty(model);
      return {
        [idProperty.id]: { eq: currentRecord },
      };
    }, [isDev, filter, currentRecord, model]);

    const selectedFilter = getFilter();
    const hasFilter = selectedFilter && Object.keys(selectedFilter).length > 0;

    const redirect = () => {
      const history = useHistory();
      history.push(useEndpoint(redirectWithoutResult));
    };

    const One = ({ modelId }) => {
      const { loading, data, error, refetch } =
        (hasFilter &&
          useOneQuery(modelId, {
            filter: getFilter(),
          })) ||
        {};

      B.defineFunction('Refetch', () => {
        refetch();
      });

      if (loading) {
        B.triggerEvent('onLoad', loading);
        return <span>Loading...</span>;
      }

      if (error && !displayError) {
        B.triggerEvent('onError', error);
      }
      if (error && displayError) {
        return <span>{error.message}</span>;
      }

      if (data && data.id) {
        B.triggerEvent('onSuccess', data);
      } else {
        B.triggerEvent('onNoResults');
      }

      if (!data && redirectWithoutResult) {
        redirect();
      }

      return (
        data && (
          <ModelProvider value={data} id={model}>
            {children}
          </ModelProvider>
        )
      );
    };

    const { error, data, refetch } =
      model &&
      useAllQuery(model, {
        take: 1,
      });

    useEffect(() => {
      if (!isDev && data) {
        if (pagination !== 'never') {
          setResults(data.results);
          return;
        }
        skipAppend.current = false;
      }
    }, [data]);

    B.defineFunction('Refetch', () => {
      if (pagination === 'never') {
        skipAppend.current = true;
        setTimeout(() => {
          refetch();
        }, 0);
      } else {
        refetch();
      }
    });

    if (error && !displayError) {
      B.triggerEvent('onError', error);
    }

    if (results.length > 0) {
      B.triggerEvent('onSuccess', results);
    } else {
      B.triggerEvent('onNoResults');
    }

    const contentModel = () => {
      const content = (
        <div className="TESSSSSSSSSSSTTTTT">
          <ModelProvider value={results[0]} id={model}>
            <InteractionScope model={model}>
              <Children>{children}</Children>
            </InteractionScope>
          </ModelProvider>
        </div>
      );

      if (authProfile) {
        return <GetMe authenticationProfileId={authProfile}>{content}</GetMe>;
      }

      return content;
    };

    const renderContent = () => {
      if (isDev) {
        return <div>{children}</div>;
      }

      if (model) {
        return contentModel();
      }

      return <div>{children}</div>;
    };

    return <div className={classes.root}>{renderContent()}</div>;
  })(),
  styles: B => theme => {
    const { env, mediaMinWidth, Styling } = B;
    const style = new Styling(theme);
    const isDev = env === 'dev';
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      root: {
        marginTop: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[0]),
        marginRight: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[1]),
        marginBottom: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[2]),
        marginLeft: ({ options: { outerSpacing } }) =>
          getSpacing(outerSpacing[3]),
        height: ({ options: { height } }) => height,
      },
      '@keyframes loading': {
        to: {
          backgroundPositionX: '-150%',
        },
      },
      [`@media ${mediaMinWidth(600)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Portrait'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Portrait'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Portrait'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Portrait'),
        },
      },
      [`@media ${mediaMinWidth(960)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Landscape'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Landscape'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Landscape'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Landscape'),
        },
      },
      [`@media ${mediaMinWidth(1280)}`]: {
        root: {
          marginTop: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[0], 'Desktop'),
          marginRight: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[1], 'Desktop'),
          marginBottom: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[2], 'Desktop'),
          marginLeft: ({ options: { outerSpacing } }) =>
            getSpacing(outerSpacing[3], 'Desktop'),
        },
      },
    };
  },
}))();
