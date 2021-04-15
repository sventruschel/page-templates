(() => ({
  name: 'Page With Tabs Layout',
  icon: 'TabsIcon',
  description: 'This is a page containing tabs',
  // type: 'page',
  category: 'LAYOUT',
  beforeCreate: ({
    close,
    components: {
      Box,
      Content,
      Field,
      Footer,
      Header,
      Button,
      Text,
      DeleteButton,
      TextInput,
      CheckBox,
    },
    prefab,
    save,
  }) => {
    const [tabs, setTabs] = React.useState([{ index: 1, title: 'TAB 1' }]);
    const [stepNumber, setStepNumber] = React.useState(1);
    const [appBarTitle, setAppBarTitle] = React.useState('Appbar');

    const maxTabs = tabs.length < 5;

    const stepper = {
      setStep: step => {
        let activeStep;
        switch (step) {
          case 1:
            activeStep = (
              <>
                <Field label="Appbar title">
                  <TextInput
                    placeholder="Placeholder..."
                    value={appBarTitle}
                    onChange={({ target: { value } }) => {
                      setAppBarTitle(value);
                    }}
                  />
                </Field>
              </>
            );
            break;
          case 2:
            activeStep = (
              <Box direction="row">
                <Box direction="column" basis="60%">
                  <Field
                    info={
                      <>
                        <Text size="small" color="grey700">
                          Click the + Add tab button to add a new tab to the
                          page.
                          <br />
                          You can also specify the title of each tab.
                        </Text>
                      </>
                    }
                  >
                    <Button
                      label="+ Add tab"
                      disabled={!maxTabs}
                      onClick={() => {
                        if (maxTabs) {
                          const index = tabs.length + 1;
                          setTabs([
                            ...tabs,
                            {
                              index,
                              title: `TAB ${index}`,
                            },
                          ]);
                        }
                      }}
                    />
                  </Field>
                  {tabs.map(tab => (
                    <Field>
                      <Box direction="row">
                        <Box
                          direction="column"
                          basis="auto"
                          alignSelf="center"
                          pad={{ right: '15px' }}
                        >
                          <Text>Tab {tab.index}</Text>
                        </Box>
                        <Box direction="column" basis="auto">
                          <TextInput
                            placeholder="Placeholder..."
                            value={tab.title.toString()}
                            onChange={({ target: { value } }) => {
                              const index = tabs.findIndex(
                                currentTab => currentTab.index === tab.index,
                              );
                              const updatedTabs = tabs;
                              updatedTabs[index].title = value;
                              setTabs([...updatedTabs]);
                            }}
                          />
                        </Box>
                        <Box
                          direction="column"
                          basis="auto"
                          pad={{ left: '5px' }}
                        >
                          <DeleteButton
                            label="X"
                            value={tab.index}
                            disabled={!(tabs.length > 1)}
                            onClick={event => {
                              const newTabs = [...tabs];
                              const index = newTabs.findIndex(
                                currentTab =>
                                  currentTab.index ===
                                  parseInt(event.target.value, 10),
                              );
                              if (index !== -1) {
                                newTabs.splice(index, 1);

                                newTabs.map((correctTab, tabIndex) => {
                                  const newTab = correctTab;
                                  newTab.index = tabIndex + 1;
                                  return { ...newTab };
                                });
                                setTabs([...newTabs]);
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Field>
                  ))}
                </Box>
                <Box direction="column" basis="40%" margin={{ top: '11%' }}>
                  <Text color="#666d85">Preview:</Text>
                  <Box
                    direction="row"
                    border={{
                      color: 'border',
                      size: 'medium',
                      style: 'solid',
                      side: 'all',
                    }}
                  >
                    {tabs.map(tab => (
                      <Box
                        direction="row"
                        height="100%"
                        background="#FFFFFF"
                        justify="center"
                        border={
                          tab.index === 1
                            ? {
                                color: 'border',
                                size: 'medium',
                                style: 'solid',
                                side: 'bottom',
                              }
                            : {
                                color: 'border',
                                size: 'medium',
                                style: 'solid',
                                side: 'all',
                              }
                        }
                      >
                        <Text truncate="true">{tab.title}</Text>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    fill="true"
                    background="#F0F1F5"
                    height="100px"
                    border={{
                      color: '#AFB5C8',
                      size: 'xsmall',
                      style: 'dashed',
                      side: 'all',
                    }}
                  >
                    <Text>Tab</Text>
                  </Box>
                </Box>
              </Box>
            );
            break;
          default:
            break;
        }
        return activeStep;
      },
      onSave: () => {
        const newPrefab = { ...prefab };
        tabs.forEach(tab => {
          const newTab = {
            name: 'Tab',
            options: [
              {
                label: 'Tab label',
                key: 'label',
                value: [tab.title],
                type: 'VARIABLE',
              },
              {
                type: 'SIZE',
                label: 'Height',
                key: 'height',
                value: '',
                configuration: {
                  as: 'UNIT',
                },
              },
              {
                type: 'SIZE',
                label: 'Width',
                key: 'width',
                value: '',
                configuration: {
                  as: 'UNIT',
                },
              },
              {
                label: 'Icon',
                key: 'icon',
                value: 'None',
                type: 'CUSTOM',
                configuration: {
                  as: 'DROPDOWN',
                  dataType: 'string',
                  allowedInput: [
                    {
                      name: '',
                      value: 'None',
                    },
                    {
                      name: 'AcUnit',
                      value: 'AcUnit',
                    },
                    {
                      name: 'AccessTime',
                      value: 'AccessTime',
                    },
                    {
                      name: 'AccessibilityNew',
                      value: 'AccessibilityNew',
                    },
                    {
                      name: 'Accessible',
                      value: 'Accessible',
                    },
                    {
                      name: 'AccountBalance',
                      value: 'AccountBalance',
                    },
                    {
                      name: 'AccountBalanceWallet',
                      value: 'AccountBalanceWallet',
                    },
                    {
                      name: 'AccountCircle',
                      value: 'AccountCircle',
                    },
                    {
                      name: 'AccountTree',
                      value: 'AccountTree',
                    },
                    {
                      name: 'Add',
                      value: 'Add',
                    },
                    {
                      name: 'AddAPhoto',
                      value: 'AddAPhoto',
                    },
                    {
                      name: 'AddBox',
                      value: 'AddBox',
                    },
                    {
                      name: 'AddCircle',
                      value: 'AddCircle',
                    },
                    {
                      name: 'AddCircleOutline',
                      value: 'AddCircleOutline',
                    },
                    {
                      name: 'AddComment',
                      value: 'AddComment',
                    },
                    {
                      name: 'Adjust',
                      value: 'Adjust',
                    },
                    {
                      name: 'AirplanemodeActive',
                      value: 'AirplanemodeActive',
                    },
                    {
                      name: 'AirplanemodeInactive',
                      value: 'AirplanemodeInactive',
                    },
                    {
                      name: 'Airplay',
                      value: 'Airplay',
                    },
                    {
                      name: 'AirportShuttle',
                      value: 'AirportShuttle',
                    },
                    {
                      name: 'Alarm',
                      value: 'Alarm',
                    },
                    {
                      name: 'Album',
                      value: 'Album',
                    },
                    {
                      name: 'AllInbox',
                      value: 'AllInbox',
                    },
                    {
                      name: 'AllInclusive',
                      value: 'AllInclusive',
                    },
                    {
                      name: 'AlternateEmail',
                      value: 'AlternateEmail',
                    },
                    {
                      name: 'Announcement',
                      value: 'Announcement',
                    },
                    {
                      name: 'Apartment',
                      value: 'Apartment',
                    },
                    {
                      name: 'Apps',
                      value: 'Apps',
                    },
                    {
                      name: 'Archive',
                      value: 'Archive',
                    },
                    {
                      name: 'ArrowBack',
                      value: 'ArrowBack',
                    },
                    {
                      name: 'ArrowBackIos',
                      value: 'ArrowBackIos',
                    },
                    {
                      name: 'ArrowDownward',
                      value: 'ArrowDownward',
                    },
                    {
                      name: 'ArrowDropDown',
                      value: 'ArrowDropDown',
                    },
                    {
                      name: 'ArrowDropDownCircle',
                      value: 'ArrowDropDownCircle',
                    },
                    {
                      name: 'ArrowDropUp',
                      value: 'ArrowDropUp',
                    },
                    {
                      name: 'ArrowForward',
                      value: 'ArrowForward',
                    },
                    {
                      name: 'ArrowForwardIos',
                      value: 'ArrowForwardIos',
                    },
                    {
                      name: 'ArrowLeft',
                      value: 'ArrowLeft',
                    },
                    {
                      name: 'ArrowRight',
                      value: 'ArrowRight',
                    },
                    {
                      name: 'ArrowRightAlt',
                      value: 'ArrowRightAlt',
                    },
                    {
                      name: 'ArrowUpward',
                      value: 'ArrowUpward',
                    },
                    {
                      name: 'Assessment',
                      value: 'Assessment',
                    },
                    {
                      name: 'Assignment',
                      value: 'Assignment',
                    },
                    {
                      name: 'AssignmentInd',
                      value: 'AssignmentInd',
                    },
                    {
                      name: 'AssignmentLate',
                      value: 'AssignmentLate',
                    },
                    {
                      name: 'AssignmentReturn',
                      value: 'AssignmentReturn',
                    },
                    {
                      name: 'AssignmentReturned',
                      value: 'AssignmentReturned',
                    },
                    {
                      name: 'AssignmentTurnedIn',
                      value: 'AssignmentTurnedIn',
                    },
                    {
                      name: 'Assistant',
                      value: 'Assistant',
                    },
                    {
                      name: 'AssistantPhoto',
                      value: 'AssistantPhoto',
                    },
                    {
                      name: 'AttachFile',
                      value: 'AttachFile',
                    },
                    {
                      name: 'AttachMoney',
                      value: 'AttachMoney',
                    },
                    {
                      name: 'Attachment',
                      value: 'Attachment',
                    },
                    {
                      name: 'Audiotrack',
                      value: 'Audiotrack',
                    },
                    {
                      name: 'Autorenew',
                      value: 'Autorenew',
                    },
                    {
                      name: 'AvTimer',
                      value: 'AvTimer',
                    },
                    {
                      name: 'Backspace',
                      value: 'Backspace',
                    },
                    {
                      name: 'Backup',
                      value: 'Backup',
                    },
                    {
                      name: 'BarChart',
                      value: 'BarChart',
                    },
                    {
                      name: 'Battery20',
                      value: 'Battery20',
                    },
                    {
                      name: 'Beenhere',
                      value: 'Beenhere',
                    },
                    {
                      name: 'Block',
                      value: 'Block',
                    },
                    {
                      name: 'Bluetooth',
                      value: 'Bluetooth',
                    },
                    {
                      name: 'Book',
                      value: 'Book',
                    },
                    {
                      name: 'Bookmark',
                      value: 'Bookmark',
                    },
                    {
                      name: 'BookmarkBorder',
                      value: 'BookmarkBorder',
                    },
                    {
                      name: 'Bookmarks',
                      value: 'Bookmarks',
                    },
                    {
                      name: 'Brush',
                      value: 'Brush',
                    },
                    {
                      name: 'BubbleChart',
                      value: 'BubbleChart',
                    },
                    {
                      name: 'BugReport',
                      value: 'BugReport',
                    },
                    {
                      name: 'Build',
                      value: 'Build',
                    },
                    {
                      name: 'Cached',
                      value: 'Cached',
                    },
                    {
                      name: 'Cake',
                      value: 'Cake',
                    },
                    {
                      name: 'CalendarToday',
                      value: 'CalendarToday',
                    },
                    {
                      name: 'Call',
                      value: 'Call',
                    },
                    {
                      name: 'CameraAlt',
                      value: 'CameraAlt',
                    },
                    {
                      name: 'CameraRoll',
                      value: 'CameraRoll',
                    },
                    {
                      name: 'Cancel',
                      value: 'Cancel',
                    },
                    {
                      name: 'CardTravel',
                      value: 'CardTravel',
                    },
                    {
                      name: 'Cast',
                      value: 'Cast',
                    },
                    {
                      name: 'Category',
                      value: 'Category',
                    },
                    {
                      name: 'Chat',
                      value: 'Chat',
                    },
                    {
                      name: 'Check',
                      value: 'Check',
                    },
                    {
                      name: 'CheckBox',
                      value: 'CheckBox',
                    },
                    {
                      name: 'CheckCircle',
                      value: 'CheckCircle',
                    },
                    {
                      name: 'CheckCircleOutline',
                      value: 'CheckCircleOutline',
                    },
                    {
                      name: 'ChevronLeft',
                      value: 'ChevronLeft',
                    },
                    {
                      name: 'ChevronRight',
                      value: 'ChevronRight',
                    },
                    {
                      name: 'ChildCare',
                      value: 'ChildCare',
                    },
                    {
                      name: 'Clear',
                      value: 'Clear',
                    },
                    {
                      name: 'Close',
                      value: 'Close',
                    },
                    {
                      name: 'Cloud',
                      value: 'Cloud',
                    },
                    {
                      name: 'CloudDownload',
                      value: 'CloudDownload',
                    },
                    {
                      name: 'CloudUpload',
                      value: 'CloudUpload',
                    },
                    {
                      name: 'Code',
                      value: 'Code',
                    },
                    {
                      name: 'Collections',
                      value: 'Collections',
                    },
                    {
                      name: 'ColorLens',
                      value: 'ColorLens',
                    },
                    {
                      name: 'Colorize',
                      value: 'Colorize',
                    },
                    {
                      name: 'Commute',
                      value: 'Commute',
                    },
                    {
                      name: 'Computer',
                      value: 'Computer',
                    },
                    {
                      name: 'CreditCard',
                      value: 'CreditCard',
                    },
                    {
                      name: 'Dashboard',
                      value: 'Dashboard',
                    },
                    {
                      name: 'DataUsage',
                      value: 'DataUsage',
                    },
                    {
                      name: 'Deck',
                      value: 'Deck',
                    },
                    {
                      name: 'Dehaze',
                      value: 'Dehaze',
                    },
                    {
                      name: 'Delete',
                      value: 'Delete',
                    },
                    {
                      name: 'DeleteForever',
                      value: 'DeleteForever',
                    },
                    {
                      name: 'DesktopMac',
                      value: 'DesktopMac',
                    },
                    {
                      name: 'DeveloperMode',
                      value: 'DeveloperMode',
                    },
                    {
                      name: 'Devices',
                      value: 'Devices',
                    },
                    {
                      name: 'Dialpad',
                      value: 'Dialpad',
                    },
                    {
                      name: 'Directions',
                      value: 'Directions',
                    },
                    {
                      name: 'DirectionsBike',
                      value: 'DirectionsBike',
                    },
                    {
                      name: 'DirectionsBoat',
                      value: 'DirectionsBoat',
                    },
                    {
                      name: 'DirectionsBus',
                      value: 'DirectionsBus',
                    },
                    {
                      name: 'DirectionsCar',
                      value: 'DirectionsCar',
                    },
                    {
                      name: 'DirectionsRailway',
                      value: 'DirectionsRailway',
                    },
                    {
                      name: 'DirectionsRun',
                      value: 'DirectionsRun',
                    },
                    {
                      name: 'DirectionsSubway',
                      value: 'DirectionsSubway',
                    },
                    {
                      name: 'DirectionsTransit',
                      value: 'DirectionsTransit',
                    },
                    {
                      name: 'DirectionsWalk',
                      value: 'DirectionsWalk',
                    },
                    {
                      name: 'DiscFull',
                      value: 'DiscFull',
                    },
                    {
                      name: 'Dns',
                      value: 'Dns',
                    },
                    {
                      name: 'Done',
                      value: 'Done',
                    },
                    {
                      name: 'DoneAll',
                      value: 'DoneAll',
                    },
                    {
                      name: 'DoubleArrow',
                      value: 'DoubleArrow',
                    },
                    {
                      name: 'Drafts',
                      value: 'Drafts',
                    },
                    {
                      name: 'Eco',
                      value: 'Eco',
                    },
                    {
                      name: 'Edit',
                      value: 'Edit',
                    },
                    {
                      name: 'Email',
                      value: 'Email',
                    },
                    {
                      name: 'Equalizer',
                      value: 'Equalizer',
                    },
                    {
                      name: 'Error',
                      value: 'Error',
                    },
                    {
                      name: 'Euro',
                      value: 'Euro',
                    },
                    {
                      name: 'Event',
                      value: 'Event',
                    },
                    {
                      name: 'ExpandLess',
                      value: 'ExpandLess',
                    },
                    {
                      name: 'ExpandMore',
                      value: 'ExpandMore',
                    },
                    {
                      name: 'Explore',
                      value: 'Explore',
                    },
                    {
                      name: 'Extension',
                      value: 'Extension',
                    },
                    {
                      name: 'Face',
                      value: 'Face',
                    },
                    {
                      name: 'Facebook',
                      value: 'Facebook',
                    },
                    {
                      name: 'FastForward',
                      value: 'FastForward',
                    },
                    {
                      name: 'FastRewind',
                      value: 'FastRewind',
                    },
                    {
                      name: 'Favorite',
                      value: 'Favorite',
                    },
                    {
                      name: 'FavoriteBorder',
                      value: 'FavoriteBorder',
                    },
                    {
                      name: 'FilterList',
                      value: 'FilterList',
                    },
                    {
                      name: 'Flag',
                      value: 'Flag',
                    },
                    {
                      name: 'Flare',
                      value: 'Flare',
                    },
                    {
                      name: 'Flight',
                      value: 'Flight',
                    },
                    {
                      name: 'Folder',
                      value: 'Folder',
                    },
                    {
                      name: 'Forum',
                      value: 'Forum',
                    },
                    {
                      name: 'Forward',
                      value: 'Forward',
                    },
                    {
                      name: 'FreeBreakfast',
                      value: 'FreeBreakfast',
                    },
                    {
                      name: 'Fullscreen',
                      value: 'Fullscreen',
                    },
                    {
                      name: 'Functions',
                      value: 'Functions',
                    },
                    {
                      name: 'Games',
                      value: 'Games',
                    },
                    {
                      name: 'Gavel',
                      value: 'Gavel',
                    },
                    {
                      name: 'Gesture',
                      value: 'Gesture',
                    },
                    {
                      name: 'GetApp',
                      value: 'GetApp',
                    },
                    {
                      name: 'Gif',
                      value: 'Gif',
                    },
                    {
                      name: 'GpsFixed',
                      value: 'GpsFixed',
                    },
                    {
                      name: 'Grade',
                      value: 'Grade',
                    },
                    {
                      name: 'Group',
                      value: 'Group',
                    },
                    {
                      name: 'Headset',
                      value: 'Headset',
                    },
                    {
                      name: 'Hearing',
                      value: 'Hearing',
                    },
                    {
                      name: 'Height',
                      value: 'Height',
                    },
                    {
                      name: 'Help',
                      value: 'Help',
                    },
                    {
                      name: 'HelpOutline',
                      value: 'HelpOutline',
                    },
                    {
                      name: 'Highlight',
                      value: 'Highlight',
                    },
                    {
                      name: 'History',
                      value: 'History',
                    },
                    {
                      name: 'Home',
                      value: 'Home',
                    },
                    {
                      name: 'Hotel',
                      value: 'Hotel',
                    },
                    {
                      name: 'HourglassEmpty',
                      value: 'HourglassEmpty',
                    },
                    {
                      name: 'Http',
                      value: 'Http',
                    },
                    {
                      name: 'Https',
                      value: 'Https',
                    },
                    {
                      name: 'Image',
                      value: 'Image',
                    },
                    {
                      name: 'ImportExport',
                      value: 'ImportExport',
                    },
                    {
                      name: 'Inbox',
                      value: 'Inbox',
                    },
                    {
                      name: 'Info',
                      value: 'Info',
                    },
                    {
                      name: 'Input',
                      value: 'Input',
                    },
                    {
                      name: 'Keyboard',
                      value: 'Keyboard',
                    },
                    {
                      name: 'KeyboardArrowDown',
                      value: 'KeyboardArrowDown',
                    },
                    {
                      name: 'KeyboardArrowLeft',
                      value: 'KeyboardArrowLeft',
                    },
                    {
                      name: 'KeyboardArrowRight',
                      value: 'KeyboardArrowRight',
                    },
                    {
                      name: 'KeyboardArrowUp',
                      value: 'KeyboardArrowUp',
                    },
                    {
                      name: 'KeyboardVoice',
                      value: 'KeyboardVoice',
                    },
                    {
                      name: 'Label',
                      value: 'Label',
                    },
                    {
                      name: 'Landscape',
                      value: 'Landscape',
                    },
                    {
                      name: 'Language',
                      value: 'Language',
                    },
                    {
                      name: 'Laptop',
                      value: 'Laptop',
                    },
                    {
                      name: 'LastPage',
                      value: 'LastPage',
                    },
                    {
                      name: 'Launch',
                      value: 'Launch',
                    },
                    {
                      name: 'Layers',
                      value: 'Layers',
                    },
                    {
                      name: 'Link',
                      value: 'Link',
                    },
                    {
                      name: 'List',
                      value: 'List',
                    },
                    {
                      name: 'LocalBar',
                      value: 'LocalBar',
                    },
                    {
                      name: 'Lock',
                      value: 'Lock',
                    },
                    {
                      name: 'LockOpen',
                      value: 'LockOpen',
                    },
                    {
                      name: 'Loop',
                      value: 'Loop',
                    },
                    {
                      name: 'Mail',
                      value: 'Mail',
                    },
                    {
                      name: 'Map',
                      value: 'Map',
                    },
                    {
                      name: 'Menu',
                      value: 'Menu',
                    },
                    {
                      name: 'Message',
                      value: 'Message',
                    },
                    {
                      name: 'Mic',
                      value: 'Mic',
                    },
                    {
                      name: 'Mms',
                      value: 'Mms',
                    },
                    {
                      name: 'Money',
                      value: 'Money',
                    },
                    {
                      name: 'Mood',
                      value: 'Mood',
                    },
                    {
                      name: 'MoodBad',
                      value: 'MoodBad',
                    },
                    {
                      name: 'More',
                      value: 'More',
                    },
                    {
                      name: 'MoreHoriz',
                      value: 'MoreHoriz',
                    },
                    {
                      name: 'MoreVert',
                      value: 'MoreVert',
                    },
                    {
                      name: 'Motorcycle',
                      value: 'Motorcycle',
                    },
                    {
                      name: 'Movie',
                      value: 'Movie',
                    },
                    {
                      name: 'MusicNote',
                      value: 'MusicNote',
                    },
                    {
                      name: 'MyLocation',
                      value: 'MyLocation',
                    },
                    {
                      name: 'Nature',
                      value: 'Nature',
                    },
                    {
                      name: 'Navigation',
                      value: 'Navigation',
                    },
                    {
                      name: 'NewReleases',
                      value: 'NewReleases',
                    },
                    {
                      name: 'NotInterested',
                      value: 'NotInterested',
                    },
                    {
                      name: 'Note',
                      value: 'Note',
                    },
                    {
                      name: 'NotificationImportant',
                      value: 'NotificationImportant',
                    },
                    {
                      name: 'Notifications',
                      value: 'Notifications',
                    },
                    {
                      name: 'NotificationsActive',
                      value: 'NotificationsActive',
                    },
                    {
                      name: 'Opacity',
                      value: 'Opacity',
                    },
                    {
                      name: 'Palette',
                      value: 'Palette',
                    },
                    {
                      name: 'Pause',
                      value: 'Pause',
                    },
                    {
                      name: 'Payment',
                      value: 'Payment',
                    },
                    {
                      name: 'People',
                      value: 'People',
                    },
                    {
                      name: 'Person',
                      value: 'Person',
                    },
                    {
                      name: 'PersonAdd',
                      value: 'PersonAdd',
                    },
                    {
                      name: 'Pets',
                      value: 'Pets',
                    },
                    {
                      name: 'Phone',
                      value: 'Phone',
                    },
                    {
                      name: 'Photo',
                      value: 'Photo',
                    },
                    {
                      name: 'PhotoCamera',
                      value: 'PhotoCamera',
                    },
                    {
                      name: 'PieChart',
                      value: 'PieChart',
                    },
                    {
                      name: 'Place',
                      value: 'Place',
                    },
                    {
                      name: 'PlayArrow',
                      value: 'PlayArrow',
                    },
                    {
                      name: 'PlayCircleFilled',
                      value: 'PlayCircleFilled',
                    },
                    {
                      name: 'PlayCircleFilledWhite',
                      value: 'PlayCircleFilledWhite',
                    },
                    {
                      name: 'PlayCircleOutline',
                      value: 'PlayCircleOutline',
                    },
                    {
                      name: 'Power',
                      value: 'Power',
                    },
                    {
                      name: 'Public',
                      value: 'Public',
                    },
                    {
                      name: 'Radio',
                      value: 'Radio',
                    },
                    {
                      name: 'Redo',
                      value: 'Redo',
                    },
                    {
                      name: 'Refresh',
                      value: 'Refresh',
                    },
                    {
                      name: 'Remove',
                      value: 'Remove',
                    },
                    {
                      name: 'RemoveCircle',
                      value: 'RemoveCircle',
                    },
                    {
                      name: 'RemoveCircleOutline',
                      value: 'RemoveCircleOutline',
                    },
                    {
                      name: 'Replay',
                      value: 'Replay',
                    },
                    {
                      name: 'Reply',
                      value: 'Reply',
                    },
                    {
                      name: 'Report',
                      value: 'Report',
                    },
                    {
                      name: 'ReportProblem',
                      value: 'ReportProblem',
                    },
                    {
                      name: 'Restaurant',
                      value: 'Restaurant',
                    },
                    {
                      name: 'RssFeed',
                      value: 'RssFeed',
                    },
                    {
                      name: 'Save',
                      value: 'Save',
                    },
                    {
                      name: 'SaveAlt',
                      value: 'SaveAlt',
                    },
                    {
                      name: 'School',
                      value: 'School',
                    },
                    {
                      name: 'Search',
                      value: 'Search',
                    },
                    {
                      name: 'Security',
                      value: 'Security',
                    },
                    {
                      name: 'Send',
                      value: 'Send',
                    },
                    {
                      name: 'Settings',
                      value: 'Settings',
                    },
                    {
                      name: 'ShoppingCart',
                      value: 'ShoppingCart',
                    },
                    {
                      name: 'ShowChart',
                      value: 'ShowChart',
                    },
                    {
                      name: 'Smartphone',
                      value: 'Smartphone',
                    },
                    {
                      name: 'SmokeFree',
                      value: 'SmokeFree',
                    },
                    {
                      name: 'SmokingRooms',
                      value: 'SmokingRooms',
                    },
                    {
                      name: 'Speaker',
                      value: 'Speaker',
                    },
                    {
                      name: 'Speed',
                      value: 'Speed',
                    },
                    {
                      name: 'Spellcheck',
                      value: 'Spellcheck',
                    },
                    {
                      name: 'SquareFoot',
                      value: 'SquareFoot',
                    },
                    {
                      name: 'Star',
                      value: 'Star',
                    },
                    {
                      name: 'StarBorder',
                      value: 'StarBorder',
                    },
                    {
                      name: 'StarHalf',
                      value: 'StarHalf',
                    },
                    {
                      name: 'StarOutline',
                      value: 'StarOutline',
                    },
                    {
                      name: 'StarRate',
                      value: 'StarRate',
                    },
                    {
                      name: 'Stars',
                      value: 'Stars',
                    },
                    {
                      name: 'Stop',
                      value: 'Stop',
                    },
                    {
                      name: 'Storefront',
                      value: 'Storefront',
                    },
                    {
                      name: 'Sync',
                      value: 'Sync',
                    },
                    {
                      name: 'Tab',
                      value: 'Tab',
                    },
                    {
                      name: 'TextFields',
                      value: 'TextFields',
                    },
                    {
                      name: 'ThumbDown',
                      value: 'ThumbDown',
                    },
                    {
                      name: 'ThumbDownAlt',
                      value: 'ThumbDownAlt',
                    },
                    {
                      name: 'ThumbUp',
                      value: 'ThumbUp',
                    },
                    {
                      name: 'ThumbUpAlt',
                      value: 'ThumbUpAlt',
                    },
                    {
                      name: 'ThumbsUpDown',
                      value: 'ThumbsUpDown',
                    },
                    {
                      name: 'Title',
                      value: 'Title',
                    },
                    {
                      name: 'TouchApp',
                      value: 'TouchApp',
                    },
                    {
                      name: 'Traffic',
                      value: 'Traffic',
                    },
                    {
                      name: 'Train',
                      value: 'Train',
                    },
                    {
                      name: 'Tram',
                      value: 'Tram',
                    },
                    {
                      name: 'Translate',
                      value: 'Translate',
                    },
                    {
                      name: 'TrendingDown',
                      value: 'TrendingDown',
                    },
                    {
                      name: 'TrendingFlat',
                      value: 'TrendingFlat',
                    },
                    {
                      name: 'TrendingUp',
                      value: 'TrendingUp',
                    },
                    {
                      name: 'Undo',
                      value: 'Undo',
                    },
                    {
                      name: 'Update',
                      value: 'Update',
                    },
                    {
                      name: 'Usb',
                      value: 'Usb',
                    },
                    {
                      name: 'VerifiedUser',
                      value: 'VerifiedUser',
                    },
                    {
                      name: 'VideoCall',
                      value: 'VideoCall',
                    },
                    {
                      name: 'Visibility',
                      value: 'Visibility',
                    },
                    {
                      name: 'VisibilityOff',
                      value: 'VisibilityOff',
                    },
                    {
                      name: 'Voicemail',
                      value: 'Voicemail',
                    },
                    {
                      name: 'VolumeDown',
                      value: 'VolumeDown',
                    },
                    {
                      name: 'VolumeMute',
                      value: 'VolumeMute',
                    },
                    {
                      name: 'VolumeOff',
                      value: 'VolumeOff',
                    },
                    {
                      name: 'VolumeUp',
                      value: 'VolumeUp',
                    },
                    {
                      name: 'Warning',
                      value: 'Warning',
                    },
                    {
                      name: 'Watch',
                      value: 'Watch',
                    },
                    {
                      name: 'WatchLater',
                      value: 'WatchLater',
                    },
                    {
                      name: 'Wc',
                      value: 'Wc',
                    },
                    {
                      name: 'Widgets',
                      value: 'Widgets',
                    },
                    {
                      name: 'Wifi',
                      value: 'Wifi',
                    },
                    {
                      name: 'Work',
                      value: 'Work',
                    },
                  ],
                },
              },
              {
                label: 'Icon Alignment',
                key: 'iconAlignment',
                value: 'top',
                type: 'CUSTOM',
                configuration: {
                  as: 'BUTTONGROUP',
                  dataType: 'string',
                  allowedInput: [
                    { name: 'Left', value: 'left' },
                    { name: 'Top', value: 'top' },
                    { name: 'Right', value: 'right' },
                    { name: 'Bottom', value: 'bottom' },
                  ],
                  condition: {
                    type: 'HIDE',
                    option: 'icon',
                    comparator: 'EQ',
                    value: 'None',
                  },
                },
              },
              {
                type: 'TOGGLE',
                label: 'Disabled',
                key: 'disabled',
                value: false,
              },
              {
                type: 'TOGGLE',
                label: 'Disable ripple',
                key: 'disableRipple',
                value: false,
              },
            ],
            descendants: [],
          };

          newPrefab.structure[0].descendants[0].descendants.push(newTab);
        });
        newPrefab.structure[0].descendants[0].descendants[0].descendants[0].options[4].value[0] = appBarTitle;
        save(newPrefab);
      },
      buttons: () => (
        <Box direction="row" justify="between">
          <Box direction="row" margin="2rem">
            <Button
              label="Previous"
              size="large"
              background={{ color: '#f0f1f5' }}
              onClick={() => {
                if (stepNumber === 1) {
                  return;
                }
                const newStepnumber = stepNumber - 1;
                setStepNumber(newStepnumber);
              }}
              margin={{ right: '5px' }}
              disabled={stepNumber === 1}
            />
            <Button
              label="Next"
              size="large"
              disabled={stepNumber === stepper.stepAmount}
              onClick={() => {
                const newStepnumber = stepNumber + 1;
                setStepNumber(newStepnumber);
              }}
              primary
            />
          </Box>
          <Box>
            <Footer
              onClose={close}
              onSave={stepNumber === stepper.stepAmount && stepper.onSave}
            />
          </Box>
        </Box>
      ),
      progressBar: titles => (
        <Box
          justify="center"
          margin={{ bottom: '2rem', left: '2rem', top: '-1rem' }}
        >
          <Text size="medium" weight="bold">{`Step: ${stepNumber} / ${
            stepper.stepAmount
          } - ${titles[stepNumber - 1]}`}</Text>
        </Box>
      ),
      stepAmount: 2,
    };

    return (
      <>
        <Header onClose={close} title="Configure Layout" />
        {stepper.progressBar(['Configure Appbar', 'Configure Tabs Layout'])}
        <Content>{stepper.setStep(stepNumber)}</Content>
        {stepper.buttons()}
      </>
    );
  },
  interactions: [],
  structure: [
    {
      name: 'Row',
      options: [
        {
          type: 'CUSTOM',
          label: 'Width',
          key: 'maxRowWidth',
          value: 'Full',
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
          value: 'transparent',
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
      descendants: [
        {
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
              value: 'flexible',
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
              value: 'flexible',
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
              value: 'transparent',
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
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Outer space',
              key: 'outerSpacing',
              type: 'SIZES',
            },
            {
              value: ['0rem', '0rem', '0rem', '0rem'],
              label: 'Inner space',
              key: 'innerSpacing',
              type: 'SIZES',
            },
          ],
          descendants: [
            {
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
                  value: '12',
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
                  value: '12',
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
                  value: '12',
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
                  value: '12',
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
                  value: 'transparent',
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
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Outer space',
                  key: 'outerSpacing',
                  type: 'SIZES',
                },
                {
                  value: ['0rem', '0rem', '0rem', '0rem'],
                  label: 'Inner space',
                  key: 'innerSpacing',
                  type: 'SIZES',
                },
              ],
              descendants: [
                {
                  name: 'AppBar',
                  options: [
                    {
                      label: 'Background color',
                      key: 'backgroundColor',
                      value: 'Primary',
                      type: 'COLOR',
                    },
                    {
                      label: 'Text color',
                      key: 'color',
                      value: 'White',
                      type: 'COLOR',
                    },
                    {
                      type: 'SIZE',
                      label: 'Height',
                      key: 'height',
                      value: '60px',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      label: 'Position',
                      key: 'position',
                      value: 'static',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Fixed',
                            value: 'fixed',
                          },
                          {
                            name: 'Absolute',
                            value: 'absolute',
                          },
                          {
                            name: 'Sticky',
                            value: 'sticky',
                          },

                          {
                            name: 'Static',
                            value: 'static',
                          },
                          {
                            name: 'Relative',
                            value: 'relative',
                          },
                        ],
                      },
                    },
                    {
                      label: 'Title',
                      key: 'title',
                      value: ['App Bar'],
                      type: 'VARIABLE',
                    },
                    {
                      label: 'Logo',
                      key: 'logoSource',
                      value: [],
                      type: 'VARIABLE',
                    },
                    {
                      type: 'SIZE',
                      label: 'Logo Width',
                      key: 'logoWidth',
                      value: '150px',
                      configuration: {
                        as: 'UNIT',
                      },
                    },
                    {
                      label: 'Align items',
                      key: 'alignItems',
                      value: 'right',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Left',
                            value: 'left',
                          },
                          {
                            name: 'Right',
                            value: 'right',
                          },
                        ],
                      },
                    },
                    {
                      label: 'Page',
                      key: 'endpoint',
                      value: '',
                      type: 'ENDPOINT',
                    },
                    {
                      label: 'Variant',
                      key: 'appBarVariant',
                      value: 'elevation',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'BUTTONGROUP',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Flat',
                            value: 'flat',
                          },
                          {
                            name: 'Elevation',
                            value: 'elevation',
                          },
                          {
                            name: 'Outlined',
                            value: 'outlined',
                          },
                        ],
                      },
                    },
                    {
                      label: 'Elevation',
                      key: 'elevation',
                      value: '1',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
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
                          { name: '13', value: '13' },
                          { name: '14', value: '14' },
                          { name: '15', value: '15' },
                          { name: '16', value: '16' },
                          { name: '17', value: '17' },
                          { name: '18', value: '18' },
                          { name: '19', value: '19' },
                          { name: '20', value: '20' },
                          { name: '21', value: '21' },
                          { name: '22', value: '22' },
                          { name: '23', value: '23' },
                          { name: '24', value: '24' },
                        ],
                        condition: {
                          type: 'SHOW',
                          option: 'appBarVariant',
                          comparator: 'EQ',
                          value: 'elevation',
                        },
                      },
                    },
                    {
                      label: 'Square',
                      key: 'square',
                      value: true,
                      type: 'TOGGLE',
                    },
                    {
                      label: 'Size',
                      key: 'toolbarVariant',
                      value: 'regular',
                      type: 'CUSTOM',
                      configuration: {
                        as: 'DROPDOWN',
                        dataType: 'string',
                        allowedInput: [
                          {
                            name: 'Regular',
                            value: 'regular',
                          },
                          {
                            name: 'Dense',
                            value: 'dense',
                          },
                        ],
                      },
                    },
                  ],
                  descendants: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}))();
