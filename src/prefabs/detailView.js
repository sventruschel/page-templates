(() => ({
  name: 'DetailView',
  icon: 'DataTable',
  category: 'DATA',
  beforeCreate: ({
    components: {
      Content,
      Header,
      Field,
      Footer,
      ModelSelector,
      PropertiesSelector,
      ButtonGroup,
      ButtonGroupButton,
    },
    helpers: { useCurrentPageId, camelToSnakeCase, useModelQuery },
    prefab,
    save,
    close,
  }) => {
    const [modelId, setModelId] = React.useState('');
    const [properties, setProperties] = React.useState([]);
    const [numberOfColumns, setNumberOfColumns] = React.useState('6');

    const pageUuid = useCurrentPageId();

    const { data } = useModelQuery({
      variables: { id: modelId },
    });

    console.log('DATA: ', data);

    const enrichVarObj = obj => {
      if (data && data.model) {
        const property = data.model.properties.find(
          prop => prop.id === obj.id[0],
        );
        if (property) {
          obj['name'] = `{{ ${data.model.name}.${property.name} }}`;
        }
      }
      return obj;
    };

    return (
      <>
        <Header title="Configure data table" onClose={close} />
        <Content>
          <Field label="Model">
            <ModelSelector
              onChange={value => {
                setModelId(value);
              }}
              value={modelId}
            />
          </Field>
          <Field label="Number of columns">
            <ButtonGroup
              onChange={({ target: { value } }) => {
                setNumberOfColumns(value);
              }}
              value={numberOfColumns}
            >
              <ButtonGroupButton label="1 column" value="12" name="options" />
              <ButtonGroupButton label="2 columns" value="6" name="options" />
              <ButtonGroupButton label="3 columns" value="4" name="options" />
            </ButtonGroup>
          </Field>
          <Field label="Columns">
            <PropertiesSelector
              modelId={modelId}
              value={properties}
              onChange={value => {
                setProperties(value);
              }}
            />
          </Field>
        </Content>
        <Footer
          onSave={() => {
            const newPrefab = { ...prefab };
            console.log('ModelID', modelId);

            const variableName = `${camelToSnakeCase(data.model.label)}_id`;

            console.log('PageUUID', pageUuid);
            console.log('variablename', variableName);
            newPrefab.variables.push({
              kind: 'integer',
              name: variableName,
              pageId: pageUuid,
              ref: {
                id: '#idVariable',
              },
            });

            newPrefab.structure[0].options[0].value = modelId;
            properties.forEach(property => {
              newPrefab.structure[0].descendants[0].descendants.push({
                name: 'Column',
                options: [
                  {
                    label: 'Toggle visibility',
                    key: 'visible',
                    value: true,
                    type: 'TOGGLE',
                    configuration: {
                      as: 'VISIBILITY',
                    },
                  },
                  {
                    value: numberOfColumns,
                    label: 'Column width',
                    key: 'columnWidth',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Fit content', value: 'fitContent' },
                        { name: 'Flexible', value: 'flexible' },
                        { name: 'Hidden', value: 'hidden' },
                        { name: '1', value: '1' },
                        { name: '2', value: '2' },
                        { name: '3', value: '3' },
                        { name: '4', value: '4' },
                        { name: '5', value: '5' },
                        { name: '6', value: '6' },
                        { name: '7', value: '7' },
                        { name: '8', value: '8' },
                        { name: '9', value: '9' },
                        { name: '10', value: '10' },
                        { name: '11', value: '11' },
                        { name: '12', value: '12' },
                      ],
                    },
                  },
                  {
                    value: numberOfColumns,
                    label: 'Column width (tablet landscape)',
                    key: 'columnWidthTabletLandscape',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Fit content', value: 'fitContent' },
                        { name: 'Flexible', value: 'flexible' },
                        { name: 'Hidden', value: 'hidden' },
                        { name: '1', value: '1' },
                        { name: '2', value: '2' },
                        { name: '3', value: '3' },
                        { name: '4', value: '4' },
                        { name: '5', value: '5' },
                        { name: '6', value: '6' },
                        { name: '7', value: '7' },
                        { name: '8', value: '8' },
                        { name: '9', value: '9' },
                        { name: '10', value: '10' },
                        { name: '11', value: '11' },
                        { name: '12', value: '12' },
                      ],
                    },
                  },
                  {
                    value: 'flexible',
                    label: 'Column width (tablet portrait)',
                    key: 'columnWidthTabletPortrait',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Fit content', value: 'fitContent' },
                        { name: 'Flexible', value: 'flexible' },
                        { name: 'Hidden', value: 'hidden' },
                        { name: '1', value: '1' },
                        { name: '2', value: '2' },
                        { name: '3', value: '3' },
                        { name: '4', value: '4' },
                        { name: '5', value: '5' },
                        { name: '6', value: '6' },
                        { name: '7', value: '7' },
                        { name: '8', value: '8' },
                        { name: '9', value: '9' },
                        { name: '10', value: '10' },
                        { name: '11', value: '11' },
                        { name: '12', value: '12' },
                      ],
                    },
                  },
                  {
                    value: 'flexible',
                    label: 'Column width (mobile)',
                    key: 'columnWidthMobile',
                    type: 'CUSTOM',
                    configuration: {
                      as: 'DROPDOWN',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'Fit content', value: 'fitContent' },
                        { name: 'Flexible', value: 'flexible' },
                        { name: 'Hidden', value: 'hidden' },
                        { name: '1', value: '1' },
                        { name: '2', value: '2' },
                        { name: '3', value: '3' },
                        { name: '4', value: '4' },
                        { name: '5', value: '5' },
                        { name: '6', value: '6' },
                        { name: '7', value: '7' },
                        { name: '8', value: '8' },
                        { name: '9', value: '9' },
                        { name: '10', value: '10' },
                        { name: '11', value: '11' },
                        { name: '12', value: '12' },
                      ],
                    },
                  },
                  {
                    value: '',
                    label: 'Height',
                    key: 'columnHeight',
                    type: 'TEXT',
                    configuration: {
                      as: 'UNIT',
                    },
                  },
                  {
                    value: 'White',
                    label: 'Background color',
                    key: 'backgroundColor',
                    type: 'COLOR',
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Horizontal Alignment',
                    key: 'horizontalAlignment',
                    value: 'inherit',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'None', value: 'inherit' },
                        { name: 'Left', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'flex-end' },
                      ],
                    },
                  },
                  {
                    type: 'CUSTOM',
                    label: 'Vertical Alignment',
                    key: 'verticalAlignment',
                    value: 'inherit',
                    configuration: {
                      as: 'BUTTONGROUP',
                      dataType: 'string',
                      allowedInput: [
                        { name: 'None', value: 'inherit' },
                        { name: 'Top', value: 'flex-start' },
                        { name: 'Center', value: 'center' },
                        { name: 'Bottom', value: 'flex-end' },
                      ],
                    },
                  },
                  {
                    value: ['S', 'S', 'S', 'S'],
                    label: 'Outer space',
                    key: 'outerSpacing',
                    type: 'SIZES',
                  },
                  {
                    value: ['M', 'M', 'M', 'M'],
                    label: 'Inner space',
                    key: 'innerSpacing',
                    type: 'SIZES',
                  },
                ],
                descendants: [
                  {
                    name: 'Text',
                    options: [
                      {
                        type: 'VARIABLE',
                        label: 'Content',
                        key: 'content',
                        value: [property.label],
                        configuration: {
                          as: 'MULTILINE',
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Display Rich Text',
                        key: 'useInnerHtml',
                        value: false,
                      },
                      {
                        value: 'Body1',
                        label: 'Type',
                        key: 'type',
                        type: 'FONT',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Text Alignment',
                        key: 'textAlignment',
                        value: 'left',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Left', value: 'left' },
                            { name: 'Center', value: 'center' },
                            { name: 'Right', value: 'right' },
                          ],
                        },
                      },
                      {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                        label: 'Outer space',
                        key: 'outerSpacing',
                        type: 'SIZES',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Link to',
                        key: 'linkType',
                        value: 'internal',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Internal page', value: 'internal' },
                            { name: 'External page', value: 'external' },
                          ],
                        },
                      },
                      {
                        value: '',
                        label: 'Page',
                        key: 'linkTo',
                        type: 'ENDPOINT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'linkType',
                            comparator: 'EQ',
                            value: 'internal',
                          },
                        },
                      },
                      {
                        value: [''],
                        label: 'URL',
                        key: 'linkToExternal',
                        type: 'VARIABLE',
                        configuration: {
                          placeholder: 'Starts with https:// or http://',
                          condition: {
                            type: 'SHOW',
                            option: 'linkType',
                            comparator: 'EQ',
                            value: 'external',
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Font weight',
                        key: 'fontWeight',
                        value: '500',
                        configuration: {
                          as: 'DROPDOWN',
                          dataType: 'string',
                          allowedInput: [
                            { name: '100', value: '100' },
                            { name: '200', value: '200' },
                            { name: '300', value: '300' },
                            { name: '400', value: '400' },
                            { name: '500', value: '500' },
                            { name: '600', value: '600' },
                            { name: '700', value: '700' },
                            { name: '800', value: '800' },
                            { name: '900', value: '900' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  },
                  {
                    name: 'Text',
                    options: [
                      {
                        type: 'VARIABLE',
                        label: 'Content',
                        key: 'content',
                        value: [enrichVarObj(property)],
                        configuration: {
                          as: 'MULTILINE',
                        },
                      },
                      {
                        type: 'TOGGLE',
                        label: 'Display Rich Text',
                        key: 'useInnerHtml',
                        value: false,
                      },
                      {
                        value: 'Body1',
                        label: 'Type',
                        key: 'type',
                        type: 'FONT',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Text Alignment',
                        key: 'textAlignment',
                        value: 'left',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Left', value: 'left' },
                            { name: 'Center', value: 'center' },
                            { name: 'Right', value: 'right' },
                          ],
                        },
                      },
                      {
                        value: ['0rem', '0rem', '0rem', '0rem'],
                        label: 'Outer space',
                        key: 'outerSpacing',
                        type: 'SIZES',
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Link to',
                        key: 'linkType',
                        value: 'internal',
                        configuration: {
                          as: 'BUTTONGROUP',
                          dataType: 'string',
                          allowedInput: [
                            { name: 'Internal page', value: 'internal' },
                            { name: 'External page', value: 'external' },
                          ],
                        },
                      },
                      {
                        value: '',
                        label: 'Page',
                        key: 'linkTo',
                        type: 'ENDPOINT',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'linkType',
                            comparator: 'EQ',
                            value: 'internal',
                          },
                        },
                      },
                      {
                        value: [''],
                        label: 'URL',
                        key: 'linkToExternal',
                        type: 'VARIABLE',
                        configuration: {
                          placeholder: 'Starts with https:// or http://',
                          condition: {
                            type: 'SHOW',
                            option: 'linkType',
                            comparator: 'EQ',
                            value: 'external',
                          },
                        },
                      },
                      {
                        value: false,
                        label: 'Styles',
                        key: 'styles',
                        type: 'TOGGLE',
                      },
                      {
                        type: 'COLOR',
                        label: 'Text color',
                        key: 'textColor',
                        value: 'Black',
                        configuration: {
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                      {
                        type: 'CUSTOM',
                        label: 'Font weight',
                        key: 'fontWeight',
                        value: '400',
                        configuration: {
                          as: 'DROPDOWN',
                          dataType: 'string',
                          allowedInput: [
                            { name: '100', value: '100' },
                            { name: '200', value: '200' },
                            { name: '300', value: '300' },
                            { name: '400', value: '400' },
                            { name: '500', value: '500' },
                            { name: '600', value: '600' },
                            { name: '700', value: '700' },
                            { name: '800', value: '800' },
                            { name: '900', value: '900' },
                          ],
                          condition: {
                            type: 'SHOW',
                            option: 'styles',
                            comparator: 'EQ',
                            value: true,
                          },
                        },
                      },
                    ],
                    descendants: [],
                  },
                ],
              });
            });

            save(newPrefab);
          }}
          onClose={close}
        />
      </>
    );
  },
  interactions: [],
  variables: [],
  structure: [
    {
      name: 'DetailView',
      ref: {
        id: '#detailView',
      },
      options: [
        {
          value: '',
          label: 'Model',
          key: 'model',
          type: 'MODEL',
        },
        {
          value: '',
          label: 'Current Record',
          key: 'currentRecord',
          type: 'NUMBER',
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'currentRecord',
              comparator: 'EQ',
              value: 'never',
            },
          },
        },
        {
          value: {},
          label: 'Filter',
          key: 'filter',
          type: 'FILTER',
          configuration: {
            dependsOn: 'model',
          },
        },
        {
          value: '',
          label: 'Authentication Profile',
          key: 'authProfile',
          type: 'AUTHENTICATION_PROFILE',
        },
        {
          value: ['0rem', '0rem', 'M', '0rem'],
          label: 'Outer space',
          key: 'outerSpacing',
          type: 'SIZES',
        },
        {
          value: 'built-in',
          label: 'Error message',
          key: 'showError',
          type: 'CUSTOM',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'Built in', value: 'built-in' },
              { name: 'Interaction', value: 'interaction' },
            ],
          },
        },
      ],
      descendants: [
        {
          name: 'Row',
          options: [
            {
              type: 'CUSTOM',
              label: 'Width',
              key: 'maxRowWidth',
              value: 'XL',
              configuration: {
                as: 'BUTTONGROUP',
                dataType: 'string',
                allowedInput: [
                  { name: 'S', value: 'S' },
                  { name: 'M', value: 'M' },
                  { name: 'L', value: 'L' },
                  { name: 'XL', value: 'XL' },
                  { name: 'Full', value: 'Full' },
                ],
              },
            },
            {
              value: '',
              label: 'Height',
              key: 'rowHeight',
              type: 'TEXT',
              configuration: {
                as: 'UNIT',
              },
            },
            {
              value: 'Accent1',
              label: 'Background color',
              key: 'backgroundColor',
              type: 'COLOR',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
          ],
          descendants: [],
        },
      ],
    },
  ],
}))();
