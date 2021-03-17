(() => ({
  name: 'Rating',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const { Box, FormControl, FormHelperText } = window.MaterialUI.Core;
    const { Rating } = window.MaterialUI.Lab;
    const { env, getCustomModelAttribute, useText } = B;
    const isDev = env === 'dev';

    const {
      customModelAttribute: customModelAttributeObj,
      size,
      readonly,
      icon,
      iconSelected,
      nameAttribute,
      validationValueMissing,
      error,
      helperText,
    } = options;

    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
    } = customModelAttributeObj;

    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );

    const [errorState, setErrorState] = useState(error);
    const [helper, setHelper] = useState(useText(helperText));
    const [afterFirstInvalidation, setAfterFirstInvalidation] = useState(false);
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const value = currentValue;

    const IconEmptyComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const IconSelectedComponent = React.createElement(Icons[iconSelected], {
      className: classes.root,
    });

    const { name: customModelAttributeName, validations: { required } = {} } =
      customModelAttribute || {};
    const nameAttributeValue = useText(nameAttribute);

    const handleValidation = () => {
      const hasError = required && !value;
      setErrorState(hasError);
      const message = useText(hasError ? validationValueMissing : helperText);
      setHelper(message);
    };

    const validationHandler = () => {
      const hasError = required && !value;
      setAfterFirstInvalidation(hasError);
      handleValidation();
    };

    const handleChange = (event, newValue) => {
      setCurrentValue(newValue);
      if (afterFirstInvalidation) {
        handleValidation();
      }
    };

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    const ratingBox = (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <FormControl required={required} error={errorState}>
            <Rating
              className={classes.root}
              name={nameAttributeValue || customModelAttributeName}
              value={value}
              defaultValue={customModelAttributeObj.value}
              precision={0.5}
              size={size}
              onChange={handleChange}
              readOnly={readonly}
              emptyIcon={IconEmptyComponent}
              icon={IconSelectedComponent}
              onBlur={validationHandler}
            />
          </FormControl>
          {helper && (
            <FormHelperText classes={{ root: classes.helper }}>
              {helper}
            </FormHelperText>
          )}
          <input
            className={classes.validationInput}
            onInvalid={validationHandler}
            type="text"
            tabIndex="-1"
            required={required}
            value={value}
          />
        </Box>
      </div>
    );

    return isDev ? <div>{ratingBox}</div> : <div>{ratingBox}</div>;
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);

    return {
      root: {
        '& .MuiRating-iconEmpty': {
          color: ({ options: { emptyColor } }) => style.getColor(emptyColor),
        },
        '& .MuiRating-iconFilled': {
          color: ({ options: { filledColor } }) => style.getColor(filledColor),
        },
        '& .MuiRating-iconHover': {
          color: ({ options: { hoverColor } }) => style.getColor(hoverColor),
        },
        '&.MuiSvgIcon-root': {
          fontSize: ({ options: { size } }) => style.getIconSize(size),
        },
      },
      helper: {},
      validationInput: {
        height: 0,
        width: 0,
        fontSize: 0,
        padding: 0,
        border: 'none',
        pointerEvents: 'none',
      },
    };
  },
}))();
