(() => ({
  name: 'Rating',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Icons } = window.MaterialUI;
    const { Box } = window.MaterialUI.Core;
    const { Rating } = window.MaterialUI.Lab;
    const { env, getCustomModelAttribute, useText } = B;
    const isDev = env === 'dev';

    const {
      customModelAttribute: customModelAttributeObj,
      size,
      readonly,
      icon,
      iconSelected,
    } = options;

    const {
      id: customModelAttributeId,
      label = [],
      value: defaultValue = [],
    } = customModelAttributeObj;

    const customModelAttribute = getCustomModelAttribute(
      customModelAttributeId,
    );

    const [value, setValue] = useState(useText(defaultValue));

    const IconEmptyComponent = React.createElement(Icons[icon], {
      className: classes.root,
    });

    const IconSelectedComponent = React.createElement(Icons[iconSelected], {
      className: classes.root,
    });

    const ratingBox = (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            className={classes.root}
            name="rating"
            value={value}
            defaultValue={customModelAttributeObj.value}
            precision={1}
            size={size}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            readOnly={readonly}
            emptyIcon={IconEmptyComponent}
            icon={IconSelectedComponent}
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
      },
    };
  },
}))();
