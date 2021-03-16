(() => ({
  name: "test",
  type: "CONTENT_COMPONENT",
  allowedTypes: [],
  orientation: "HORIZONTAL",
  jsx: (() => {
    const { title, subtitle } = options;
    
    return(
      <>
        <h1 className={classes.content}>Title</h1>
        <h2 className={classes.content}>Subtitle</h2>
        {children}
      </>
    )
  })(),
  styles: B => t => {
    const { Styling } = B;
    const style = new Styling(t);

    return {
      content: {
        color: ({ options: { textColor } }) => style.getColor(textColor),
      }
    };
  },
}))();