(() => ({
  name: 'BottomNavigationAction',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'VERTICAL',
  jsx: (() => {
    const { BottomNavigationAction } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;

    const {
      icon,
      linkType,
      linkTo,
      linkToExternal,
      openLinkToExternal,
    } = options;
    const {
      env,
      getModel,
      getIdProperty,
      Link: BLink,
      useProperty,
      useText,
    } = B;
    const isDev = env === 'dev';
    const hasLink = linkTo && linkTo.id !== '';
    const hasExternalLink = linkToExternal && linkToExternal.id !== '';
    const linkToExternalVariable =
      (linkToExternal && useText(linkToExternal)) || '';

    const generalProps = {
      tabindex: isDev && -1,
      target:
        linkType === 'external' && hasExternalLink
          ? openLinkToExternal
          : undefined,
      href:
        linkType === 'external' && hasExternalLink
          ? linkToExternalVariable
          : undefined,
      component: linkType === 'internal' && hasLink ? BLink : undefined,
      endpoint: linkType === 'internal' && hasLink ? linkTo : undefined,
    };

    const BasicButtonComponent = (
      <BottomNavigationAction
        {...generalProps}
        showLabel
        icon={icon !== 'None' && React.createElement(Icons[icon])}
        label="Test"
      />
    );

    const ButtonComponent = BasicButtonComponent;

    if (isDev) {
      return <div className={classes.wrapper}>{ButtonComponent}</div>;
    }
    return ButtonComponent;
  })(),
  styles: B => t => {
    const { mediaMinWidth, Styling } = B;
    const style = new Styling(t);
    const getSpacing = (idx, device = 'Mobile') =>
      idx === '0' ? '0rem' : style.getSpacing(idx, device);
    return {
      wrapper: {},
    };
  },
}))();
