(() => ({
  name: 'Rating',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { Box } = window.MaterialUI.Core;
    const { Rating } = window.MaterialUI.Lab;
    const { env } = B;
    const isDev = env === 'dev';

    const [value, setValue] = React.useState(2);

    return isDev ? (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating name="read-only" value={value} readOnly />
        </Box>
      </div>
    ) : (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating name="read-only" value={value} readOnly />
        </Box>
      </div>
    );
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const convertSizes = sizes =>
      sizes.map(size => style.getSpacing(size)).join(' ');
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);

    return {
      wrapper: {
        display: 'inline-block',
      },
      root: {},
    };
  },
}))();
